<script>
  $(document).ready(function(){
    $("#txt").click(function(){
        $("p").toggle();
    });
    $("#img").click(function(){
        $("img").toggle();
    });

  });
</script>

<h1>PHP+MySQL+Redisのサンプルコード</h1>

<table width="1000">

<tr><td>
PHPのDockerコンテナを学習するために作成したシンプルなPHPとMySQLを利用するアプリです。<br>
コンテンツにアクセスするには、最初にログインしてください。
ログインのユーザーIDとパスワードは、空白を除く任意の文字列です。
</td></tr>

<tr><td>
<button id="txt">テキストの表示／消去</button>
<button id="img">画像の表示／消去</button>
</td></tr>

<tr><td>      
<p>Dockerコンテナとは関係無いのですが、メニューバーの動作は、スタイル・シートの機能で実現しています。そして、表示のトグル・ボタンは、JQueryの機能で実現しています。</p>
</td></tr>

<tr><td>      
<img src="images/tank.png" width="980">
</td></tr>

</table>      

</body>
</html>
