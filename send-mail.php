<?php
header('Content-Type: application/json');

// Check if it's a POST request
if ($_SERVER["REQUEST_METHOD"] != "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
    exit;
}

// Get form type, default to 'application' if not set
$formType = isset($_POST['form_type']) ? $_POST['form_type'] : 'application';

// Common fields
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$missing = [];

if (empty($email))
    $missing[] = 'Email';

if ($formType === 'contact') {
    // --- Contact Form Handling ---
    $name = isset($_POST['name']) ? htmlspecialchars(strip_tags($_POST['name'])) : '';
    $subject = isset($_POST['subject']) ? htmlspecialchars(strip_tags($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(strip_tags($_POST['message'])) : '';

    if (empty($name))
        $missing[] = 'Ad Soyad';
    if (empty($subject))
        $missing[] = 'Konu';
    if (empty($message))
        $missing[] = 'Mesaj';

    if (!empty($missing)) {
        echo json_encode(["status" => "error", "message" => "Lütfen şu alanları doldurunuz: " . implode(', ', $missing)]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Geçersiz email adresi."]);
        exit;
    }

    $toAdmin = "randevu@vhsvizemerkezi.com";
    $subjectAdmin = "Yeni İletişim Mesajı: $subject";
    $messageAdmin = "
        <html>
        <head><title>Yeni İletişim Mesajı</title></head>
        <body style='font-family: Arial, sans-serif;'>
            <h2>Yeni İletişim Formu Mesajı</h2>
            <p><strong>Ad Soyad:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Konu:</strong> $subject</p>
            <br>
            <p><strong>Mesaj:</strong></p>
            <p style='background-color: #f3f4f6; padding: 10px; border-radius: 5px;'>$message</p>
        </body>
        </html>
    ";

} else {
    // --- Application Form Handling (Default) ---
    $name = isset($_POST['name']) ? htmlspecialchars(strip_tags($_POST['name'])) : '';
    $surname = isset($_POST['surname']) ? htmlspecialchars(strip_tags($_POST['surname'])) : '';
    $phone = isset($_POST['phone']) ? htmlspecialchars(strip_tags($_POST['phone'])) : '';
    $country = isset($_POST['country']) ? htmlspecialchars(strip_tags($_POST['country'])) : '';
    $passport = isset($_POST['passport']) ? htmlspecialchars(strip_tags($_POST['passport'])) : '';
    $address = isset($_POST['address']) ? htmlspecialchars(strip_tags($_POST['address'])) : '';
    $dob = isset($_POST['birthdate']) ? htmlspecialchars(strip_tags($_POST['birthdate'])) : '';

    if (empty($name))
        $missing[] = 'Ad';
    if (empty($surname))
        $missing[] = 'Soyad';
    if (empty($phone))
        $missing[] = 'Telefon';

    if (!empty($missing)) {
        echo json_encode(["status" => "error", "message" => "Lütfen şu alanları doldurunuz: " . implode(', ', $missing)]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "Geçersiz email adresi."]);
        exit;
    }

    $toAdmin = "randevu@vhsvizemerkezi.com";
    $subjectAdmin = "Yeni Vize Talebi: $name $surname";
    $messageAdmin = "
        <html>
        <head><title>Yeni Vize Başvurusu</title></head>
        <body style='font-family: Arial, sans-serif;'>
            <h2>Yeni Randevu/Talep Detayları</h2>
            <p><strong>Ad:</strong> $name</p>
            <p><strong>Soyad:</strong> $surname</p>
            <p><strong>Doğum Tarihi:</strong> $dob</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Telefon:</strong> $phone</p>
            <p><strong>Ülke:</strong> $country</p>
            <p><strong>Pasaport No:</strong> $passport</p>
            <p><strong>Adres:</strong> $address</p>
        </body>
        </html>
    ";
}

// Headers for HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: VHS Vize Danışmanlık Merkezi <noreply@vhsvizemerkezi.com>" . "\r\n";

// Send to Admin
$mailSentAdmin = mail($toAdmin, $subjectAdmin, $messageAdmin, $headers);

// Send confirmation to User (Only for Application forms usually, but can do for contact too if desired. Keeping it for application only as per existing logic, or both?)
// Let's send a generic received email for contact as well, but maybe simpler.
// Actually, original code sent confirmation. Let's send confirmation for BOTH but customize text.

if ($formType === 'contact') {
    $subjectUser = "Mesajınız Alındı - VHS Vize Danışmanlık Merkezi";
    $messageUser = "
        <html>
        <head><title>Mesajınız Alındı</title></head>
        <body style='font-family: Arial, sans-serif;'>
            <h2>Sayın $name,</h2>
            <p>İletişim mesajınız tarafımıza ulaşmıştır. En kısa sürede size dönüş yapılacaktır.</p>
            <br>
            <p>Saygılarımızla,<br>VHS Vize Merkezi</p>
        </body>
        </html>
    ";
} else {
    $subjectUser = "Talebiniz Alındı - VHS Vize Danışmanlık Merkezi";
    $messageUser = "
        <html>
        <head><title>Talebiniz Alındı</title></head>
        <body style='font-family: Arial, sans-serif;'>
            <h2>Sayın $name $surname,</h2>
            <p>Vize randevu talebiniz tarafımıza başarıyla ulaşmıştır. Uzman danışmanlarımız talebinizi inceleyip en kısa sürede size dönüş yapacaktır.</p>
            <br>
            <p><strong>Talep Özeti:</strong></p>
            <p>Ülke: $country</p>
            <br>
            <p>Saygılarımızla,<br>VHS Vize Danışmanlık Merkezi</p>
        </body>
        </html>
    ";
}

$mailSentUser = mail($email, $subjectUser, $messageUser, $headers);

if ($mailSentAdmin) {
    if ($formType === 'contact') {
        echo json_encode(["status" => "success", "message" => "Mesajınız başarıyla gönderildi."]);
    } else {
        echo json_encode(["status" => "success", "message" => "Talebiniz başarıyla gönderildi."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Mail gönderilirken bir hata oluştu."]);
}
?>