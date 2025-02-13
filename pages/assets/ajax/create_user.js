$(document).ready(function () {
	user_table();
});
var all_ = "";

$(document).on('submit','#form_add_newuser',function(e){
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
				url:"assets/php/create_user.php",
				method: "POST",
			
				data:{
					username_: $("#username").val(),
					password_: $("#password").val(),
					formula:"add_row_newuser"
				},
				
				beforeSend: () => {
		
				},
				success: function(res) {
					switch (res) {
						case "success":
							$("#addnewTransact").modal("hide");
							user_table();
							Swal.fire({
								title: 'Success!',
								text: 'New User Added',
								icon: 'success',
								confirmButtonColor: '#3085d6',
								confirmButtonText: 'OK',
								allowOutsideClick: false
							}).then(() => {
								e.target.reset();
							});
							break;
		
						default:
							Swal.fire({
								title: 'Oops!',
								text: res,
								icon: 'error',
								confirmButtonColor: '#3085d6',
								confirmButtonText: 'OK'
							});
					}
				},
				error: er => {
					console.log(er);
				}
			})
		}
	  })

})

function user_table() {
	$.ajax({
        url:"assets/php/create_user.php",
        method:"POST",
        data:{
            formula:"usert_"
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

                str += `<tr class="border border-default">
                            <td>${x.id}</td>
                            <td>${x.username}</td>
                            <td>${x.password}</td>
							<td>${x.dt_added}</td> 
							<td>
							<div class="btn-group" role="group">
							
								<button class="btn btn-sm text-secondary btnview  btn-gray btn-outline-dark mr-1" data-toggle="tooltip" data-placement="bottom" title="Edit data"
								  data-id="${x.id}">
									<i class="fa fa-edit"></i>
								</button>
								<button class="btn btn-sm text-secondary btn_delete  btn-gray btn-outline-dark mr-1" data-toggle="tooltip" data-placement="bottom" title="Delete Data"
								  id="${x.id}">
									<i class="fa fa-times"></i>
								</button>
								
							</div>
						</td>
                        </tr>`;
                })
            }
            data_table("#table_user","#tbody_user",str);
        }
    })
}
// Delete
$(document).on('click','.btn_delete',function(e){
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
				url:"assets/php/create_user.php",
				method: "POST",
			
				data:{
					id_: e.target.id,
					formula:"delete_"
				},
				
				beforeSend: () => {
		
				},
				success: function(res) {
					switch (res) {
						case "success":
							$("#addnewTransact").modal("hide");
							user_table();
							Swal.fire({
								title: 'Success!',
								text: 'Deleted Successfully',
								icon: 'success',
								confirmButtonColor: '#3085d6',
								confirmButtonText: 'OK',
								allowOutsideClick: false
							}).then(() => {
								e.target.reset();
							});
							break;
		
						default:
							Swal.fire({
								title: 'Oops!',
								text: res,
								icon: 'error',
								confirmButtonColor: '#3085d6',
								confirmButtonText: 'OK'
							});
					}
				},
				error: er => {
					console.log(er);
				}
			})
		}
	  })

})

$(document).on('click', '.btnview', function (e) {
	e.preventDefault();

	let id = $(this).data("id");

	$('#editnewuserModal').modal('show');
	$.ajax({
		url: "assets/php/create_user.php",
		method: "POST",
		data: {
			id: id,
			formula: 'getdata',
		},
		beforeSend: () => {

		},
		success: function (res) {
			console.log(res);
			let json = JSON.parse(res);
			$('#edit_id').val(json.id);
			$('#edit_username').val(json.username);
			$('#edit_password').val(json.password);
		},
		error: err => {
			console.log(er);
		}
	})
})

$(document).on('submit', '#form_edit', function (e) {
	e.preventDefault();

	let data = new FormData($(e.target)[0]);

	Swal.fire({
		title: 'Confirmation',
		text: 'Continue ?',
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes',
		cancelButtonText: 'No',
		reverseButtons: true,
	}).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				url: "assets/php/create_user.php",
				method: "POST",
				processData: false,
				contentType: false,
				data: data,
				beforeSend: () => {
				},
				success: function (res) {
					console.log(res);

					switch (res) {
						case "success":
							$('#editnewuserModal').modal('hide');
							user_table();
							Swal.fire({
								title: 'Success',
								text: 'Updated Successfully',
								icon: 'success',
								confirmButtonColor: '#3085d6',
								confirmButtonText: 'OK',
								allowOutsideClick: false
							});
							break;

						default:
							Swal.fire({
								title: 'Oops!',
								text: res,
								icon: 'warning',
								confirmButtonClass: 'btn btn-warning',
							});
							break;
					}
				},
				error: er => {
					console.log(er);
				}
			});
		}
	});
});


$(document).on("click", "#newTransact", function (e) {
	e.preventDefault();

	$("#addnewTransact").modal("show");
});



//data-tables
function data_table(table_name, tbody_name, data_tbody) {
	$(table_name).DataTable().destroy();
	$(tbody_name).empty().html(data_tbody);
	$(table_name).DataTable({
		dom: "Bfrtip",
		pageLength: "5",
		sort: true,
		buttons: [
			/*{
						  extend:    'copyHtml5',
						  text:      '<span style="font-size: 10px;"> Copy</span>',
						  titleAttr: 'Copy',
						  exportOptions: {
							  columns: [ 0, 1, 2, 3]
						  }
	  
					  },*/
			{
				extend: "excelHtml5",
				autoFilter: true,
				text: '<span style="font-size: 10px;"> Excel</span>',
				titleAttr: "Excel",
			},
			/*{
						  extend:    'csvHtml5',
						  text:      '<span style="font-size: 10px;"> Csv</span>',
						  titleAttr: 'CSV',
						  exportOptions: {
							  columns: [ 0, 1, 2, 3 ]
						  }
	  
					  },*/
			{
				extend: "pdfHtml5",
				text: '<span style="font-size: 10px;"> Pdf</span>',
				titleAttr: "PDF",
			},
			{
				extend: "print",
				title: '<div style="display: none;"></div>',
				messageBottom: "Developed by Only Solution",
				text: '<span style="font-size: 10px;"> Print</span>',
				titleAttr: "Print",
			},
		],
	});
}

function data_table2(table_name, tbody_name, data_tbody) {
	$(table_name).DataTable().destroy();
	$(tbody_name).empty().html(data_tbody);
	$(table_name).DataTable({
		dom: "Bfrtip",
		ordering: false,
		pageLength: 5,
		buttons: [
			/*{
						  extend:    'copyHtml5',
						  text:      '<span style="font-size: 10px;"> Copy</span>',
						  titleAttr: 'Copy',
						  exportOptions: {
							  columns: [ 0, 1, 2, 3]
						  }
	  
					  },*/
			{
				extend: "excelHtml5",
				autoFilter: true,
				text: '<span style="font-size: 10px;"> Excel</span>',
				titleAttr: "Excel",
			},
			/*{
						  extend:    'csvHtml5',
						  text:      '<span style="font-size: 10px;"> Csv</span>',
						  titleAttr: 'CSV',
						  exportOptions: {
							  columns: [ 0, 1, 2, 3 ]
						  }
	  
					  },*/
			{
				extend: "pdfHtml5",
				text: '<span style="font-size: 10px;"> Pdf</span>',
				titleAttr: "PDF",
			},
			{
				extend: "print",
				title: '<div style="display: none;"></div>',
				messageBottom: "Developed by Only Solution",
				text: '<span style="font-size: 10px;"> Print</span>',
				titleAttr: "Print",
			},
		],
	});
}

//snackbar
function notify_me(title, message, status) {
	$.notify(
		{
			// options
			icon: "flaticon-alarm-1",
			title: title,
			message: message,
			target: "_blank",
		},
		{
			// settings
			element: "body",
			position: null,
			type: status,
			allow_dismiss: true,
			newest_on_top: true,
			showProgressbar: false,
			placement: {
				from: "top",
				align: "center",
			},
			offset: 20,
			spacing: 10,
			z_index: 1031,
			delay: 1500,
			timer: 400,
			url_target: "_blank",
			mouse_over: null,
			animate: {
				enter: "animated fadeInDown",
				exit: "animated fadeOutUp",
			},
			onShow: null,
			onShown: null,
			onClose: null,
			onClosed: null,
			icon_type: "class",
		}
	);
}