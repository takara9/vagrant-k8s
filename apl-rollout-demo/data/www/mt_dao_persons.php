<?php
Class DaoPersons
{
    private $dsn;
    private $dbh;
    
    // Constructor
    function __construct() {
        $this->dsn = "mysql:host=mysql;port=3306;dbname=testdb";
        $this->dbh = new PDO($this->dsn, getenv('DB_USER'),getenv('DB_PASSWORD'));
    }

    // キーで一件取得
    public function find_by_userid($key) {
        $sth = $this->dbh->prepare('SELECT userid, kanji_name, kanji_fname, pace, photo_file_name, sex, passwd FROM persons WHERE userid = :userid');
        $sth->bindParam(':userid', $key, PDO::PARAM_STR);
        $sth->execute();
        $result = $sth->fetch(PDO::FETCH_ASSOC);
        $count = $sth->rowCount();
        if ($count == 0) {
            return 0;
        } else {
            return $result;
        }
    }
}
?>