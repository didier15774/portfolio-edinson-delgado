<?php
/**
 * Plantilla de configuración de contacto.
 *
 * 1. Copiar este archivo a contact.config.php EN EL SERVIDOR (Hostinger).
 * 2. Completar username/password SMTP del panel Hostinger.
 * 3. NUNCA commitear contact.config.php — está en .gitignore.
 *
 * Dominio de producción: https://edinson.proyectocolmena.com
 * Buzón corporativo: edelgado@proyectocolmena.com
 */
return [
    'mail_to' => 'edelgado@proyectocolmena.com',
    'mail_from' => 'edelgado@proyectocolmena.com',
    'site_name' => 'Portfolio Edinson Delgado',

    'smtp' => [
        'enabled' => true,
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl', // ssl (465) o tls (587)
        'username' => 'edelgado@proyectocolmena.com', // ← completar solo en el servidor
        'password' => '', // ← completar solo en el servidor
    ],

    'max_requests_per_hour' => 10,
    'allowed_origins' => [
        'https://edinson.proyectocolmena.com',
    ],
];
