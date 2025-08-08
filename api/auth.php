<?php
/**
 * Authentication API Endpoint - Vercel Serverless Function
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
if (!$input || !isset($input['email']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing email or password']);
    exit();
}

$email = trim($input['email']);
$password = trim($input['password']);
$action = $input['action'] ?? 'login'; // login or register

// Email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit();
}

// Password validation
if (strlen($password) < 6) {
    http_response_code(400);
    echo json_encode(['error' => 'Password must be at least 6 characters']);
    exit();
}

// Demo users (in production, use real database)
$demoUsers = [
    'admin@destanteknoloji.com' => [
        'password' => password_hash('123456', PASSWORD_DEFAULT),
        'name' => 'Admin User',
        'role' => 'admin'
    ],
    'demo@example.com' => [
        'password' => password_hash('demo123', PASSWORD_DEFAULT),
        'name' => 'Demo User',
        'role' => 'user'
    ]
];

if ($action === 'login') {
    // Login logic
    if (!isset($demoUsers[$email])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit();
    }
    
    $user = $demoUsers[$email];
    if (!password_verify($password, $user['password'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
        exit();
    }
    
    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'email' => $email,
            'name' => $user['name'],
            'role' => $user['role']
        ],
        'token' => base64_encode($email . ':' . time())
    ]);
    
} elseif ($action === 'register') {
    // Register logic
    if (isset($demoUsers[$email])) {
        http_response_code(409);
        echo json_encode(['error' => 'User already exists']);
        exit();
    }
    
    $name = trim($input['name'] ?? '');
    if (empty($name)) {
        http_response_code(400);
        echo json_encode(['error' => 'Name is required']);
        exit();
    }
    
    // Success response (in production, save to database)
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'email' => $email,
            'name' => $name,
            'role' => 'user'
        ],
        'token' => base64_encode($email . ':' . time())
    ]);
    
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid action']);
}
?>
