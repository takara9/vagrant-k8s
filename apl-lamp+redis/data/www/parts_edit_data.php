<?php
include "header.php";
?>

<h1>編集</h1>

<form action="do_update_data.php" method="post">
<table border="1">
<tr>
<th width="100" align="center">ID</th>
<th width="200">NAME</th>
</tr>
<?php
    echo $rslt['name'];
    print "<tr>"; 
    print "<td align=\"center\"><input type=\"text\" name=\"animal_id\" value=".$rslt['id']." readonly></td>";
    print "<td><input type=\"text\" name=\"animal_name_j\" value='$rslt[name]'></td>";
    print "</tr>";
?>
</table>
<input type="submit" value="更新" /><br>    
</form>


</body>
</html>
      

