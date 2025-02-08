$(document).ready(function(){
    category_table();
})

//load
$(document).on('submit','#form_load',function(e){
	e.preventDefault();

	$.ajax({
        url:"assets/php/category.php",
        method:"POST",
        data:{
			ctgry_:$('#select_categoty').val(),
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
                            <td>${x.status} <i class="fas fa-pen-square change_status" id="${x.status}" data-id_="${x.id}" style="font-size: 17px;"></i></td>
                        </tr>`;
                })
            }
            data_tablex("#table_category","#tbody_category",str);
        }
    })
})



//add
$(document).on('click','#btn_add',function(e){
	e.preventDefault();

    $.ajax({
        url:"assets/php/category.php",
        method:"POST",
        data:{
            formula:"toa_"
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

				str += `<option  data-toa_desc='${x.toa}' value ='${x.account_no}'>${x.toa} - ${x.account_no}</option>`;
                })
            }
			$("#select_toa").html(createOption('Select type of account', str));
        }
    })

    $(document).on('change','#select_toa',function(e){
        e.preventDefault();
        $("#type_account").val($(this).find(':selected').data('toa_desc'));
    })


    Swal.fire({
        title: 'Input fields:',
        html:
            '<form id="myForm">' +
                '<select id="select_toa" class="swal2-select" required></select>' +
                '<label for="type_account" class="swal2-label">Type of Account:</label>' +
                '<input id="type_account" readonly class="swal2-input" placeholder="Type of account" required>' +
                '<label for="ctgry" class="swal2-label">Category:</label>' +
                '<input id="ctgry" class="swal2-input" placeholder="Category" required>' +
            '</form>',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#343a40',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: () => {
            if ($('#myForm')[0].checkValidity()) {
                return {
                    input1: $('#select_toa').val(),
                    input2: $('#type_account').val(),
                    input3: $('#ctgry').val()
                };
            } else {
                Swal.showValidationMessage('Please fill out all the required fields');
                return false;
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "assets/php/category.php",
                method: "POST",
                data: {
                    select_toa_: result.value.input1,
                    type_account_: result.value.input2,
                    ctgry_: result.value.input3,
                    formula: "add_"
                },
                beforeSend: () => {
                },
                success: function(res) {
                    switch (res) {
                        case "success":
                            Toast.fire({
                                icon: 'success',
                                title: 'CATEGORY ADDED SUCCESSFULLY!'
                            });
                            category_table();
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
    });
})

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
				url:"assets/php/category.php",
				method: "POST",
			
				data:{
					id_:e.target.dataset.id_,
					status_:a,
	
					formula:"status_"
				},
				
				beforeSend: () => {
		
				},
				success: function(res) {
		
					console.log(res);
					switch (res) {
						case "success":
							Toast.fire({
										icon: 'success',
										title: 'STATUS SET TO ' + a
									});
							category_table();
		
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

function category_table() {
	$.ajax({
        url:"assets/php/category.php",
        method:"POST",
        data:{
            formula:"category_"
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
							<td>${x.status} <i class="fas fa-pen-square change_status" id="${x.status}" data-id_="${x.id}" style="font-size: 17px;"></i></td>
                           
                        </tr>`;

				str2 += `<option data-category_desc='${x.category}' value='${x.category_code}'>${x.category}</option>`;
                })
            }
            data_tablex("#table_category","#tbody_category",str);
			$("#select_categoty").html(createOptionAll('Select type of account', str2));
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