$(document).ready(function () {
  $(".banner_active_depbranch").addClass("active3");
  bank_select();
  chequeregistry();
});
var all_ = "";

function chequeregistry() {
  $.ajax({
    url: "assets/php/assigncheque.php",
    method: "POST",
    data: {
      formula: "chequeRegistrytbl",
    },
    dataType: "json",
    beforeSend: () => {
      $(".overlay").removeClass("d-none");
    },
    success: function (res) {
      $(".overlay").addClass("d-none");
      select_d = res;
      console.log(res);

      var str = "";
      if (!$.isEmptyObject(select_d)) {
        select_d.forEach((x) => {	
			str += `<tr class="border border-default font-weight-400 font-size-sm">
            <td style="">${x.bank}</td>
            <td style="">${x.accnts_num}</td>
            <td style="">${x.accnts_name}</td>
            <td style="">${x.start_chequenum} - ${x.end_chequenum}</td>

        </tr>`;

      			 });
    		  }
      data_table2("#table_chequeregistry", "#tbody_chequeregistry", str);
    },
  });
}
function bank_select() {
	$.ajax({
	  url: "assets/php/assigncheque.php",
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
  
		var str = '<option style="line-height: 18px;" value="">Select Bank</option>';
  
		if (!$.isEmptyObject(select_d)) {
		  select_d.forEach((x) => {
			str += `<option style="line-height: 18px;" value="${x.bcode}" data-bank_desc="${x.bank_name}" data-acct_name="${x.account_name}" 
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
		  url: "assets/php/assigncheque.php",
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
				chequeregistry();
				bank_select();
				$("#addnewTransact").modal("hide");
  
				Swal.fire({
				  title: 'Success!',
				  text: 'Cheque Successfully Registered',
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
  

