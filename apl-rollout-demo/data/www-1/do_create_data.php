<?php
include "mt_framework.php";
include "mt_dao_animals.php";

$fw = new MtF();
$fw->check_login();

$dao = new DaoAnimals();
$rslt = $dao->create_data($_POST['animal_name_j']);

if ($rslt == 1) {
    $_SESSION['message'] = "データの登録に成功しました。";
} else {
    $_SESSION['message'] = "データの登録に失敗しました。";    
}
header( "Location: do_select_all.php" );
?>
