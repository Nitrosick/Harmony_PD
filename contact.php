<?php
// contact.php
mb_internal_encoding("UTF-8");

$sent  = false;
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $org        = trim($_POST['organization'] ?? '');
    $contact    = trim($_POST['contact_person'] ?? '');
    $phone      = trim($_POST['phone'] ?? '');
    $email      = trim($_POST['email'] ?? '');
    $request    = trim($_POST['request'] ?? '');
    $agree      = isset($_POST['agree']) ? $_POST['agree'] : null;

    if ($org === '' || $contact === '' || $phone === '' || $email === '' || $request === '') {
        $error = 'Пожалуйста, заполните все поля.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Некорректный адрес электронной почты.';
    } elseif ($agree !== '1') {
        $error = 'Не отмечено согласие на обработку персональных данных.';
    } else {
        $to   = 'contact@harmonytec.ru';
        $from = 'contact@harmonytec.ru';

        $subject = 'Новая заявка с сайта harmonytec.ru';
        $body    =
            "Организация: {$org}\n" .
            "Контактное лицо: {$contact}\n" .
            "Телефон: {$phone}\n" .
            "Email: {$email}\n\n" .
            "Запрос:\n{$request}\n";

        $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

        $headers  = "From: Harmonytec сайт <{$from}>\r\n";
        $headers .= "Reply-To: {$email}\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $encodedSubject, $body, $headers)) {
            $sent = true;
        } else {
            $error = 'Не удалось отправить письмо (mail() вернул false).';
        }
    }
}

// НИКАКИХ header() — просто текстовый ответ
if ($sent) {
    echo "OK";
} else {
    echo "ERR: " . $error;
}
