$(document).ready(function(){
	Pages();
})

function Pages() {
	$.ajax({
		url:"assets/php/index.php",
		method:"POST",
		data:{
			formula:"check_pages"
		},
		dataType:"json",
		beforeSend:()=>{
			$('.load_spinner').removeClass('d-none');
		},
		success:function(res){
			$('.load_spinner').addClass('d-none');
			select_d = res;
			var str ="";
			if (!$.isEmptyObject(select_d)) {
				select_d.forEach((x)=>{		

					// str += `${(x.page_name = 'ot' ? $('.xx').addClass('d-none') : '')}`;
				})
			}
			
		}
	})
}

var select_d = [];

function createOption(title, str){
	return "<option value ='' selected disabled>"+title+"</option>"+str;
}

function createOptionAll(title, str){
	return "<option value ='' selected disabled>"+title+"</option> <option value ='All'>All</option>"+str;
}

//data-tables
function data_tablex(table_name,tbody_name,data_tbody) {
    $(table_name).DataTable().destroy();
    $(tbody_name).empty().html(data_tbody);
    $(table_name).DataTable(
    	{ dom: 'Bfrtip',
    		"pageLength": 5,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["excel", "pdf", "print", "colvis"]
	    }
	);
};
