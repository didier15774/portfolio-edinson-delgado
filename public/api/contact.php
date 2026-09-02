<?php
/**
 * Endpoint de contacto — implementación completa en bloque 6.
 * Placeholder seguro: solo acepta POST cuando exista configuración.
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

http_response_code(501);
echo json_encode(['ok' => false, 'error' => 'Formulario pendiente de implementación']);
