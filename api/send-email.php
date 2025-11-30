<?php
/**
 * AITENES - Endpoint para envío de emails con Resend API
 * Documentación: https://resend.com/docs/api-reference/emails/send-email
 *
 * CONFIGURACIÓN:
 * Las credenciales se cargan desde config.php (no incluido en Git por seguridad)
 * Crear api/config.php con el formato:
 * return [
 *     'RESEND_API_KEY' => 're_xxx...',
 *     'FROM_EMAIL' => 'AITENES <email@dominio.com>',
 *     'TO_EMAIL' => 'destino@email.com'
 * ];
 */

// ============================================================================
// CARGAR CONFIGURACIÓN PRIVADA
// ============================================================================
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Configuración no encontrada']);
    exit();
}

$config = require $configFile;
$RESEND_API_KEY = $config['RESEND_API_KEY'];
$FROM_EMAIL = $config['FROM_EMAIL'];
$TO_EMAIL = $config['TO_EMAIL'];

// ============================================================================
// CORS y Headers
// ============================================================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Manejar preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit();
}

// ============================================================================
// Obtener datos del formulario
// ============================================================================
$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';

// Validar email
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email inválido']);
    exit();
}

// ============================================================================
// Enviar email con Resend
// ============================================================================
$data = [
    'from' => $FROM_EMAIL,
    'to' => [$TO_EMAIL],
    'subject' => 'Nueva solicitud de Beta - AITENES',
    'html' => "
        <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
            <h2 style='color: #0CCAC3;'>Nueva Solicitud de Acceso Beta</h2>
            <p>Has recibido una nueva solicitud de acceso a la beta de AITENES.</p>
            <div style='background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;'>
                <p style='margin: 0;'><strong>Email del interesado:</strong></p>
                <p style='font-size: 18px; color: #2B7EC1; margin: 10px 0;'>{$email}</p>
            </div>
            <p style='color: #666; font-size: 14px;'>
                Este email fue enviado automáticamente desde el formulario de contacto de AITENES.
            </p>
        </div>
    "
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
        'Authorization: Bearer ' . $RESEND_API_KEY,
        'Content-Type: application/json'
    ],
    CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// ============================================================================
// Respuesta
// ============================================================================
if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'message' => 'Email enviado correctamente']);
} else {
    http_response_code(500);
    $errorData = json_decode($response, true);
    $errorMessage = isset($errorData['message']) ? $errorData['message'] : 'Error al enviar email';
    echo json_encode(['success' => false, 'error' => $errorMessage]);
}
