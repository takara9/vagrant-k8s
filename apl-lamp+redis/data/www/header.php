<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>ミニ システム</title>
<link rel="stylesheet" href="stylesheets/basic.css" type="text/css">
<script src="javascripts/jquery-3.2.1.js"></script>
<script src="javascripts/mt_framework.js"></script>    
</head>
<body>
<?php include "menu.php"; ?>
<?php
  // メッセージエリア
  if (isset($_SESSION["message"])) {
      print $_SESSION["message"];
      $_SESSION["message"] = "";
  }
?>
      

