$(document).ready(function () {
  $(".banner_active_storeDeposit").addClass("active3");
  bank_select();
  storeDeposit();
});
var all_ = "";

function numberWithCommas(x) {
  x = parseFloat(x);
  if (isNaN(x)) {
    return "0";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function storeDeposit() {
  $.ajax({
    url: "assets/php/storeDeposit.php",
    method: "POST",
    data: {
      formula: "storedeptable",
    },
    dataType: "json",
    beforeSend: () => {
      $(".overlay ").removeClass("d-none");
    },
    success: function (res) {
      $(".overlay ").addClass("d-none");
      select_d = res;
      console.log(res);

      var str = "",
        total_ = 0;
      if (!$.isEmptyObject(select_d)) {
        select_d.forEach((x) => {
      
		
          str += `<tr class="border border-default font-weight-400 font-size-sm">
							<td style="">${x.branch}</td>
							<td style="">${x.bank}</td>
							<td style="">${x.accnts_name}</td>
							<td style="">${x.accnts_numbers}</td>
							<td style="">${x.dtSales}</td>
							<td style="">${x.dtDeposit}</td>
							<td style="">${(x.amount).toLocaleString()}</td>
							<td style="">${x.referencenum}</td>
							<td>
							<div class="mt--2 " id='banner_image' data-img="${x.attchment}">
								<img data-img="${x.attchment}" style="width: 100px; height: 50px; border-radius:10px" id='tblimg' src="assets/img/storedepattach/${x.attchment}" alt="" class="">
							</div>
						</td>
						
					</tr>`;
        });
      }
      data_table2("#table_strdeposit", "#tbody_strdeposit", str);
      str != "" ? $("#finalize_").removeClass("d-none") : ``;
    },
  });
}

$(document).on('click','#banner_image',function(e){
	e.preventDefault();
  
	const imgSrc = e.target.dataset.img; 
	if (imgSrc) {
	  $('#zoomimg_modal').modal('show');
	  $('#imgz_').html(`<img class='img-fluid' src='assets/img/storedepattach/${imgSrc}'>`);
	} else {
	  console.error("Image source not found.");
	}
  })
  

  function bank_select() {
	$.ajax({
	  url: "assets/php/storeDeposit.php",
	  method: "POST",
	  data: {
		formula: "bank-details",
	  },
	  dataType: "json",
	  beforeSend: function () {
		$(".loading_").removeClass("d-none");
	  },
	  success: function (res) {
		$(".loading_").addClass("d-none");
		var select_d = res;
		console.log("c", res);
  
		var str = '<option value="">Select Branch</option>';
  
		if (!$.isEmptyObject(select_d)) {
		  select_d.forEach((x) => {
			str += `<option value="${x.branch}" data-acct_name="${x.account_name}" 
			data-acct_number="${x.account_num}" data-bank_det="${x.bank}" >${x.branch}</option>`;
		  });
		}
		$("#branches_").html(str).select2();
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }
  
  $(document).on('change','#branches_',function(e){
    e.preventDefault();

    var selectedOption = $(this).find('option:selected');
	var bankDet = selectedOption.data('bank_det');
   		 var acctName = selectedOption.data('acct_name');
    		var acctNumber = selectedOption.data('acct_number');
			$("#bank_det").html(bankDet);
				$("#acct_name").html(acctName);
   				 $("#acct_number").html(acctNumber);

				$("#bank_det_input").val(bankDet);
   		 $("#acct_name_input").val(acctName);
    $("#acct_number_input").val(acctNumber);
});




$(document).on("click", "#newTransact", function (e) {
  e.preventDefault();

  $("#addnewTransact").modal("show");
});


$(document).on("submit", "#form_add", function (e) {
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
		  url: "assets/php/storeDeposit.php",
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
				bank_select();
				storeDeposit();
				$("#addnewTransact").modal("hide");
  
				Swal.fire({
				  title: 'Success!',
				  text: 'Store Deposit Added',
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
  


$(document).on("click", "#todeposit", function (e) {
    e.preventDefault();

    let deposit_code = $(this).data("deposit_code");
    let branch_code = $(this).data("branch_code");
    let bank = $(this).data("bank");
    let acct_name = $(this).data("acct_name");
    let acct_number = $(this).data("acct_number");
    let date = $(this).data("date");
    let datedeposit_ = $(this).data("datedeposit_");
    let tamount = $(this).data("tamount");
    let s = "Change Status to Deposited?";


    Swal.fire({
        closeOnClickOutside: false,
        text: s,
        showCancelButton: true,
        buttons: true,
        dangerMode: false,
    }).then((updatestatus) => {
        if (updatestatus.isConfirmed) {
            $.ajax({
                url: "assets/php/cashin.php",
                method: "POST",
                data: {
                    formula: "inserttbl",
                    deposit_code: deposit_code,
                    branch_code: branch_code,
                    bank: bank,
                    acct_name: acct_name,
                    acct_number: acct_number,
                    date: date,
                    datedeposit_: datedeposit_,
                    tamount: tamount
                },
                beforeSend: () => {},
                success: function (res) {
                    console.log(res);

                    switch (res) {
                        case "success":

							bankdeposit();
                            Swal.fire("Success", "Updated Successfully", {
                                buttons: {
                                    confirm: {
                                        className: "btn btn-dark btn-sm",
                                        confirmButtonColor: "#45026C",
                                    },
                                },
                            });
                        break;

                        default:
                            Swal.fire("Oops!", res, {
                                buttons: {
                                    confirm: {
                                        className: "btn btn-warning",
                                        confirmButtonColor: "#45026C",
                                    },
                                },
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
  

