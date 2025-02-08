$(document).ready(function(){
	hierarchy_table();
})

function hierarchy_table() {
	$.ajax({
        url:"assets/php/ch_all.php",
        method:"POST",
        data:{
            formula:"hierarchy_"
        },
        dataType:"json",
        beforeSend:()=>{
            $('.overlay').show();
        },
        success:function(res){
			$('.overlay').hide();
            select_d = res;
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                str += `<tr class="border border-default" style="text-transform:uppercase">
                            <td>${x.company_desc}</td>
							<td>${x.division_desc}</td>
                            <td>${x.category_desc}</td>
							<td>${x.department_desc}</td>
                        </tr>`;
                })
            }
            data_tablex("#table_hierarchy","#tbody_hierarchy",str);
        }
    })
}



var Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
  });



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