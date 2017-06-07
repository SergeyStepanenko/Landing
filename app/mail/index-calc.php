<?
    $to = 'grover2006@yandex.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Заявка c AdWebPro.ru (калькулятор)'; //Загаловок сообщения
	$email = strip_tags($_POST['email']);
    $phone = strip_tags($_POST['phone']);
    $screens = strip_tags($_POST['screens']);
    $adaptive = strip_tags($_POST['adaptive']);
    $price = strip_tags($_POST['price']);

    $message = '
    <html>
    <head>
    <title>'.$subject.'</title>
    </head>
    <body>
	<p>Email: '.$email.'</p>
    <p>Телефон: '.$phone.'</p>
    <p>Кол-экранов: '.$screens.'</p>
    <p>Адаптив: '.$adaptive.'</p>
    <p>Цена: '.$price.'</p>
    </body>
    </html>'; //Текст нащего сообщения можно использовать HTML теги

    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Отправитель <from@example.com>\r\n"; //Наименование и почта отправителя

    mail($to, $subject, $message, $headers); //Отправка письма с помощью функции mail

    echo $name;
?>
