<?php
/**
 * Wavepoint 2.0 — mailer.php
 *
 * Receives a JSON POST from the frontend BookingForm / ContactForm,
 * validates and sanitises every field, sends two emails (admin +
 * localised guest confirmation), and appends the submission to a
 * protected CSV log file.
 *
 * Placement: /public/mailer.php  (served as /mailer.php after static export)
 * Log file  : /public/logs/requests_log.csv  (protected by .htaccess)
 */

/* ──────────────────────────────────────────────
   0.  CORS / headers
   ────────────────────────────────────────────── */
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

/* ──────────────────────────────────────────────
   1.  Configuration  (edit before deploying)
   ────────────────────────────────────────────── */
const ADMIN_EMAIL   = 'contact@wavepoint-apartments.com';
const ADMIN_NAME    = 'Wavepoint Apartments';
const FROM_EMAIL    = 'noreply@wavepoint-apartments.com';
const FROM_NAME     = 'Wavepoint Apartments';
const WHATSAPP_LINK = 'https://wa.me/306948145850';

// Absolute path to the log directory (one level ABOVE web root is ideal;
// if that is not possible, keep it inside public/logs/ and rely on .htaccess)
$logDir  = __DIR__ . '/logs';
$logFile = $logDir . '/requests_log.csv';

/* ──────────────────────────────────────────────
   2.  Parse & sanitise input
   ────────────────────────────────────────────── */
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON body']);
    exit;
}

/**
 * Sanitise a plain-text value: strip tags, trim whitespace.
 * Optionally enforce non-empty.
 */
function sanitiseText(string $value): string {
    return trim(strip_tags($value));
}

/**
 * Sanitise a value that will be placed inside an email header.
 * Removes any line-break characters to prevent header injection.
 */
function sanitiseHeader(string $value): string {
    return preg_replace('/[\r\n\t]/', '', sanitiseText($value));
}

$name     = sanitiseHeader($data['name']     ?? '');
$email    = filter_var(sanitiseText($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone    = sanitiseText($data['phone']    ?? '');
$room     = sanitiseText($data['room']     ?? '');
$checkin  = sanitiseText($data['checkin']  ?? '');
$checkout = sanitiseText($data['checkout'] ?? '');
$guests   = sanitiseText($data['guests']   ?? '');
$message  = sanitiseText($data['message']  ?? '');
$language = sanitiseText($data['language'] ?? 'en');

// Basic validation
$allowedLanguages = ['en', 'el', 'mk', 'sr', 'bg', 'ro'];
if (!in_array($language, $allowedLanguages, true)) {
    $language = 'en';
}

if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['error' => 'Name and a valid e-mail are required.']);
    exit;
}

/* ──────────────────────────────────────────────
   3.  Multi-language content
   ────────────────────────────────────────────── */
$labels = [
    'en' => [
        'subject_guest'  => 'Your enquiry at Wavepoint Apartments — we\'ve got it!',
        'greeting'       => "Dear {name},",
        'body'           => "Thank you for reaching out to us at Wavepoint Apartments.\n\nWe have received your enquiry and will get back to you as soon as possible — usually within 24 hours.\n\nHere is a summary of your request:",
        'footer'         => "Warm regards,\nThe Wavepoint Team\n\nWavepoint Apartments, Asprovalta, Greece\n" . WHATSAPP_LINK,
        'subject_admin'  => 'New booking enquiry from {name}',
    ],
    'el' => [
        'subject_guest'  => 'Η αίτησή σας στο Wavepoint Apartments — την λάβαμε!',
        'greeting'       => "Αγαπητέ/ή {name},",
        'body'           => "Σας ευχαριστούμε που επικοινωνήσατε μαζί μας στο Wavepoint Apartments.\n\nΛάβαμε το αίτημά σας και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό — συνήθως εντός 24 ωρών.\n\nΣύνοψη του αιτήματός σας:",
        'footer'         => "Θερμές ευχές,\nΗ ομάδα του Wavepoint\n\nWavepoint Apartments, Ασπρόβαλτα, Ελλάδα\n" . WHATSAPP_LINK,
        'subject_admin'  => 'Νέα αίτηση κράτησης από {name}',
    ],
    'mk' => [
        'subject_guest'  => 'Вашето барање во Wavepoint Apartments — го примивме!',
        'greeting'       => "Почитуван/а {name},",
        'body'           => "Ви благодариме što се обративте до нас во Wavepoint Apartments.\n\nГо примивме вашето барање и ќе ви се јавиме наскоро — обично во рок од 24 часа.\n\nПреглед на вашето барање:",
        'footer'         => "Со почит,\nТимот на Wavepoint\n\nWavepoint Apartments, Аспровалта, Грција\n" . WHATSAPP_LINK,
        'subject_admin'  => 'Ново барање за резервација од {name}',
    ],
    'sr' => [
        'subject_guest'  => 'Vaš upit u Wavepoint Apartments — primili smo ga!',
        'greeting'       => "Poštovani/a {name},",
        'body'           => "Hvala što ste nas kontaktirali u Wavepoint Apartments.\n\nPrimili smo vaš upit i javićemo vam se što je pre moguće — obično u roku od 24 sata.\n\nPregled vašeg zahteva:",
        'footer'         => "Srdačan pozdrav,\nTim Wavepointa\n\nWavepoint Apartments, Asprovalta, Grčka\n" . WHATSAPP_LINK,
        'subject_admin'  => 'Novi upit za rezervaciju od {name}',
    ],
    'bg' => [
        'subject_guest'  => 'Вашето запитване в Wavepoint Apartments — получихме го!',
        'greeting'       => "Уважаеми/а {name},",
        'body'           => "Благодарим ви, че се свързахте с нас в Wavepoint Apartments.\n\nПолучихме вашето запитване и ще ви отговорим възможно най-скоро — обикновено в рамките на 24 часа.\n\nОбобщение на вашето запитване:",
        'footer'         => "С уважение,\nЕкипът на Wavepoint\n\nWavepoint Apartments, Аспровалта, Гърция\n" . WHATSAPP_LINK,
        'subject_admin'  => 'Ново запитване за резервация от {name}',
    ],
    'ro' => [
        'subject_guest'  => 'Cererea dvs. la Wavepoint Apartments — am primit-o!',
        'greeting'       => "Stimate/ă {name},",
        'body'           => "Vă mulțumim că ne-ați contactat la Wavepoint Apartments.\n\nAm primit cererea dvs. și vă vom răspunde cât mai curând posibil — de obicei în 24 de ore.\n\nRezumatul cererii dvs.:",
        'footer'         => "Cu stimă,\nEchipa Wavepoint\n\nWavepoint Apartments, Asprovalta, Grecia\n" . WHATSAPP_LINK,
        'subject_admin'  => 'Cerere nouă de rezervare de la {name}',
    ],
];

$lang = $labels[$language] ?? $labels['en'];

/* ──────────────────────────────────────────────
   4.  Build the shared details block
   ────────────────────────────────────────────── */
$roomNames = [
    'classic' => 'Wavepoint Classic',
    '2-1'     => 'Wavepoint 2.1',
    '2-2'     => 'Wavepoint 2.2',
    '2-3'     => 'Wavepoint 2.3',
];
$roomLabel = $roomNames[$room] ?? $room;

$detailsLines = [];
if ($name)     $detailsLines[] = "Name     : {$name}";
if ($email)    $detailsLines[] = "Email    : {$email}";
if ($phone)    $detailsLines[] = "Phone    : {$phone}";
if ($roomLabel)$detailsLines[] = "Room     : {$roomLabel}";
if ($checkin)  $detailsLines[] = "Check-in : {$checkin}";
if ($checkout) $detailsLines[] = "Check-out: {$checkout}";
if ($guests)   $detailsLines[] = "Guests   : {$guests}";
if ($language) $detailsLines[] = "Language : {$language}";
if ($message)  $detailsLines[] = "Message  :\n{$message}";

$detailsBlock = implode("\n", $detailsLines);

/* ──────────────────────────────────────────────
   5.  Build email bodies
   ────────────────────────────────────────────── */
// 5a. Guest confirmation (localised)
$guestSubject = str_replace('{name}', $name, $lang['subject_guest']);
$guestGreeting = str_replace('{name}', $name, $lang['greeting']);
$guestBody = "{$guestGreeting}\n\n{$lang['body']}\n\n{$detailsBlock}\n\n{$lang['footer']}";

// 5b. Admin notification (always English)
$adminSubjectTpl = $labels['en']['subject_admin'];
$adminSubject = str_replace('{name}', $name, $adminSubjectTpl);
$adminBody = "New booking enquiry received via the website.\n\n{$detailsBlock}";

/* ──────────────────────────────────────────────
   6.  Common mail headers helper
   ────────────────────────────────────────────── */
function buildHeaders(string $fromEmail, string $fromName, string $toEmail, string $replyToEmail = ''): string {
    $h  = "MIME-Version: 1.0\r\n";
    $h .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $h .= "Content-Transfer-Encoding: 8bit\r\n";
    $h .= "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
    if ($replyToEmail) {
        $h .= "Reply-To: {$replyToEmail}\r\n";
    }
    $h .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    return $h;
}

/* ──────────────────────────────────────────────
   7.  Send emails
   ────────────────────────────────────────────── */
$guestHeaders = buildHeaders(FROM_EMAIL, FROM_NAME, $email);
$adminHeaders = buildHeaders(FROM_EMAIL, FROM_NAME, ADMIN_EMAIL, $email);

$sentGuest = mail($email, $guestSubject, $guestBody, $guestHeaders);
$sentAdmin = mail(ADMIN_EMAIL, $adminSubject, $adminBody, $adminHeaders);

/* ──────────────────────────────────────────────
   8.  CSV logging
   ────────────────────────────────────────────── */
if (!is_dir($logDir)) {
    mkdir($logDir, 0750, true);
}

$isNew = !file_exists($logFile);
$fp = fopen($logFile, 'a');

if ($fp) {
    if ($isNew) {
        // Write CSV header row on first use
        fputcsv($fp, [
            'timestamp', 'language', 'name', 'email', 'phone',
            'room', 'checkin', 'checkout', 'guests', 'message',
        ]);
    }
    fputcsv($fp, [
        date('Y-m-d H:i:s'),
        $language,
        $name,
        $email,
        $phone,
        $roomLabel,
        $checkin,
        $checkout,
        $guests,
        $message,
    ]);
    fclose($fp);
}

/* ──────────────────────────────────────────────
   9.  Response
   ────────────────────────────────────────────── */
if ($sentGuest || $sentAdmin) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    // mail() failed — still logged, but warn the client
    http_response_code(500);
    echo json_encode(['error' => 'Email delivery failed. Please contact us directly.']);
}
