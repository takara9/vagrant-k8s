<?php
include "mt_framework.php";
include "mt_dao_animals.php";

$fw = new MtF();
$fw->check_login();

$dao = new DaoAnimals();
$rslt = $dao->find_by_pkey(intval($_POST['animal_id']));
include "header.php";
?>

<h1>詳細表示</h1>

<?php if ( $rslt == 0 ) { ?>
検索キー <?php echo intval($_POST['animal_id']); ?> で見つりませんでした。<br>
IDを確かめて、再度、お願いします。

<?php } else { ?>

<table border="1">
<tr>
<td width="200">ID</td>
<td width="400"><?php echo $rslt['id']?></td>
</tr>
<tr>
<td width="200">テキスト</td>             
<td width="400"><?php echo $rslt['name']?></td>             
</tr>
</table>

<?php } ?>

</body>
</html>
      

