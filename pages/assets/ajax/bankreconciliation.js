$(document).ready(function () {
  $(".banner_active_bankrecon").addClass("active3");
  $("#bankdets_").select2();
  bank_load1();
  branchload();
  bank_select();
  category_();
  branchuntsload();
  
});

function numberWithCommas(x) {
  x = parseFloat(x);
  if (isNaN(x)) {
    return "0";
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function reconcilation() {
    $.ajax({
        url: "assets/php/bankreconciliation.php",
        method: "POST",
        data: {
            bankdets_: $('#bankdets_').val(),
            datefrom_: $('#datefrom_').val(),
            dateto_: $('#dateto_').val(),
            formula: "tbl_bank_recon",
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
					total_ = parseFloat(x.balance).toLocaleString();
						
                    str += `<tr class="border border-default font-weight-400 font-size-sm">
                                <td style=""><input type="checkbox"></td>
								<td style="">${x.dt_date}</td>
								<td style="">${x.particulars == null ? '' : x.particulars}</td>						
								<td style="">${x.money_out == null || isNaN(x.money_out) ? '' : parseFloat(x.money_out).toLocaleString()}</td>
								<td style="">${x.money_in == null || isNaN(x.money_in) ? '' : parseFloat(x.money_in).toLocaleString()}</td>
								<td style="">${x.balance == null || isNaN(x.balance) ? '' : parseFloat(x.balance).toLocaleString()}</td>
                                <td style="">
								<button class="tblButton btn btn-outline-dark btn-gray"  data-toggle="tooltip" data-placement="bottom" title="EDIT"><i class=" fas fa-edit text-secondary"></i></button>
								<button class="tblButton btn btn-outline-dark btn-gray" data-toggle="tooltip" data-placement="bottom" title="DELETE"><i class=" fas fa-trash text-danger"></i></button>
								<button data-dt_date=${x.dt_date} data-bank=${x.bank} data-cheqn=${x.cheqn} data-cheqdate=${x.cheqdate} data-drnumber=${x.drnumber} 
								data-drdate=${x.drdate} data-particulars=${x.particulars} data-branch=${x.branch}  class="tblButton btn-outline-dark btn-gray btn" id='buttonView' data-toggle="tooltip" data-placement="bottom" title="VIEW"><i class=" fas fa-search text-secondary"></i></button>
							
								</td>
                            </tr>`;
                });

			str += `<tr class="border border-default font-weight-bold text-white" style="background-color: gray;">
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style="">TOTAL BALANCE</td>
				<td style="">${total_}</td>
			</tr>`;

            }
            data_table("#table_recon", "#tbody_recon", str);
        },
    });
}
function reconciliationView(dt_date, bank, cheqn, cheqdate, drnumber, drdate, particulars, branch) {
    var str = "<tr class='border border-default font-weight-bold'>";
	str += `<td>${dt_date ? dt_date : ''}</td>`;
    str += `<td>${bank ? bank : ''}</td>`;
    str += `<td>${cheqn ? cheqn : ''}</td>`;
    str += `<td>${cheqdate ? cheqdate : ''}</td>`;
    str += `<td>${drnumber ? drnumber : ''}</td>`;
    str += `<td>${drdate ? drdate : ''}</td>`;
    str += `<td>${particulars ? particulars : ''}</td>`;
    str += `<td>${branch ? branch : ''}</td>`;
    str += "</tr>";
    data_table("#table_reconsview", "#tbody_reconsview", str);
}

$(document).on("click", "#buttonView", function (e) {
    e.preventDefault();
    let dt_date = $(this).data("dt_date");
    let bank = $(this).data("bank");
    let cheqn = $(this).data("cheqn");
    let cheqdate = $(this).data("cheqdate");
    let drnumber = $(this).data("drnumber");
    let drdate = $(this).data("drdate");
    let particulars = $(this).data("particulars");
    let branch = $(this).data("branch");

    $("#reconviewfunc").modal("show");
    reconciliationView(dt_date, bank, cheqn, cheqdate, drnumber, drdate, particulars, branch);
});
/*
function reconcilation() {
    $.ajax({
        url: "assets/php/bankreconciliation.php",
        method: "POST",
        data: {
            bankdets_: $('#bankdets_').val(),
            datefrom_: $('#datefrom_').val(),
            dateto_: $('#dateto_').val(),
            formula: "tbl_bank_recon",
        },
        dataType: "json",
        beforeSend: () => {
            $(".load_spinner").removeClass("d-none");
        },
        success: function (res) {
            $(".load_spinner").addClass("d-none");
            select_d = res;
            console.log(res);

            var str = "";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x) => {
					total_ = parseFloat(x.balance).toLocaleString();
					banks__ = (x.bank);
					datefrom_ = $('#datefrom_').val(),
					dateto_ = $('#dateto_').val(),
                    str += `<tr class="border border-default font-weight-bold">
                                <td style=""><input type="checkbox"></td>
								<td style="">${x.dt_date}</td>
								<td style="">${x.cheqn == null ? '' : x.cheqn}</td>
								<td style="">${x.cheqdate == null ? '' : x.cheqdate}</td>
								<td style="">${x.drnumber == null ? '' : x.drnumber}</td>
								<td style="">${x.drdate == null ? '' : x.drdate}</td>
								<td style="">${x.particulars == null ? '' : x.particulars}</td>
								<td style="">${x.branch == null ? '' : x.branch}</td>								
								<td style="">${x.money_out == null || isNaN(x.money_out) ? '' : parseFloat(x.money_out).toLocaleString()}</td>
								<td style="">${x.money_in == null || isNaN(x.money_in) ? '' : parseFloat(x.money_in).toLocaleString()}</td>
								<td style="">${x.balance == null || isNaN(x.balance) ? '' : parseFloat(x.balance).toLocaleString()}</td>
                                <td style="">
								<button class="tblButton ">EDIT</button>
								<button class="tblButton ">DELETE</button>
							
								</td>
                            </tr>`;
                });
		 str += `<tr class="border border-default font-weight-bold text-white" style="background-color: gray;">
				<td style="">DATE</td>
				<td style="">${datefrom_ }</td>
				<td style="">-</td>
				<td style="">${dateto_ }</td>
				<td style=""></td>
				<td style="">BANK ACCOUNT</td>
				<td style="">${banks__ }</td>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style="">TOTAL BALANCE</td>
				<td style="">${total_}</td>
			</tr>`; 

			str += `<tr class="border border-default font-weight-bold text-white" style="background-color: gray;">
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style=""></td>
				<td style="">TOTAL BALANCE</td>
				<td style="">${total_}</td>
			</tr>`;

            }
            data_table("#table_recon", "#tbody_recon", str);

        },
    });
} */
	$(document).on('submit', '#form_load', function (e) {
		e.preventDefault();
		reconcilation();
	});

  function bank_load1() {
	$.ajax({
	  url: "assets/php/bankreconciliation.php",
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
  
		var str = '<option value="">Select Bank</option>';
		if (!$.isEmptyObject(select_d)) {
		  select_d.forEach((x) => {
			str += `<option value ='${x.bcode}'>${x.bcode}</option>`;
		  });
		}
		$("#bankdets_").html(str);
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }
  function branchload() {
	$.ajax({
	  url: "assets/php/bankreconciliation.php",
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
			str += `<option value ='${x.code}'>${x.name}</option>`;
		  });
		}
		$("#branches_").html(str).select2();
		$("#bRnch").html(str).select2();
		
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }

  function bank_select() {
	$.ajax({
	  url: "assets/php/bankreconciliation.php",
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
			str += `<option value="${x.bcode}" data-bank_desc="${x.bank}" data-acct_name="${x.acct_name}" 
			data-acct_number="${x.acct_number}">${x.bcode}</option>`;
		  });
		}
		$("#bank_det").html(str).select2();
		$("#bankss_").html(str).select2();
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
        url: "assets/php/bankreconciliation.php",
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

function branchuntsload() {
	$.ajax({
	  url: "assets/php/bankreconciliation.php",
	  method: "POST",
	  data: {
		formula: "branchunits",
	  },
	  dataType: "json",
	  beforeSend: function () {
		$(".loading_").removeClass("d-none");
	  },
	  success: function (res) {
		$(".loading_").addClass("d-none");
		select_d = res;
		console.log("c", res);
  
		var str = '<option value="">Select Branch Unit</option>';
		if (!$.isEmptyObject(select_d)) {
		  select_d.forEach((x) => {
			str += `<option value ='${x.descrip}'>${x.descrip}</option>`;
		  });
		}
		$("#bRnchUnt").html(str).select2();
	
		
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }

function category_() {
	$.ajax({
	  url: "assets/php/bankreconciliation.php",
	  method: "POST",
	  data: {
		formula: "categ",
	  },
	  dataType: "json",
	  beforeSend: function () {
		$(".loading_").removeClass("d-none");
	  },
	  success: function (res) {
		$(".loading_").addClass("d-none");
		select_d = res;
		console.log("c", res);
  
		var str = '<option value="">Select Category</option>';
		if (!$.isEmptyObject(select_d)) {
		  select_d.forEach((x) => {
			str += `<option value ='${x.descrip}'>${x.descrip}</option>`;
		  });
		}
		$("#categs").html(str).select2();
		
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }

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
	  pageLength: 3,
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
  

