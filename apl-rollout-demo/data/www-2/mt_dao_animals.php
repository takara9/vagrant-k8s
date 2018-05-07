<?php
Class DaoAnimals
{
    private $dsn;
    private $dbh;
    
    // Constructor
    function __construct() {
        $this->dsn = "mysql:host=mysql;port=3306;dbname=testdb";
        $this->dbh = new PDO($this->dsn, getenv('DB_USER'),getenv('DB_PASSWORD'));
    }

    // キーで一件取得
    public function find_by_pkey($key) {
        $sth = $this->dbh->prepare('SELECT id, name FROM animals WHERE id = :id');
        $sth->bindParam(':id', $key, PDO::PARAM_INT);
        $sth->execute();
        $result = $sth->fetch(PDO::FETCH_ASSOC);
        $count = $sth->rowCount();
        if ($count == 0) {
            return 0;
        } else {
            return $result;
        }
    }

    // キーで一件削除
    public function delete_by_pkey($key) {
        $stmt = $this->dbh->prepare("DELETE FROM animals WHERE id = :id");
        $stmt->bindParam(':id', $key, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // キーで更新
    public function update_by_pkey($key,$val) {
        $stmt = $this->dbh->prepare("UPDATE animals SET name = :name WHERE id = :id");
        $stmt->bindParam(':name', $val, PDO::PARAM_STR);
        $stmt->bindParam(':id', $key, PDO::PARAM_INT);
        return $stmt->execute();
    }

    // データの作成
    public function create_data($val) {
        $stmt = $this->dbh -> prepare("INSERT INTO animals (name) VALUES (:name)");
        $stmt->bindParam(':name', $val, PDO::PARAM_STR);
        return $stmt->execute();
    }

    // 全件取得
    public function select_all() {
        return $this->dbh->query('SELECT id, name FROM animals');
    }

    // キーで一件取得
    public function select_by_val($val) {
        $sql = "SELECT id, name FROM animals WHERE name LIKE ?";
        $stmt = $this->dbh->prepare($sql);
        $stmt->execute(array( "%$_POST[animal_name_j]%" ));
        return $stmt;
    }
}
?>