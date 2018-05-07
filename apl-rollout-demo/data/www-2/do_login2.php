<?php
include "mt_framework2.php";
$fw = new MtF();

if ($fw->do_login()) {
    $_SESSION['message'] = "ログインに成功しました。";
} else {
    $_SESSION['message'] = "ログインに失敗しました。";
}

// カウンタ変数の初期化
$_SESSION['view_counter'] = 0;

header( "Location: top2.php" ) ;
?>

