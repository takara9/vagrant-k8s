<?php
include "mt_framework.php";
include "mt_dao_animals.php";

$fw = new MtF();
$fw->check_login();
$dao = new DaoAnimals();
$rslt = $dao->find_by_pkey(intval($_POST['animal_id']));
if ($rslt == 1) {
    $_SESSION['message'] = "";
} else {
    $_SESSION['message'] = "";    
};
include "parts_edit_data.php";
?>

