<?php
include "mt_framework.php";
$fw = new MtF();

if ($fw->do_login()) {
    $_SESSION['message'] = "ログインに成功しました。";
} else {
    $_SESSION['message'] = "ログインに失敗しました。";
}
header( "Location: top.php" ) ;
?>

