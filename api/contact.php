<?php
/**
 * Contact API Endpoint - Vercel Serverless Function
 */

// CORS Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!$input || !isset($input['email']) || !isset($input['name'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$message = trim($input['message'] ?? 'Newsletter subscription');
$type = $input['type'] ?? 'contact';

// Email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Log to file (in production, use proper logging)
$logData = [
    'timestamp' => date('Y-m-d H:i:s'),
    'type' => $type,
    'name' => $name,
    'email' => $email,
    'message' => $message,
    'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
];

// In a real app, you would:
// 1. Save to database
// 2. Send email notification
// 3. Add to newsletter service

// Success response
http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => $type === 'newsletter' ? 'Newsletter subscription successful!' : 'Message sent successfully!',
    'data' => [
        'id' => uniqid(),
        'timestamp' => date('c')
    ]
]);
?>
