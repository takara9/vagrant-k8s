<?php
include "mt_framework.php";
include "mt_dao_animals.php";

$fw = new MtF();
$fw->check_login();

$dao = new DaoAnimals();
$rslt = $dao->delete_by_pkey(intval($_POST['animal_id']));

if ($rslt == 1) {
    $_SESSION['message'] = "データの削除に成功しました。";
} else {
    $_SESSION['message'] = "データの削除に失敗しました。";    
}

header( "Location: do_select_all.php" );
?>

