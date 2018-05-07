<?php
include "mt_framework.php";
$fw = new MtF();
$fw->check_login();
include "header.php";
?>
<h1>検索</h1>
<form action="do_search_data.php" method="post">
<table border="1">
<tr>
<td width="100">検索単語</td>
<td width="100"><input type="text" name="animal_name_j" /></td>
</tr>
</table>
<input type="submit" value="検索" /><br>
</form>   
</body>
</html>
      

