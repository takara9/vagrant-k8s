/*!
 * ミニフレームワーク
 *
 */
function line_menu_action(act,id){
    console.log("act = ",act, "id = ",id);

    if (act == 1){
        // 編集
        var url = "do_get_by_pkey.php";
        var data = {'animal_id' : id};
        
        var $form = $('<form/>', {'action': url, 'method': 'post'});
        for(var key in data) {
            $form.append($('<input/>', {'type': 'hidden', 'name': key, 'value': data[key]}));
        }
        $form.appendTo(document.body);
        $form.submit();

    } else if (act == 2) {
        // 削除
        if (confirm("削除を続行しますか？")) {
            $.ajax(
		{
                    type: "POST",
                    url: "do_delete_data.php",
                    data: {'animal_id' : id},
                    success: function() {
			location.reload();
                    }
		}
            );
	} else {
	    alert('キャンセルされました'); 
	}
    } else if (act == 3) {
        var url = "view_detail.php";
        var data = {'animal_id' : id};
        
        var $form = $('<form/>', {'action': url, 'method': 'post'});
        for(var key in data) {
            $form.append($('<input/>', {'type': 'hidden', 'name': key, 'value': data[key]}));
        }
        $form.appendTo(document.body);
        $form.submit();
    }

}
