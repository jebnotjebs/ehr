$(document).ready(function () {
  $(".banner_active_depbranch").addClass("active3");
  bank_select();
  depbranchtable();
  branch_load();
});
var all_ = "";

function depbranchtable() {
  $.ajax({
    url: "assets/php/depbranch.php",
    method: "POST",
    data: {
      formula: "depbranchtbl",
    },
    dataType: "json",
    beforeSend: () => {
      $(".overlay ").removeClass("d-none");
    },
    success: function (res) {
      $(".overlay ").addClass("d-none");
      select_d = res;
      console.log(res);

      var str = "";
      if (!$.isEmptyObject(select_d)) {
        select_d.forEach((x) => {	
			str += `<tr class="border border-default font-weight-400 font-size-sm">
            <td style="">${x.bank}</td>
            <td style="">${x.account_num}</td>
            <td style="">${x.account_name}</td>
            <td style="">${x.branch}</td>
            <td>
                <div class="btn-group" role="group">
                    <!-- <button class="btn btn-sm text-secondary btnview btn-gray btn-outline-dark mr-1" data-toggle="tooltip" data-placement="bottom" title="Edit data"
                        data-id="${x.id}">
                        <i class="fa fa-edit"></i>
                    </button> -->
                    ${(x.stats == 'Active'
                            ? `<button class="btn btn-sm btn-gray btn-outline-dark btnchange"
                            data-toggle="tooltip" data-placement="bottom" title="Change Status"
                            data-id="${x.id}" data-status="${x.stats}">
                            <i class="fas fa-dot-circle text-success"></i>
                        </button>`
                            : `<button class="btn btn-sm btn-gray btn-outline-dark btnchange"
                            data-toggle="tooltip" data-placement="bottom" title="Change Status"
                            data-id="${x.id}" data-status="${x.stats}">
                            <i class="fas fa-dot-circle text-danger "></i>
                        </button>`
                        )}
                </div>
            </td>
        </tr>`;

      			 });
    		  }
      data_table2("#table_newbanks", "#tbody_newbanks", str);
    },
  });
}
function bank_select() {
	$.ajax({
	  url: "assets/php/depbranch.php",
	  method: "POST",
	  data: {
		formula: "bank",
	  },
	  dataType: "json",
	  beforeSend: function () {
		$(".loading_").removeClass("d-none");
	  },
	  success: function (res) {
		$(".loading_").addClass("d-none");
		var select_d = res;
		console.log("c", res);
  
		var str = '<option value="">Select Bank</option>';
  
		if (!$.isEmptyObject(select_d)) {
		  select_d.forEach((x) => {
			str += `<option value="${x.bcode}" data-bank_desc="${x.bank_name}" data-acct_name="${x.account_name}" 
			data-acct_number="${x.account_number}">${x.bcode}</option>`;
		  });
		}
		$("#bank_det").html(str).select2();
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }
  
  $(document).on('change','#bank_det',function(e){
    e.preventDefault();

    var selectedOption = $(this).find('option:selected');
   		 var acctName = selectedOption.data('acct_name');
    		var acctNumber = selectedOption.data('acct_number');
   	
				$("#acct_name").html(acctName);
   			 $("#acct_number").html(acctNumber);
   		 $("#acct_name_input").val(acctName);
    $("#acct_number_input").val(acctNumber);
});


function branch_load() {
	$.ajax({
	  url: "assets/php/depbranch.php",
	  method: "POST",
	  data: {
		formula: "branch",
	  },
	  dataType: "json",
	  beforeSend: function () {
		$(".loading_").removeClass("d-none");
	  },
	  success: function (res) {
		$(".loading_").addClass("d-none");
		select_d = res;
		console.log("c", res);
  
		var str = '<option value="">Select Branch</option>';
		if (!$.isEmptyObject(select_d)) {
		  select_d.forEach((x) => {
			str += `<option value ='${x.name}'>${x.name}</option>`;
		  });
		}
		$("#branches_").html(str).select2();
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }


$(document).on('click', '.btnchange', function(e) {
    e.preventDefault();

    let id = $(this).data("id");
    let status = $(this).data("status");

    let s = (status == 'Active' ? 'Disable this Account ?' : 'Enable this Account ?');

    Swal.fire({
        title: 'Confirmation',
        text: s,
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
                url: "assets/php/depbranch.php",
                method: "POST",
                data: {
                    id: id,
                    status: status,
                    formula: 'change',
                },
                beforeSend: () => {
                },
                success: function(res) {
                    console.log(res);

                    switch (res) {
                        case "success":
                            depbranchtable();
                            Swal.fire({
                                title: 'Success',
                                text: 'Updated Successfully',
                                icon: 'success',
                                confirmButtonClass: 'btn btn-dark btn-sm',
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

$(document).on('click','.btnview', function(e){
	e.preventDefault();

	let id = $(this).data("id");

	$('#editnewbankModal').modal('show');
	$.ajax({
		url: "assets/php/depbranch.php",
		method:"POST",
		data:{
			id: id,
			formula: 'getdata',
		},
		beforeSend:()=>{

		},
		success:function (res) {
			console.log(res);
			let json = JSON.parse(res);
			$('#edit_id').val(json.id);
			$('#edit_bank_det').val(json.bank);
          	$('#edit_acct_name').val(json.account_num);
			$('#edit_acct_number').val(json.account_name);
			$('#edit_branches_').val(json.branch);
		},
		error: err =>{
			console.log(er);
		}
	})
})

$(document).on('submit', '#form_edit', function(e) {
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
                url: "assets/php/depbranch.php",
                method: "POST",
                processData: false,
                contentType: false,
                data: data,
                beforeSend: () => {
                },
                success: function(res) {
                    console.log(res);
                    
                    switch (res) {
                        case "success":
                            newBanks();
                            $('#editnewbankModal').modal('hide');
                            
                            Swal.fire({
                                title: 'Success',
                                text: 'Successfully Updated',
                                icon: 'success',
                                confirmButtonClass: 'btn btn-dark btn-sm',
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


$(document).on("submit", "#form_add_newDepbranch", function (e) {
	e.preventDefault();
  
	let data = new FormData($(e.target)[0]);
	
	Swal.fire({
	  title: 'Continue?',
	  text: 'Are you sure you want to continue?',
	  icon: 'question',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Yes',
	  cancelButtonText: 'No'
	}).then((result) => {
	  if (result.isConfirmed) {
		$.ajax({
		  url: "assets/php/depbranch.php",
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
				depbranchtable();
				$("#addnewTransact").modal("hide");
  
				Swal.fire({
				  title: 'Success!',
				  text: 'Branch assigned to bank',
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
				break;
			}
		  },
		  error: (er) => {
			console.log(er);
		  },
		});
	  }
	});
  });
  
//data-tables
function data_table(table_name, tbody_name, data_tbody) {
	$(table_name).DataTable().destroy();
	$(tbody_name).empty().html(data_tbody);
	$(table_name).DataTable({
	  dom: "Bfrtip",
	  pageLength: max,
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
	  pageLength: 10,
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
  

