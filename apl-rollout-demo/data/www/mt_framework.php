<?php


Class MtF
{
    // Constructor
    function __construct() {
        session_start();
    }

    // ログイン状態チェック
    public function check_login() {
        if (isset($_SESSION["userid"])) {
            return;
        } else {
            header( "Location: index.php" ) ;
        }
    }

    // ログイン認証
    public function do_login($rslt) {

        if ($rslt > 0) {
            $_SESSION["userid"] =  $_POST['userid'];
            $_SESSION["passwd"] =  $_POST['passwd'];

            if (isset($_SESSION["count"])) {
                $_SESSION["count"]++;
            } else {
                $_SESSION["count"] = 1;
            }
            return 1;

        } else {
            return 0;
        }
    }

    // ログアウト
    public function do_logout() {
        session_unset ();
        return 1;
    }
}
?>