$(document).ready(function(){
    subcategory_table();
})

//add btn
$(document).on('click','#btn_add',function(e){
	e.preventDefault();
    $('#modal_add').modal('show');
	toa_select();
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
				url:"assets/php/subcategory.php",
				method:"POST",
				data:{
					toa_list_:$('#toa_list').val(),
					category_list_:$('#category_list').val(),
					subcategory_id_:$('#subcategory_id').val(),
					formula:"add_"
				},
				beforeSend: () => {
				},
				success: function(res) {
					switch (res) {
						case "success":
							Toast.fire({
								icon: 'success',
								title: 'SUBCATEGORY ADDED SUCCESSFULLY!'
							});
							subcategory_table();
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
        url:"assets/php/subcategory.php",
        method:"POST",
        data:{
			subcategory_data_:$('#subcategory_data').val(),
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
							<td>${x.toa}</td>
							<td>${x.category_code}</td>
							<td>${x.category}</td>
							<td>${x.subcategory_code}</td>
							<td>${x.subcategory}</td>
							<td>${x.status} <i class="fas fa-pen-square change_status" id="${x.status}" data-id_="${x.id}" style="font-size: 17px;"></i></td>
                        </tr>`;
                })
            }
            data_tablex("#table_subcategory","#tbody_subcategory",str);
        }
    })
})

//toa
$(document).on('click','#remv_toa',function(e){
	e.preventDefault();
	$("#category_list").prop("readonly", true);
	$('#toa_list').val('');
	$('#toa_desc').html('');
})

$(document).on('change', '#toa_list', function(e) {
    e.preventDefault();
	if($('#toa_list').val() == '' || null){
		$("#category_list").prop("readonly", true);
	}
	else{
		$("#category_list").prop("readonly", false);
	}
	category_select();
    $("#toa_desc").html($("#select_toa option[value='" + $(this).val() + "']").data('t_desc'));
});

//category
$(document).on('click','#remv_category',function(e){
	e.preventDefault();
	$('#category_list').val('');
	$('#category_desc').html('');
})

$(document).on('change', '#category_list', function(e) {
    e.preventDefault();
    $("#category_desc").html($("#select_category option[value='" + $(this).val() + "']").data('c_desc'));
});


//select toa
function toa_select() {
	$.ajax({
        url:"assets/php/subcategory.php",
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
        url:"assets/php/subcategory.php",
        method:"POST",
        data:{
			c_:$('#toa_list').val(),
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
				str += `<option data-c_desc='${x.category}' value ='${x.category_code}'>${x.category}</option>`;
                })
            }
			$("#select_category").html(createOption('Select type of account', str));
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
				url:"assets/php/subcategory.php",
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
							subcategory_table();
		
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

function subcategory_table() {
	$.ajax({
        url:"assets/php/subcategory.php",
        method:"POST",
        data:{
            formula:"subcategory_"
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
                            <td>${x.toa}</td>
                            <td>${x.category_code}</td>
                            <td>${x.category}</td>
							<td>${x.subcategory_code}</td>
							<td>${x.subcategory}</td>
							<td>${x.status} <i class="fas fa-pen-square change_status" id="${x.status}" data-id_="${x.id}" style="font-size: 17px;"></i></td>
                           
                        </tr>`;

				str2 += `<option data-s_desc="${x.subcategory}" value ='${x.subcategory_code}'>${x.subcategory}</option>`;
                })
            }
            data_tablex("#table_subcategory","#tbody_subcategory",str);
			$("#subcategory_data").html(createOptionAll('Select type of account', str2));
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