<?php
include "mt_framework.php";
include "mt_dao_animals.php";

$fw = new MtF();
$fw->check_login();

$dao = new DaoAnimals();
$rslt = $dao->select_by_val($_POST['animal_name_j']);
if ($rslt == 1) {
    $_SESSION['message'] = "";
} else {
    $_SESSION['message'] = "問題が発生しました。";    
};
include "parts_result_search.php";
?>

