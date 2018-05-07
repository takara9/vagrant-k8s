<?php
include "mt_framework.php";
$fw = new MtF();
$fw->check_login();
include "header.php";
?>
<h1>コンテナホスト名</h1>
<H1>ホスト名：<?php echo gethostname(); ?></H1>
     
</body>
</html>
