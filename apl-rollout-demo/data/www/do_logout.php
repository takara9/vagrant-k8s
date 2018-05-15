<?php
include "mt_framework.php";
$fw = new MtF();
$fw->do_logout();
include "header.php";
print "ログアウトしました。";
?>

<h2>ログアウト完了ページ</h2>


<a href="index.php">トップページへ戻る</a>


