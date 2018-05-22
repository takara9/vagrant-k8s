#!/usr/bin/env python                                                           
# -*- coding:utf-8 -*-                                                          
#
# データベース新規作成
#

import sys
import json
from cloudant.client import Cloudant

# 固有名称
database_name = 'sample'
label = 'cloudantNoSQLDB'
i = 0
vcap_path = '../webapp1/config/vcap-local.json'

cred = None

# Cloudant認証情報の取得
try:
  f = open(vcap_path, 'r')
  cred = json.load(f)
  f.close()
except:
    print "ERROR==================="
    import traceback
    traceback.print_exc()

json.dumps(cred)

# クラウダントへの接続
client = Cloudant(cred['services'][label][i]['credentials']['username'], 
                  cred['services'][label][i]['credentials']['password'], 
                  url=cred['services'][label][i]['credentials']['url'])
client.connect()

# DBが存在していたら削除
print "既存データベース ", database_name ," の削除"
try:
    db = client[database_name]
    if db.exists():
        client.delete_database(database_name)
except:
    pass


# DBを新規作成
print "新規データベース ", database_name ," の作成"
try: 
    db = client.create_database(database_name)
    print "データベース作成成功"
except:
    print "データベース作成失敗"
    sys.exit()


