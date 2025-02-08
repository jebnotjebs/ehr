$(document).ready(function(){
    mainaccount_table();
})

//add btn
$(document).on('click','#btn_add',function(e){
	e.preventDefault();
    $('#modal_add').modal('show');
	toa_select();
    // $('#report_data').select2();
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
        url:"assets/php/main_account.php",
        method:"POST",
        data:{
			acctTitle_:$('#sub_data').val(),
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
							<td>${x.account_no}</td>
							<td>${x.toa}</td>c
							<td>${x.category_code}</td>
							<td>${x.category}</td>
							<td>${x.subcategory_code}</td>
							<td>${x.subcategory}</td>
							<td>${x.mainaccount_no}</td>
							<td>${x.account_title}</td>
                        </tr>`;
                })
            }
            data_tablex("#table_main","#tbody_main",str);
        }
    })
})

//toa
$(document).on('click','#remv_toa',function(e){
	e.preventDefault();
	$("#category_data").prop("readonly", true);
	$('#toa_data').val('');
	$('#toa_desc').html('');
})

$(document).on('change', '#toa_data', function(e) {
    e.preventDefault();
	if($('#toa_data').val() == '' || null){
		$("#category_data").prop("readonly", true);
	}
	else{
		$("#category_data").prop("readonly", false);
	}
	category_select();
    $("#toa_desc").html($("#select_toa option[value='" + $(this).val() + "']").data('t_desc'));
});

//category
$(document).on('click','#remv_category',function(e){
	e.preventDefault();
    $("#subcategory_data").prop("readonly", true);
	$('#category_data').val('');
	$('#category_desc').html('');
})

$(document).on('change', '#category_data', function(e) {
    e.preventDefault();
    if($('#category_data').val() == '' || null){
		$("#subcategory_data").prop("readonly", true);
	}
	else{
		$("#subcategory_data").prop("readonly", false);
	}
    subcategory_select();
    $("#category_desc").html($("#select_category option[value='" + $(this).val() + "']").data('c_desc'));
});

//subcategory
$(document).on('click','#remv_subcategory',function(e){
	e.preventDefault();
   
	$('#subcategory_data').val('');
	$('#subcategory_desc').html('');
})
$(document).on('change', '#subcategory_data', function(e) {
    e.preventDefault();
    $("#subcategory_desc").html($("#subcategory_list option[value='" + $(this).val() + "']").data('sc_desc'));
});

//account title filter load
$(document).on('click','#remv_acc_title',function(e){
	e.preventDefault();
	$('#sub_data').val('');
	$('#accoutTitle_desc').html('');
})

$(document).on('change', '#sub_data', function(e) {
    e.preventDefault();
    $("#accoutTitle_desc").html($("#sub_list option[value='" + $(this).val() + "']").data('at_desc'));
});

//select toa
function toa_select() {
	$.ajax({
        url:"assets/php/main_account.php",
        method:"POST",
        data:{
            formula:"toa_"
        },
        dataType:"json",
        beforeSend:()=>{
			$('.loading_').removeClass('d-none');
        },
        success:function(res){
			$('.loading_').addClass('d-none');
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

				str += `<option data-t_desc = '${x.toa}' value ='${x.account_no}'>${x.toa}</option>`;
				
                })
            }
			$("#select_toa").html(createOption('Select type of account', str));
			
        }
    })
}

//select category
function category_select() {
	$.ajax({
        url:"assets/php/main_account.php",
        method:"POST",
        data:{
			c_:$('#toa_data').val(),
            formula:"category_"
        },
        dataType:"json",
        beforeSend:()=>{
			$('.loading_').removeClass('d-none');
        },
        success:function(res){
			$('.loading_').addClass('d-none');
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		
				str += `<option data-c_desc = '${x.category}' value ='${x.category_code}'>${x.category}</option>`;
                })
            }
			$("#select_category").html(createOption('Select type of account', str));
        }
    })
}

//select subcategory
function subcategory_select() {
	$.ajax({
        url:"assets/php/main_account.php",
        method:"POST",
        data:{
			c_:$('#category_data').val(),
            formula:"subcategory_"
        },
        dataType:"json",
        beforeSend:()=>{
			$('.loading_').removeClass('d-none');
        },
        success:function(res){
			$('.loading_').addClass('d-none');
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		
				str += `<option data-sc_desc='${x.subcategory}' value ='${x.subcategory_code}'>${x.subcategory}</option>`;
                })
            }
			$("#subcategory_list").html(createOption('Select type of account', str));
        }
    })
}

//chagne status
$(document).on('click','.change_status',function(e){
	e.preventDefault();

	let a = (e.target.id == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
	Swal.fire({
		title: 'Set status to ' + a + '?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#343a40',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes!'
	  }).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				url:"assets/php/main_account.php",
				method: "POST",
			
				data:{
					id_:e.target.dataset.id_,
					status_:a,
					formula:"status_"
				},
				
				beforeSend: () => {
				},
				success: function(res) {
					switch (res) {
						case "success":
							Toast.fire({
										icon: 'success',
										title: 'STATUS SET TO ' + a
									});
							mainaccount_table();
		
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

function mainaccount_table() {
	$.ajax({
        url:"assets/php/main_account.php",
        method:"POST",
        data:{
            formula:"main_account_"
        },
        dataType:"json",
        beforeSend:()=>{
            $('.overlay').show();
        },
        success:function(res){
			$('.overlay').hide();
            select_d = res;
            
            var str ="",str2 = "";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                str += `<tr class="border border-default" style="text-transform:uppercase">
							<td>${x.account_no}</td>
							<td>${x.toa}</td>c
							<td>${x.category_code}</td>
							<td>${x.category}</td>
							<td>${x.subcategory_code}</td>
							<td>${x.subcategory}</td>
							<td>${x.mainaccount_no}</td>
							<td>${x.account_title}</td>
                        </tr>`;

				str2 += `<option data-at_desc="${x.account_title}" value ='${x.mainaccount_no}'>${x.account_title}</option>`;
                })
            }
            data_tablex("#table_main","#tbody_main",str);
			$("#sub_list").html(createOptionAll('Select account title', str2));
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