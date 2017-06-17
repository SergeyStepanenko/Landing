<?
    $to = 'moilend@adwebpro.ru, s.kaginyan@mail.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Заявка c AdWebPro.ru'; //Загаловок сообщения
	$email = strip_tags($_POST['email']);
    $phone = strip_tags($_POST['phone']);

    $message = '
    <html>
    <head>
    <title>'.$subject.'</title>
    </head>
    <body>
	<p>Email: '.$email.'</p>
    <p>Телефон: '.$phone.'</p>
    </body>
    </html>'; //Текст нащего сообщения можно использовать HTML теги

    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя

    mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

    echo $name;
?>
