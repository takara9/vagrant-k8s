<?php
include "mt_framework.php";
$fw = new MtF();

include "mt_dao_persons.php";
$dao = new DaoPersons();
$rslt = $dao->find_by_userid($_POST["userid"]);

if ($fw->do_login($rslt) and $rslt['passwd'] == $_POST["passwd"]) {
    $_SESSION['message'] = "ログインに成功しました。";
    // カウンタ変数の初期化
    $_SESSION['view_counter'] = 0;
    header( "Location: top.php" ) ;
} else {
    $_SESSION['message'] = "ログインに失敗しました。";
    $_SESSION["userid"] = null;
    header( "Location: index.php" ) ;
}

?>

