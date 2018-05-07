#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time
import threading
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait # available since 2.4.0
from selenium.webdriver.support import expected_conditions as EC # available since 2.26.0
from selenium.webdriver.common.by import By

th_objs = [] # スレッドの配列
driver = {}  # 各スレッドのwebdriverオブジェクト格納用

# ブラウザのサイズと表示位置
browsers = [
    { "size-x": "640", "size-y": "480", "pos-x": "0",    "pos-y": "0",   "uid": "tanaka",    "pw": "000", "pase": "1"},
    { "size-x": "640", "size-y": "480", "pos-x": "640",  "pos-y": "0",   "uid": "suzuki",    "pw": "000", "pase": "2"},
    { "size-x": "640", "size-y": "480", "pos-x": "1280", "pos-y": "0",   "uid": "sato",      "pw": "000", "pase": "3"},
    { "size-x": "640", "size-y": "480", "pos-x": "1920", "pos-y": "0",   "uid": "yamamoto",  "pw": "000", "pase": "4"},
    { "size-x": "640", "size-y": "480", "pos-x": "0",    "pos-y": "480", "uid": "sakata",    "pw": "000", "pase": "3"},
    { "size-x": "640", "size-y": "480", "pos-x": "640",  "pos-y": "480", "uid": "hashimoto", "pw": "000", "pase": "2"},
    { "size-x": "640", "size-y": "480", "pos-x": "1280", "pos-y": "480", "uid": "yamada",    "pw": "000", "pase": "1"},
    { "size-x": "640", "size-y": "480", "pos-x": "1920", "pos-y": "480", "uid": "kawada",    "pw": "000", "pase": "5"}
]

# アクセスするウェブサイト
sites =  [
#    { "www": "http://localhost:4040/" }    
    { "www": "http://161.202.142.133/" }
#    { "www": "http://mycluster3.jp-tok.containers.mybluemix.net:31514/index.php" }    
#    { "www": "http://localhost:4040/index.php" }
#    { "www": "http://localhost:4040/index.php"  },
#    { "www": "http://localhost:4040/index2.php" },
#    { "www": "http://localhost:4040/index.php"  },
#    { "www": "http://localhost:4040/index2.php" },
#    { "www": "http://localhost:4040/index.php"  }
]


# スレッドでブラウザを制御する関数
def proc(idx):
    browser = browsers[idx]
    tid = threading.get_ident()

    # ブラウザを択一
    #driver[tid] = webdriver.Chrome()
    driver[tid] = webdriver.Firefox()

    # 位置とサイズ指定
    driver[tid].set_window_size(browser['size-x'], browser['size-y'])
    driver[tid].set_window_position(browser['pos-x'], browser['pos-y'])

    # サイトを巡回
    for site in sites:
        print("idx: ", idx, "id:", threading.get_ident(), "title: ", driver[tid].title)
        driver[tid].get(site['www'])
        time.sleep(3)

        #ログイン
        elem_userid = driver[tid].find_element_by_name('userid')
        elem_userid.send_keys(browser['uid'])
        elem_passwd = driver[tid].find_element_by_name('passwd')
        elem_passwd.send_keys(browser['pw'])
        time.sleep(3)
        elem_passwd.submit()

        for i in range(0,500):
            try:
                time.sleep(int(browser['pase']))
                # 以下、３つのどちらでも動作可能
                #elem_search_btn = driver[tid].find_element_by_id("btn")
                #elem_search_btn = driver[tid].find_element_by_name("reload")
                elem_search_btn = driver[tid].find_element_by_xpath('//*[@id="btn"]')
                elem_search_btn.click()
                #print(driver.title)
            except:
                print("error")
                
        # 終了
        driver[tid].quit()        


# メイン
if __name__ == '__main__':

    # スレッドを登録
    for idx in range(0,len(browsers)):
        th_objs.append( threading.Thread( target=proc,args=(idx,)))

    # スレッドの実行開始
    for i in range(0,len(browsers)):
        th_objs[i].start()
