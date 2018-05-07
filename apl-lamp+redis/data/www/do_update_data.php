<?php
include "mt_framework.php";
include "mt_dao_animals.php";

$fw = new MtF();
$fw->check_login();

$dao = new DaoAnimals();
$rslt = $dao->update_by_pkey(intval($_POST['animal_id']),$_POST['animal_name_j']);
if ($rslt == 1) {
    $_SESSION['message'] = "更新に成功しました。";
} else {
    $_SESSION['message'] = "問題が発生しました。";    
};
header( "Location: do_select_all.php" ) ;
?>

