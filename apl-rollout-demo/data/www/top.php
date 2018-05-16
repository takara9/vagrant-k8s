<?php
include "mt_framework.php";
include "mt_dao_persons.php";

// ログインチェック
$fw = new MtF();
$fw->check_login();

// HTML Header と メッセージエリア処理
include "header.php";

// アクセスカウンタ更新
$_SESSION['view_counter'] = $_SESSION['view_counter'] + 1;

// ユーザー情報取得
$dao = new DaoPersons();
$rslt = $dao->find_by_userid($_SESSION["userid"]);
?>

<h1>アプリ ver 1.0</h1>

<table>
<tr>
  <th width="180">
    写真
  </th>
  <th width="100">
    項目
  </th>
  <th width="180">
    データ
  </th>
</tr>

      
<tr>
<td rowspan="3" align="center">
  <img src="/images/<?php print $rslt['photo_file_name']?>" width="180">
</td>

<td>
  苗字:
</td>
<td>
  <font size=7 color="black">
    <?php print $rslt['kanji_name']; ?>
  </font>
</td>
</tr>

<!--
<tr>
<td>
  <p>ホスト名:
</td>
<td>
  <font size=5 color="yellow">
    <?php print gethostname() ?>
  </font>
</td>
</tr>
-->
<tr>
  <td>
    カウンタ =
  </td>
  <td>
    <font size=7 color="blue">
      <?php print $_SESSION['view_counter'] ?>
    </font>                          
  </td>
</tr>
<tr>
  <td>
    <button id="btn" name="reload">アップ</button>
  </td>
  <td>
    <a href='do_logout.php'>ログアウト</a>
  </td>
</tr>
  
</table>


<script>
$(function() {
  $('#btn').click(function(e) {
    $(this).text("アップ");
    location.reload();
  });
});
</script>

<H2>実行中コンテナのホスト名：<?php echo gethostname(); ?></H2>

