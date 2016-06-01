
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

</head>
<body>
<?php
$headers .= 'MIME-Version: 1.0' . "\r\n";  
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";  

$headers .= "From:".$_POST['email']." \r\n" .  
       "Reply-To:".$_POST['email']." \r\n" .  
       "X-Mailer: PHP/" . phpversion();  
$tresc = '<!DOCTYPE html><html lang="pl-PL"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><h1>'.$_POST['email'].'</h1><h2>'.$_POST['name'].'</h2><p>'.$_POST['message'].'</p></body></html>';
$temat = "WebWarriors.pl - wiadomość z formularza";

// send email
mail("wielgus.michaal@gmail.com", $temat, $tresc, $headers);
?> 
</body>
</html>