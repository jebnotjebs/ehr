$(document).ready(function () {
  $(".banner_active_cshout").addClass("active3");
  $("#bank_").select2();

  bank_load();
  categ_load();
  branchUnt_load();
  branch_load();
});



function cshouttb() {
    $.ajax({
        url: "assets/php/cashout.php",
        method: "POST",
        data: {
            date_from_: $('#date_from').val(),
            date_to_: $('#date_to').val(),
            formula: "cshouttbl",
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
                                <td style="">${x.bank}</td>
                                <td style="">${x.cheque_num}</td>
                                <td style="">${x.payee}</td>
                                <td style="">${x.cheque_dt}</td>
                                <td style="">${x.dr_dt}</td>
                                <td style="">${x.dr_num}</td>
                                <td style="">${x.category}</td>
                                <td style="">${x.branch}</td>
                                <td style="">${x.branch_unt}</td>
                                <td style="">${x.particulars}</td>
                                <td style="">${Number(x.amount).toLocaleString()}</td>
                                <td style="">${x.rmrks}</td>
                            </tr>`;
                });
                str += `<tr class="border border-default font-weight-bold text-white" style="background-color: gray;">
                            <td style="">TOTAL</td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style=""></td>
                            <td style="">${total_.toLocaleString()}</td>
                            <td style=""></td>
                        </tr>`;
            }
            data_table("#table_cshout", "#tbody_cshout", str);
            str != "" ? $("#finalize_").removeClass("d-none") : ``;
        },
    });
}

$(document).on('submit', '#form_load', function (e) {
    e.preventDefault();
    cshouttb();
});
 
function bank_load() {
	$.ajax({
	  url: "assets/php/cashout.php",
	  method: "POST",
	  data: {
		formula: "banks_",
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
		$("#banks__").html(str).select2();
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }

  function categ_load() {
	$.ajax({
	  url: "assets/php/cashout.php",
	  method: "POST",
	  data: {
		formula: "categ_",
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
		$("#cAteg").html(str).select2();
	  },
	  error: (e) => {
		console.log("ERROR", e);
	  },
	});
  }

  function branch_load() {
    $.ajax({
      url: "assets/php/cashout.php",
      method: "POST",
      data: {
      formula: "brnch_",
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
      $("#bRnch").html(str).select2();
      },
      error: (e) => {
      console.log("ERROR", e);
      },
    });
    }

    function branchUnt_load() {
      $.ajax({
        url: "assets/php/cashout.php",
        method: "POST",
        data: {
        formula: "brnchUnt_",
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

  
$(document).on("click", "#newTransactOut", function (e) {
  e.preventDefault();

  $("#addnewTransactOut").modal("show");
});

$(document).on("click", "#toButton", function (e) {
	e.preventDefault();
  
	$("#releaseTo").modal("show");
  });

  $(document).on("submit", "#form_add", function (e) {
    e.preventDefault();
  
    let data = new FormData($(e.target)[0]);
    Swal.fire({
      title: "Continue?",
      text: "Are you sure you want to continue?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {

        $.ajax({
          url: "assets/php/cashout.php",
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
                bank_load();
                categ_load();
                branchUnt_load();
                branch_load();
              
  
                Swal.fire({
                  title: "Success",
                  text: "Transaction Added",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "OK",
                });
                e.target.reset();
                break;
  
              default:
                Swal.fire({
                  title: "Oops!",
                  text: res,
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "OK",
                });
                break;
            }
          },
          error: (er) => {
            console.log(er);
            Swal.fire("Oops!", "Something went wrong. Please try again later.", "error");
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
  

