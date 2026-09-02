<?php
/**
 * Endpoint de contacto — validación servidor, honeypot y rate limiting.
 * SMTP opcional vía contact.config.php (preferido en Hostinger).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

$configPath = __DIR__ . '/contact.config.php';
if (!is_file($configPath)) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'Servicio no configurado']);
    exit;
}

/** @var array<string, mixed> $config */
$config = require $configPath;

function respond(int $code, array $payload): void
{
    http_response_code($code);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

function has_header_injection(string $value): bool
{
    return (bool) preg_match('/[\r\n%0a%0d]/i', $value);
}

function sanitize_text(string $value, int $max): string
{
    $value = strip_tags($value);
    $value = preg_replace('/[\r\n]+/', ' ', $value) ?? $value;
    return mb_substr(trim($value), 0, $max);
}

function get_client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

function check_rate_limit(int $maxPerHour): bool
{
    $ip = preg_replace('/[^a-zA-Z0-9.:]/', '', get_client_ip());
    $file = sys_get_temp_dir() . '/portfolio_contact_' . md5($ip) . '.json';
    $now = time();
    $data = ['count' => 0, 'reset' => $now + 3600];

    if (is_file($file)) {
        $raw = file_get_contents($file);
        $decoded = json_decode($raw ?: '', true);
        if (is_array($decoded)) {
            $data = $decoded;
        }
    }

    if ($now > (int) ($data['reset'] ?? 0)) {
        $data = ['count' => 0, 'reset' => $now + 3600];
    }

    if ((int) $data['count'] >= $maxPerHour) {
        return false;
    }

    $data['count'] = (int) $data['count'] + 1;
    file_put_contents($file, json_encode($data));

    return true;
}

function send_via_mail(string $to, string $from, string $subject, string $body, string $replyTo): bool
{
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . $from,
        'Reply-To: ' . $replyTo,
    ];

    return mail($to, $subject, $body, implode("\r\n", $headers));
}

function send_via_smtp(array $smtp, string $to, string $from, string $subject, string $body, string $replyTo): bool
{
    $host = $smtp['host'] ?? '';
    $port = (int) ($smtp['port'] ?? 465);
    $encryption = $smtp['encryption'] ?? 'ssl';
    $username = $smtp['username'] ?? '';
    $password = $smtp['password'] ?? '';

    if ($host === '' || $username === '' || $password === '') {
        return false;
    }

    $remote = ($encryption === 'ssl' ? 'ssl://' : '') . $host . ':' . $port;
    $socket = @stream_socket_client($remote, $errno, $errstr, 15);

    if (!$socket) {
        return false;
    }

    $read = function () use ($socket): string {
        $response = '';
        while (($line = fgets($socket, 515)) !== false) {
            $response .= $line;
            if (isset($line[3]) && $line[3] === ' ') {
                break;
            }
        }
        return $response;
    };

    $write = function (string $command) use ($socket): void {
        fwrite($socket, $command . "\r\n");
    };

    $read();
    $write('EHLO localhost');
    $read();

    if ($encryption === 'tls') {
        $write('STARTTLS');
        $read();
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        $write('EHLO localhost');
        $read();
    }

    $write('AUTH LOGIN');
    $read();
    $write(base64_encode($username));
    $read();
    $write(base64_encode($password));
    $auth = $read();
    if (!str_starts_with($auth, '235')) {
        fclose($socket);
        return false;
    }

    $write('MAIL FROM:<' . $from . '>');
    $read();
    $write('RCPT TO:<' . $to . '>');
    $read();
    $write('DATA');
    $read();

    $message = "From: {$from}\r\n";
    $message .= "To: {$to}\r\n";
    $message .= "Reply-To: {$replyTo}\r\n";
    $message .= "Subject: {$subject}\r\n";
    $message .= "MIME-Version: 1.0\r\n";
    $message .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $message .= $body . "\r\n.";

    $write($message);
    $sent = $read();
    $write('QUIT');
    fclose($socket);

    return str_starts_with($sent, '250');
}

// Honeypot
$honeypot = $_POST['website'] ?? '';
if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

$name = sanitize_text((string) ($_POST['name'] ?? ''), 100);
$email = filter_var((string) ($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL) ?: '';
$subject = sanitize_text((string) ($_POST['subject'] ?? ''), 150);
$message = sanitize_text((string) ($_POST['message'] ?? ''), 2000);

$errors = [];
if (mb_strlen($name) < 2) {
    $errors[] = 'Nombre inválido';
}
if ($email === '' || has_header_injection($email)) {
    $errors[] = 'Email inválido';
}
if (mb_strlen($subject) < 5) {
    $errors[] = 'Asunto demasiado corto';
}
if (mb_strlen($message) < 20) {
    $errors[] = 'Mensaje demasiado corto';
}

if ($errors !== []) {
    respond(400, ['ok' => false, 'error' => implode('. ', $errors)]);
}

$maxRequests = (int) ($config['max_requests_per_hour'] ?? 10);
if (!check_rate_limit($maxRequests)) {
    respond(429, ['ok' => false, 'error' => 'Demasiadas solicitudes. Intente más tarde.']);
}

$mailTo = (string) ($config['mail_to'] ?? '');
$mailFrom = (string) ($config['mail_from'] ?? 'noreply@localhost');
$siteName = (string) ($config['site_name'] ?? 'Portfolio');

if ($mailTo === '') {
    respond(500, ['ok' => false, 'error' => 'Destino de correo no configurado']);
}

$emailSubject = '[' . $siteName . '] ' . $subject;
$body = "Nombre: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Asunto: {$subject}\n\n";
$body .= $message;

$sent = false;
$smtp = $config['smtp'] ?? [];
if (is_array($smtp) && !empty($smtp['enabled'])) {
    $sent = send_via_smtp($smtp, $mailTo, $mailFrom, $emailSubject, $body, $email);
}

if (!$sent) {
    $sent = send_via_mail($mailTo, $mailFrom, $emailSubject, $body, $email);
}

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'No se pudo enviar el mensaje']);
}

respond(200, ['ok' => true]);
