<?php
/**
 * Wavepoint 2.0 — mailer.php
 *
 * Receives a JSON POST from the frontend BookingForm / ContactForm,
 * validates and sanitises every field, sends two HTML emails (admin +
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
        'subject_guest'    => 'Your enquiry at Wavepoint Apartments — we\'ve got it!',
        'subject_admin'    => 'New booking enquiry from {name}',
        'lang_label'       => 'English',
        'greeting'         => 'Dear {name},',
        'intro'            => 'Thank you for reaching out to us at Wavepoint Apartments. We have received your enquiry and will get back to you as soon as possible — usually within 24 hours.',
        'summary_title'    => 'Your Request Summary',
        'room_label'       => 'Apartment',
        'checkin_label'    => 'Check-in',
        'checkout_label'   => 'Check-out',
        'guests_label'     => 'Guests',
        'message_label'    => 'Message',
        'whats_next_title' => 'What happens next?',
        'whats_next_body'  => 'Our team will review your request and reach out to you within 24 hours to confirm availability and discuss your stay.',
        'whatsapp_cta'     => 'Message us on WhatsApp',
        'sign_off'         => 'Warm regards,',
        'team_name'        => 'The Wavepoint Team',
        'confirmation_label' => 'Booking Confirmation',
    ],
    'el' => [
        'subject_guest'    => 'Η αίτησή σας στο Wavepoint Apartments — την λάβαμε!',
        'subject_admin'    => 'Νέα αίτηση κράτησης από {name}',
        'lang_label'       => 'Greek',
        'greeting'         => 'Αγαπητέ/ή {name},',
        'intro'            => 'Σας ευχαριστούμε που επικοινωνήσατε μαζί μας στο Wavepoint Apartments. Λάβαμε το αίτημά σας και θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό — συνήθως εντός 24 ωρών.',
        'summary_title'    => 'Σύνοψη Αιτήματός σας',
        'room_label'       => 'Διαμέρισμα',
        'checkin_label'    => 'Άφιξη',
        'checkout_label'   => 'Αναχώρηση',
        'guests_label'     => 'Επισκέπτες',
        'message_label'    => 'Μήνυμα',
        'whats_next_title' => 'Τι γίνεται στη συνέχεια;',
        'whats_next_body'  => 'Η ομάδα μας θα εξετάσει το αίτημά σας και θα επικοινωνήσει μαζί σας εντός 24 ωρών για να επιβεβαιώσει τη διαθεσιμότητα και να συζητήσει τη διαμονή σας.',
        'whatsapp_cta'     => 'Επικοινωνήστε μαζί μας στο WhatsApp',
        'sign_off'         => 'Θερμές ευχές,',
        'team_name'        => 'Η ομάδα του Wavepoint',
        'confirmation_label' => 'Επιβεβαίωση Κράτησης',
    ],
    'mk' => [
        'subject_guest'    => 'Вашето барање во Wavepoint Apartments — го примивме!',
        'subject_admin'    => 'Ново барање за резервација од {name}',
        'lang_label'       => 'Macedonian',
        'greeting'         => 'Почитуван/а {name},',
        'intro'            => 'Ви благодариме što се обративте до нас во Wavepoint Apartments. Го примивме вашето барање и ќе ви се јавиме наскоро — обично во рок од 24 часа.',
        'summary_title'    => 'Преглед на вашето барање',
        'room_label'       => 'Апартман',
        'checkin_label'    => 'Пристигање',
        'checkout_label'   => 'Заминување',
        'guests_label'     => 'Гости',
        'message_label'    => 'Порака',
        'whats_next_title' => 'Што следи?',
        'whats_next_body'  => 'Нашиот тим ќе го разгледа вашето барање и ќе стапи во контакт со вас во рок од 24 часа за да ја потврди достапноста и да разговара за вашиот престој.',
        'whatsapp_cta'     => 'Пишете ни на WhatsApp',
        'sign_off'         => 'Со почит,',
        'team_name'        => 'Тимот на Wavepoint',
        'confirmation_label' => 'Потврда за резервација',
    ],
    'sr' => [
        'subject_guest'    => 'Vaš upit u Wavepoint Apartments — primili smo ga!',
        'subject_admin'    => 'Novi upit za rezervaciju od {name}',
        'lang_label'       => 'Serbian',
        'greeting'         => 'Poštovani/a {name},',
        'intro'            => 'Hvala što ste nas kontaktirali u Wavepoint Apartments. Primili smo vaš upit i javićemo vam se što je pre moguće — obično u roku od 24 sata.',
        'summary_title'    => 'Pregled vašeg zahteva',
        'room_label'       => 'Apartman',
        'checkin_label'    => 'Dolazak',
        'checkout_label'   => 'Odlazak',
        'guests_label'     => 'Gosti',
        'message_label'    => 'Poruka',
        'whats_next_title' => 'Šta sledi?',
        'whats_next_body'  => 'Naš tim će pregledati vaš zahtev i kontaktirati vas u roku od 24 sata kako bi potvrdio dostupnost i razgovarao o vašem boravku.',
        'whatsapp_cta'     => 'Pišite nam na WhatsApp',
        'sign_off'         => 'Srdačan pozdrav,',
        'team_name'        => 'Tim Wavepointa',
        'confirmation_label' => 'Potvrda rezervacije',
    ],
    'bg' => [
        'subject_guest'    => 'Вашето запитване в Wavepoint Apartments — получихме го!',
        'subject_admin'    => 'Ново запитване за резервация от {name}',
        'lang_label'       => 'Bulgarian',
        'greeting'         => 'Уважаеми/а {name},',
        'intro'            => 'Благодарим ви, че се свързахте с нас в Wavepoint Apartments. Получихме вашето запитване и ще ви отговорим възможно най-скоро — обикновено в рамките на 24 часа.',
        'summary_title'    => 'Резюме на вашата заявка',
        'room_label'       => 'Апартамент',
        'checkin_label'    => 'Настаняване',
        'checkout_label'   => 'Напускане',
        'guests_label'     => 'Гости',
        'message_label'    => 'Съобщение',
        'whats_next_title' => 'Какво следва?',
        'whats_next_body'  => 'Нашият екип ще разгледа вашата заявка и ще се свърже с вас в рамките на 24 часа, за да потвърди наличността и да обсъди вашия престой.',
        'whatsapp_cta'     => 'Пишете ни в WhatsApp',
        'sign_off'         => 'С уважение,',
        'team_name'        => 'Екипът на Wavepoint',
        'confirmation_label' => 'Потвърждение на резервацията',
    ],
    'ro' => [
        'subject_guest'    => 'Cererea dvs. la Wavepoint Apartments — am primit-o!',
        'subject_admin'    => 'Cerere nouă de rezervare de la {name}',
        'lang_label'       => 'Romanian',
        'greeting'         => 'Stimate/ă {name},',
        'intro'            => 'Vă mulțumim că ne-ați contactat la Wavepoint Apartments. Am primit cererea dvs. și vă vom răspunde cât mai curând posibil — de obicei în 24 de ore.',
        'summary_title'    => 'Rezumatul cererii dvs.',
        'room_label'       => 'Apartament',
        'checkin_label'    => 'Check-in',
        'checkout_label'   => 'Check-out',
        'guests_label'     => 'Oaspeți',
        'message_label'    => 'Mesaj',
        'whats_next_title' => 'Ce urmează?',
        'whats_next_body'  => 'Echipa noastră va analiza cererea dvs. și vă va contacta în termen de 24 de ore pentru a confirma disponibilitatea și a discuta șederea dvs.',
        'whatsapp_cta'     => 'Scrieți-ne pe WhatsApp',
        'sign_off'         => 'Cu stimă,',
        'team_name'        => 'Echipa Wavepoint',
        'confirmation_label' => 'Confirmare rezervare',
    ],
];

$lang = $labels[$language] ?? $labels['en'];

/* ──────────────────────────────────────────────
   4.  Room name map
   ────────────────────────────────────────────── */
$roomNames = [
    'classic' => 'Wavepoint Classic',
    '2-1'     => 'Wavepoint 2.1',
    '2-2'     => 'Wavepoint 2.2',
    '2-3'     => 'Wavepoint 2.3',
];
$roomLabel = $roomNames[$room] ?? $room;

// Pre-compute time-dependent values once (used in email templates below)
$currentYear      = date('Y');
$adminTimestamp   = date('D, d M Y \a\t H:i T');

/* ──────────────────────────────────────────────
   5.  HTML email builder functions
   ────────────────────────────────────────────── */

/**
 * Wraps body rows in the full branded email shell (600 px, table-based).
 * Returns a complete HTML document ready for mail().
 */
function emailShell(string $bodyRows, string $langCode, string $year): string {
    $wa = WHATSAPP_LINK;
    $lc = htmlspecialchars($langCode, ENT_QUOTES, 'UTF-8');

    return <<<HTML
<!DOCTYPE html>
<html lang="{$lc}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Wavepoint Apartments</title>
  <!--[if mso]>
  <noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { border: 0; outline: none; text-decoration: none; }
    a { color: #C5A059; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .mob-pad { padding-left: 24px !important; padding-right: 24px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#EDE9E0;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#EDE9E0;">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- 600 px container -->
      <table class="email-container" role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;width:100%;background-color:#FFFFFF;">

        <!-- HEADER: dark bar with text logo -->
        <tr>
          <td align="center" style="background-color:#33302E;padding:36px 40px 30px 40px;">
            <p style="margin:0 0 10px 0;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#C5A059;line-height:1;">&#10022;</p>
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:bold;color:#FFFFFF;letter-spacing:0.04em;line-height:1.2;">Wave<span style="color:#C5A059;">point</span></p>
            <p style="margin:6px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:9px;font-weight:600;color:rgba(255,255,255,0.4);letter-spacing:0.22em;text-transform:uppercase;">APARTMENTS</p>
          </td>
        </tr>

        <!-- Gold accent line -->
        <tr>
          <td height="3" style="background-color:#C5A059;font-size:0;line-height:0;">&zwnj;</td>
        </tr>

        <!-- BODY ROWS (injected per template) -->
        {$bodyRows}

        <!-- FOOTER -->
        <tr>
          <td style="background-color:#F5F2ED;border-top:1px solid #D9D2C5;padding:32px 40px;text-align:center;">
            <!-- Social buttons -->
            <p style="margin:0 0 20px 0;">
              <a href="https://www.instagram.com/wavepointapartments" target="_blank"
                 style="display:inline-block;margin:0 4px;padding:7px 16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#FFFFFF;background-color:#C5A059;text-decoration:none;letter-spacing:0.08em;">Instagram</a>
              <a href="https://www.facebook.com/wavepointapartments" target="_blank"
                 style="display:inline-block;margin:0 4px;padding:7px 16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#FFFFFF;background-color:#C5A059;text-decoration:none;letter-spacing:0.08em;">Facebook</a>
              <a href="{$wa}" target="_blank"
                 style="display:inline-block;margin:0 4px;padding:7px 16px;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#FFFFFF;background-color:#C5A059;text-decoration:none;letter-spacing:0.08em;">WhatsApp</a>
            </p>
            <!-- Greek address -->
            <p style="margin:0 0 4px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#A3927E;line-height:1.7;">
              Wavepoint Apartments &bull; Asprovalta, Thessaloniki, Greece
            </p>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#A3927E;">
              <a href="tel:+306948145850" style="color:#A3927E;text-decoration:none;">+30 694 814 5850</a>
              &nbsp;&bull;&nbsp;
              <a href="mailto:contact@wavepoint-apartments.com" style="color:#A3927E;text-decoration:none;">contact@wavepoint-apartments.com</a>
            </p>
            <p style="margin:16px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:10px;color:#C5C0B8;letter-spacing:0.05em;">
              &copy; {$year} Wavepoint Apartments. All rights reserved.
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>
HTML;
}

/**
 * Returns an HTML table row for one booking detail field.
 * Returns an empty string if $value is empty, so unused fields are omitted.
 */
function detailRow(string $label, string $value, bool $last = false): string {
    if ($value === '') {
        return '';
    }
    $border     = $last ? '' : 'border-bottom:1px solid #D9D2C5;';
    $safeLabel  = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
    $safeValue  = nl2br(htmlspecialchars($value, ENT_QUOTES, 'UTF-8'));

    return <<<HTML
              <tr>
                <td style="padding:13px 20px;width:38%;background-color:#F5F2ED;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:600;color:#A3927E;letter-spacing:0.12em;text-transform:uppercase;vertical-align:top;{$border}">{$safeLabel}</td>
                <td style="padding:13px 20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#33302E;vertical-align:top;{$border}">{$safeValue}</td>
              </tr>
HTML;
}

/**
 * Builds the localised body rows for the guest confirmation email.
 */
function buildGuestEmailRows(
    array  $lang,
    string $name,
    string $roomLabel,
    string $checkin,
    string $checkout,
    string $guests,
    string $message
): string {
    $wa       = WHATSAPP_LINK;
    $confLbl  = htmlspecialchars($lang['confirmation_label'], ENT_QUOTES, 'UTF-8');
    $greeting = htmlspecialchars(str_replace('{name}', $name, $lang['greeting']), ENT_QUOTES, 'UTF-8');
    $intro    = htmlspecialchars($lang['intro'],            ENT_QUOTES, 'UTF-8');
    $sumTitle = htmlspecialchars($lang['summary_title'],    ENT_QUOTES, 'UTF-8');
    $wnTitle  = htmlspecialchars($lang['whats_next_title'], ENT_QUOTES, 'UTF-8');
    $wnBody   = htmlspecialchars($lang['whats_next_body'],  ENT_QUOTES, 'UTF-8');
    $waCta    = htmlspecialchars($lang['whatsapp_cta'],     ENT_QUOTES, 'UTF-8');
    $signOff  = htmlspecialchars($lang['sign_off'],         ENT_QUOTES, 'UTF-8');
    $teamName = htmlspecialchars($lang['team_name'],        ENT_QUOTES, 'UTF-8');

    $rows  = detailRow($lang['room_label'],     $roomLabel);
    $rows .= detailRow($lang['checkin_label'],  $checkin);
    $rows .= detailRow($lang['checkout_label'], $checkout);
    $rows .= detailRow($lang['guests_label'],   $guests);
    $rows .= detailRow($lang['message_label'],  $message, true);

    return <<<HTML

        <!-- GREETING & INTRO -->
        <tr>
          <td class="mob-pad" style="padding:48px 48px 0 48px;background-color:#FFFFFF;">
            <p style="margin:0 0 20px 0;font-family:Georgia,'Times New Roman',serif;font-size:11px;color:#C5A059;letter-spacing:0.24em;text-transform:uppercase;">{$confLbl}</p>
            <h1 style="margin:0 0 18px 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#33302E;font-weight:normal;line-height:1.35;">{$greeting}</h1>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#33302E;line-height:1.75;">{$intro}</p>
          </td>
        </tr>

        <!-- ORNAMENTAL DIVIDER -->
        <tr>
          <td class="mob-pad" style="padding:30px 48px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="height:1px;background-color:#D9D2C5;font-size:0;line-height:0;">&zwnj;</td>
                <td width="50" align="center" style="font-family:Georgia,serif;font-size:16px;color:#C5A059;padding:0 14px;white-space:nowrap;">&#10022;</td>
                <td style="height:1px;background-color:#D9D2C5;font-size:0;line-height:0;">&zwnj;</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- BOOKING SUMMARY TABLE -->
        <tr>
          <td class="mob-pad" style="padding:0 48px;background-color:#FFFFFF;">
            <p style="margin:0 0 14px 0;font-family:Georgia,'Times New Roman',serif;font-size:11px;color:#C5A059;letter-spacing:0.24em;text-transform:uppercase;">{$sumTitle}</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="border:1px solid #D9D2C5;border-collapse:collapse;">
              {$rows}
            </table>
          </td>
        </tr>

        <!-- WHAT'S NEXT -->
        <tr>
          <td class="mob-pad" style="padding:28px 48px 0 48px;background-color:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="background-color:#F5F2ED;border-left:3px solid #C5A059;">
              <tr>
                <td style="padding:22px 26px;">
                  <p style="margin:0 0 10px 0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#33302E;font-weight:bold;">{$wnTitle}</p>
                  <p style="margin:0 0 18px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#33302E;line-height:1.7;">{$wnBody}</p>
                  <a href="{$wa}" target="_blank"
                     style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;color:#FFFFFF;background-color:#C5A059;text-decoration:none;padding:11px 26px;letter-spacing:0.1em;">{$waCta}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- SIGN-OFF -->
        <tr>
          <td class="mob-pad" style="padding:32px 48px 48px 48px;background-color:#FFFFFF;">
            <p style="margin:0 0 2px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#33302E;">{$signOff}</p>
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:16px;color:#33302E;font-weight:bold;">{$teamName}</p>
            <p style="margin:12px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#A3927E;">Wavepoint Apartments &bull; Asprovalta, Greece</p>
          </td>
        </tr>

HTML;
}

/**
 * Builds the body rows for the admin notification email (always English).
 */
function buildAdminEmailRows(
    string $name,
    string $email,
    string $phone,
    string $roomLabel,
    string $checkin,
    string $checkout,
    string $guests,
    string $langLabel,
    string $message,
    string $timestamp
): string {
    $safeEmail   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $encodedSubj = rawurlencode('Re: Your enquiry at Wavepoint Apartments');
    $wa          = WHATSAPP_LINK;

    $rows  = detailRow('Guest Name',       $name);
    $rows .= detailRow('Email Address',    $email);
    $rows .= detailRow('Phone Number',     $phone);
    $rows .= detailRow('Apartment',        $roomLabel);
    $rows .= detailRow('Check-in Date',    $checkin);
    $rows .= detailRow('Check-out Date',   $checkout);
    $rows .= detailRow('Number of Guests', $guests);
    $rows .= detailRow('Booking Language', $langLabel);
    $rows .= detailRow('Message',          $message, true);

    return <<<HTML

        <!-- ADMIN HEADER -->
        <tr>
          <td class="mob-pad" style="padding:48px 48px 0 48px;background-color:#FFFFFF;">
            <p style="margin:0 0 8px 0;font-family:Georgia,'Times New Roman',serif;font-size:11px;color:#C5A059;letter-spacing:0.24em;text-transform:uppercase;">Admin Notification</p>
            <h1 style="margin:0 0 6px 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#33302E;font-weight:normal;line-height:1.3;">New Booking Enquiry</h1>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#A3927E;">Received: {$timestamp}</p>
          </td>
        </tr>

        <!-- DIVIDER -->
        <tr>
          <td class="mob-pad" style="padding:24px 48px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="height:1px;background-color:#D9D2C5;font-size:0;">&zwnj;</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- GUEST DATA TABLE -->
        <tr>
          <td class="mob-pad" style="padding:0 48px;background-color:#FFFFFF;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="border:1px solid #D9D2C5;border-collapse:collapse;">
              {$rows}
            </table>
          </td>
        </tr>

        <!-- ACTION BUTTONS -->
        <tr>
          <td class="mob-pad" style="padding:32px 48px 48px 48px;background-color:#FFFFFF;text-align:center;">
            <a href="mailto:{$safeEmail}?subject={$encodedSubj}"
               style="display:inline-block;margin:4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#FFFFFF;background-color:#33302E;text-decoration:none;padding:14px 28px;letter-spacing:0.1em;">&#9993; Reply to Guest</a>
            <a href="{$wa}" target="_blank"
               style="display:inline-block;margin:4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:600;color:#33302E;background-color:#FFFFFF;text-decoration:none;padding:13px 28px;letter-spacing:0.1em;border:1px solid #D9D2C5;">WhatsApp</a>
          </td>
        </tr>

HTML;
}

/* ──────────────────────────────────────────────
   6.  Build HTML email bodies
   ────────────────────────────────────────────── */
$guestSubject = str_replace('{name}', $name, $lang['subject_guest']);
$guestRows    = buildGuestEmailRows($lang, $name, $roomLabel, $checkin, $checkout, $guests, $message);
$guestHtml    = emailShell($guestRows, $language, $currentYear);

$adminSubject = str_replace('{name}', $name, $labels['en']['subject_admin']);
$adminRows    = buildAdminEmailRows($name, $email, $phone, $roomLabel, $checkin, $checkout, $guests, $lang['lang_label'], $message, $adminTimestamp);
$adminHtml    = emailShell($adminRows, 'en', $currentYear);

/* ──────────────────────────────────────────────
   7.  Common mail headers helper
   ────────────────────────────────────────────── */
function buildHeaders(string $fromEmail, string $fromName, string $toEmail, string $replyToEmail = ''): string {
    $h  = "MIME-Version: 1.0\r\n";
    $h .= "Content-Type: text/html; charset=UTF-8\r\n";
    $h .= "Content-Transfer-Encoding: 8bit\r\n";
    $h .= "From: =?UTF-8?B?" . base64_encode($fromName) . "?= <{$fromEmail}>\r\n";
    if ($replyToEmail) {
        $h .= "Reply-To: {$replyToEmail}\r\n";
    }
    $h .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    return $h;
}

/* ──────────────────────────────────────────────
   8.  Send emails
   ────────────────────────────────────────────── */
$guestHeaders = buildHeaders(FROM_EMAIL, FROM_NAME, $email);
$adminHeaders = buildHeaders(FROM_EMAIL, FROM_NAME, ADMIN_EMAIL, $email);

$sentGuest = mail($email,       $guestSubject, $guestHtml, $guestHeaders);
$sentAdmin = mail(ADMIN_EMAIL,  $adminSubject, $adminHtml, $adminHeaders);

/* ──────────────────────────────────────────────
   9.  CSV logging
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
   10.  Response
   ────────────────────────────────────────────── */
if ($sentGuest || $sentAdmin) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    // mail() failed — still logged, but warn the client
    http_response_code(500);
    echo json_encode(['error' => 'Email delivery failed. Please contact us directly.']);
}
