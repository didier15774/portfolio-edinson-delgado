<?php
/**
 * Plantilla de configuración de contacto.
 *
 * 1. Copiar este archivo a contact.config.php EN EL SERVIDOR (Hostinger).
 * 2. Completar username/password SMTP del panel Hostinger.
 * 3. NUNCA commitear contact.config.php — está en .gitignore.
 *
 * Dominio de producción: https://edinson.proyectocolmena.com
 */
return [
    'mail_to' => 'it.edelgado@gmail.com',
    'mail_from' => 'noreply@edinson.proyectocolmena.com',
    'site_name' => 'Portfolio Edinson Delgado',

    'smtp' => [
        'enabled' => true,
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl', // ssl (465) o tls (587)
        'username' => '', // ← completar solo en el servidor
        'password' => '', // ← completar solo en el servidor
    ],

    'max_requests_per_hour' => 10,
    'allowed_origins' => [
        'https://edinson.proyectocolmena.com',
    ],
];
