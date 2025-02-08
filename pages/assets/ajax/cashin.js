$(document).ready(function () {
	$(".banner_active_cshin").addClass("active3");
	$("#bank_").select2();
  
	bank_load();
	bank_load1();
	bank_select();

  });
  var all_ = "";
  
  function numberWithCommas(x) {
	x = parseFloat(x);
	if (isNaN(x)) {
	  return "0";
	}
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  function bankdeposit() {
	$.ajax({
	  url: "assets/php/cashin.php",
	  method: "POST",
	  data: {
		all_: all_,
		bank: $("#bank_").val(),
		date_: $("#date_").val(),
		formula: "bankdeposit",
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
			total_ += Number(x.tamount);
		  
			str += `<tr class="border border-default font-weight-400 font-size-sm">
							  <td style="">${x.branch_code}</td>
							  <td style="">${x.bank}</td>
							  <td style="">${x.acct_name}</td>
							  <td style="">${x.acct_number}</td>
							  <td style="">${x.date}</td>
							  <td style="">${x.datedeposit_}</td>
							  <td style="">${Number(x.tamount).toLocaleString()}</td>
							  <td>
							  ${(x.cashin_status == "PENDING"
								  ? `<button id="todeposit" class="bg-warning" data-deposit_code="${x.deposit_code}" data-bcode="${x.bcode}" data-branch_code="${x.branch_code}"  data-banking="${x.bank}"  data-acct_name="${x.acct_name}" 
										  data-acct_number="${x.acct_number}" data-date="${x.date}" data-datedeposit_="${x.datedeposit_}" data-tamount="${x.tamount}"
										  style="width: 100px; height: 29px;border-radius: 3px;	color: white; border: transparent;">PENDING</button>`
								  : `<button disabled  style="width: 100px; height: 29px;border-radius: 3px;	color: white; border: transparent; background-color: #4F5357 ;opacity: 50%;">DEPOSITED</button>`
							  )}
							  </td>
					  </tr>`;
		  });
		  str += `<tr class="border border-default font-weight-bold text-white" style="background-color: gray;">
							  <td style="">TOTAL</td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style="">${total_.toLocaleString()}</td>
							  <td style=""></td>
						  </tr>`;
		}
		data_table2("#table_cdeposit", "#tbody_cdeposit", str);
		str != "" ? $("#finalize_").removeClass("d-none") : ``;
	  },
	});
  }
  

  function bankdeposited() {
	$.ajax({
	  url: "assets/php/cashin.php",
	  method: "POST",
	  data: {
		all_: all_,
		bank: $("#bank_").val(),
		date_: $("#date_").val(),
		formula: "cshinDeposited",
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
			total_ += Number(x.amount);
		  
			str += `<tr class="border border-default font-weight-400 font-size-sm">
							  <td style="">${x.branch_code}</td>
							  <td style="">${x.bank}</td>
							  <td style="">${x.acc_name}</td>
							  <td style="">${x.acc_num}</td>
							  <td style="">${x.dt_of_sale}</td>
							  <td style="">${x.dt_of_dpst}</td>
							  <td style="">${Number(x.amount).toLocaleString()}</td>
					  </tr>`;
		  });
		  str += `<tr class="border border-default font-weight-bold text-white" style="background-color: gray;">
							  <td style="">TOTAL</td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style=""></td>
							  <td style="">${total_.toLocaleString()}</td>
						  </tr>`;
		}
		data_table("#table_cdeposited", "#tbody_cdeposited", str);
		str != "" ? $("#finalize_").removeClass("d-none") : ``;
	  },
	});
  }

  $(document).on('change','#all__',function(e){
	e.preventDefault();

	if ($(this).is(":checked")) 
	{	
		$('#bank').attr('disabled','');
		all_ = 'checked';
	}
	else
	{	
		$('#bank').removeAttr('disabled');
		all_ = 'uncheck';
	}
})

$(document).on('click','#load_ars',function(e){
	e.preventDefault();
	
	if (all_ == "checked" || $('#bank').val() != '') 
	{
		bankdeposit();
		bankdeposited();
	}
	else
	{
		swal("Oops", "Please Complete All Fields", {
			buttons: {
				confirm: {
					className : 'btn btn-warning'
				}
			},
		});
	}
})

  function bank_load() {
	  $.ajax({
		url: "assets/php/cashin.php",
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
		  select_d = res;
		  console.log("c", res);
	
		  var str = "";
		  if (!$.isEmptyObject(select_d)) {
			select_d.forEach((x) => {
			  str += `<option value ='"${x.bcode}"'>${x.bank} | ${x.acct_number}</option>`;
			});
		  }
		  $("#bank_").html(str);
		},
		error: (e) => {
		  console.log("ERROR", e);
		},
	  });
	}
  
	function bank_load1() {
	  $.ajax({
		url: "assets/php/cashin.php",
		method: "POST",
		data: {
		  formula: "bank_dtls",
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
			  str += `<option value ='${x.code}'>${x.name}</option>`;
			});
		  }
		  $("#banks_").html(str);
		},
		error: (e) => {
		  console.log("ERROR", e);
		},
	  });
	}
  
	function bank_select() {
	  $.ajax({
		url: "assets/php/cashin.php",
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
	
		  var str = '<option value="">Select Bank</option>';
	
		  if (!$.isEmptyObject(select_d)) {
			select_d.forEach((x) => {
			  str += `<option value="${x.bcode}" data-bank_desc="${x.bank}" data-acct_name="${x.acct_name}" 
			  data-acct_number="${x.acct_number}">${x.bcode}</option>`;
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
  
  
  
  $(document).on("click", "#newTransact", function (e) {
	e.preventDefault();
  
	$("#addnewTransact").modal("show");
  });
  
  
  $(document).on("submit", "#form_add", function (e) {
	e.preventDefault();
  
	let data = new FormData($(e.target)[0]);
	swal({
	  closeOnClickOutside: false,
	  text: `Continue ?`,
	  buttons: true,
	  dangerMode: false,
	}).then((addimgEmployee) => {
	  if (addimgEmployee) {
		$.ajax({
		  url: "assets/php/cashin.php",
		  method: "POST",
		  processData: false,
		  contentType: false,
		  data: data,
		  beforeSend: () => {},
		  success: function (res) {
			console.log(res);
			switch (res) {
			  case "success":
				  bank_load();
				  bank_load1();
				  bank_select();
				$("#addnewTransact").modal("hide");
  
				swal("Success", "Transaction Added", {
				  buttons: {
					confirm: {
					  className: "btn btn-dark btn-sm",
					},
				  },
				});
				e.target.reset();
				break;
  
			  default:
				swal("Oops!", res, {
				  buttons: {
					confirm: {
					  className: "btn btn-warning",
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
  
  
  $(document).on("click", "#todeposit", function (e) {
	  e.preventDefault();
  
	  let deposit_code = $(this).data("deposit_code");
	  let bcode = $(this).data("bcode");
	  let branch_code = $(this).data("branch_code");
	  let bank = $(this).data("banking");
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
					  bcode: bcode,
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
							bankdeposited();
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
		pageLength: 1000,
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
		pageLength: 1000,
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
	
  
  