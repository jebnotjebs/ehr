$(document).ready(function(){
    listcoa_table();
})



//form_add
$(document).on('submit','#form_add',function(e){
	e.preventDefault();

	Swal.fire({
		title: 'Are you sure?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#343a40',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes!'
	  }).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				url:"assets/php/main_account.php",
				method:"POST",
				data:{
					toa_list_:$('#toa_data').val(),
					category_list_:$('#category_data').val(),
					subcategory_id_:$('#subcategory_data').val(),
                    acct_title_:$('#acct_title').val(),
                    balance_data_:$('#balance_data').val(),
                    report_data_:$('#report_data').val(),
					formula:"add_"
				},
				beforeSend: () => {
				},
				success: function(res) {
					switch (res) {
						case "success":
							Toast.fire({
								icon: 'success',
								title: 'ACCOUNT TITLE ADDED SUCCESSFULLY!'
							});
							mainaccount_table();
							$('#modal_add').modal('hide');
							$('#form_add')[0].reset();	
							break;
						default:
							Swal.fire({
								icon: 'error',
								title: res,
								text: 'Something went wrong!'
							});
							break;
					}
				},
				error: er => {
					console.log(er);
				}
			})
		}
	  })
})

//load
$(document).on('submit','#form_load',function(e){
	e.preventDefault();

	$.ajax({
        url:"assets/php/listcoa.php",
        method:"POST",
        data:{
			date_from_:$('#date_from').val(),
			date_to_:$('#date_to').val(),
            formula:"load_"
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
                            <td>${x.mainaccount_no}</td>
							<td>${x.account_title}</td>
							<td>${x.balance}</td>
                        </tr>`;
                })
            }
            data_tablex("#table_listcoa","#tbody_listcoa",str);
        }
    })
})

function listcoa_table() {
	$.ajax({
        url:"assets/php/listcoa.php",
        method:"POST",
        data:{
            formula:"listcoa_"
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
                            <td>${x.mainaccount_no}</td>
                            <td>${x.account_title}</td>
							<td>${x.balance}</td>
                        </tr>`;
                })
            }
            data_tablex("#table_listcoa","#tbody_listcoa",str);
		
        }
    })
}

function branches() {
	$.ajax({
        url:"assets/php/listcoa.php",
        method:"POST",
        data:{
            formula:"branches_"
        },
        dataType:"json",
        beforeSend:()=>{
           
        },
        success:function(res){
			
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                    str += `<option value ='${x.code}'>${x.name}</option>`;
                })
            }
			$("#branches_data").html(createOptionAll('Select branch', str));
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
    		"pageLength": 100,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["excel", "pdf", "print", "colvis"]
	    }
	);
};