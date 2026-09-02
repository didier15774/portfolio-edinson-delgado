<?php
/**
 * Configuración de contacto — copiar a contact.config.php en el servidor.
 * NO commitear contact.config.php con credenciales reales.
 *
 * Bloque de contacto (futuro): preferencia SMTP en Hostinger.
 */
return [
    'mail_to' => 'it.edelgado@gmail.com',
    'mail_from' => 'noreply@example.com',
    'site_name' => 'Portfolio Edinson Delgado',

    // SMTP Hostinger (completar antes del bloque de contacto)
    'smtp' => [
        'enabled' => false,
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl',
        'username' => '',
        'password' => '',
    ],

    'max_requests_per_hour' => 10,
    'allowed_origins' => [],
];
