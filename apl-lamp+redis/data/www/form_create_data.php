<?php
include "mt_framework.php";
$fw = new MtF();
$fw->check_login();
include "header.php";
?>

<h1>新規登録</h1>
<form action="do_create_data.php" method="post">
<table border="1">
<tr>
<th width="100" align="center">ID</th>
<th width="200">NAME</th>
</tr>
<tr>
<td>テキスト</td><td><input type="text" name="animal_name_j" /></td>
</tr>
</table>
<input type="submit" value="登録" /><br>
</form>   

</body>
</html>
      

