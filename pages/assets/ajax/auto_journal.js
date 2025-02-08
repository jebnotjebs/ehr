$(document).ready(function(){

    Journal_table();
    calculateAndAppendTotals();
})

$(document).on('click','#btn_load',function(e){
	e.preventDefault();
    Journal_table();
})

$(document).on('click','.btn_adjust_entry',function(e){
    $('#journal_id').val(e.target.id);
    $('#journal_date').val(e.target.dataset.date);
    $('#modal_check').modal('show')
    adjust_journal();
    select_account_title();
})

//save adjusted journal
$(document).on('click','#save_journal',function(e){
	e.preventDefault();

    if( $('#total_debit').val() != $('#total_credit').val()){
        Swal.fire({
            title: 'Error!',
            text: 'Journal entries are not balanced!',
            icon: 'error',
            confirmButtonText: "Okay",
            confirmButtonColor: "#343a40",
            showClass: {
              popup: 'swal2-noanimation',
              backdrop: 'swal2-noanimation'
            },
            hideClass: {
              popup: '',
              backdrop: ''
            }
          });

    }else{
        saveJournalData();
    }
	
})

//tab
$(document).on('keydown', '#modal_check tbody button', function(e) {
    // Check if the pressed key is the Tab key
    if (e.keyCode === 9) {
        var lastButtonInTbody = $(this).closest('tbody').find('button:last');
        if ($(this).is(lastButtonInTbody)) {
            e.preventDefault();
            var newRow = `
                <tr class="border border-default" style="text-transform:uppercase">
                    <td>
                        <div class="form-group">
                            <input type="select" id="account_title_data" data-placeholder="" class="form-control" autocomplete="off" list="account_title_list">
                            <datalist id="account_title_list"></datalist>
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <input id="debit_data" type="number" data-placeholder="" class="form-control" value='0'>
                        </div>
                    </td>
                    <td>
                        <div class="form-group">
                            <input id="credit_data" type="number" data-placeholder="" class="form-control" value='0'>
                        </div>
                    </td>
                    
                    <td><button type="button" class="btn btn-md trash-button"><i class="fas fa-trash-alt"></i></button></td>
                </tr>`;
           
            $('#tbody_adjust_journal').append(newRow);
            calculateAndAppendTotals();
        }
    }
});
//remove value
$(document).on('click', '.trash-button', function(e) {
    var row = $(this).closest('tr');
    row.find('#debit_data, #credit_data').val('0');
    row.find('input').not('#debit_data, #credit_data').val('');
    calculateAndAppendTotals();
});

//onchange debit and credit
$(document).on('change', '#debit_data, #credit_data', function(e) {
    e.preventDefault();

    // Get the current row containing the changed input
    var currentRow = $(this).closest('tr');

    // Get the debit and credit fields within the current row
    var debitField = currentRow.find('#debit_data');
    var creditField = currentRow.find('#credit_data');

    // If the changed input is the debit field
    if ($(this).attr('id') === 'debit_data') {
        creditField.val(0);
        calculateAndAppendTotals();
    }
    // If the changed input is the credit field
    else if ($(this).attr('id') === 'credit_data') {
        debitField.val(0);
        calculateAndAppendTotals();
    }
});

function saveJournalData() {

    Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, do it!',
        cancelButtonText: 'No, cancel'
      }).then((result) => {

        if (result.isConfirmed) {
            var journalData = [];
            $("#tbody_adjust_journal tr:not(:last)").each(function() {
                var hasValues = true; // Assume the row has values initially
        
                // Check each input field in the row
                $(this).find("input").each(function() {
                    // If any input field doesn't have a value, set hasValues to false
                    if ($(this).val() === '') {
                        hasValues = false;
                        return false; // Exit the loop early
                    }
                });
                // If the row has values, add its data to the journalData array
                if (hasValues) {
                    var rowData = {
                        // Get data from each input field in the row
                        account_title_: $(this).find("#account_title_data").val(),
                        debit_: $(this).find("#debit_data").val(),
                        credit_: $(this).find("#credit_data").val()
                    };
                    journalData.push(rowData);
                }
            });
            // Send the data to the server
            $.ajax({
                url: "assets/php/auto_journal.php",
                method: "POST",
                data: { 
                    journal_trans_no_:$("#journal_trans_no").val(),
                    date_trans_:$("#journal_date_trans").val(),
                    branch_data_:$("#journal_location").val(),
                    memo_: $('#journal_memo').val(),
                    journalData: JSON.stringify(journalData),
                    formula: "save_journal_"
                }, 
                beforeSend: function() {
                    $('.overlay').show();
                },
                success: function(res) {
                    switch (res) {
                        case "success":
                            Toast.fire({
                                icon: 'success',
                                title: 'JOURNAL ENTRY POSTED SUCCESSFULLY!'
                            });
                            
                            $('.overlay').hide();
                            resetValue();
                            Journal_table();
                            $('#modal_check').modal('hide');
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
            });
        }
    });
}

function adjust_journal() {
    $.ajax({
        url: "assets/php/auto_journal.php",
        method: "POST",
        data: { 
            journal_date_: $('#journal_date').val(),
            journal_id_: $('#journal_id').val(),
            formula: "adjust_journal_" 
        },
        dataType: "json",
        beforeSend: function() {
            $('.overlay').show();
        },
        success: function(res) {
            $('.overlay').hide();
            var str = "", memo = '', location = '';
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += ` <tr class="border border-default" style="text-transform:uppercase">
                                <td>
                                    <div class="form-group">
                                        <input value="${x.account}" type="text" id="account_title_data" class="form-control" auto-complete="off" list="account_title_list">
                                        <datalist id="account_title_list"></datalist>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group">
                                        <input value='${x.debit}' id="debit_data" type="text" class="form-control">
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group">
                                        <input value='${x.credit}' id="credit_data" type="text" class="form-control">
                                    </div>
                                </td>
                                
                                <td><button type="button" class="btn btn-md trash-button"><i class="fas fa-trash-alt"></i></button></td>
                            </tr>`;
                    memo = x.remarks;
                    location = x.branch;
                   
                });
                $('#journal_trans_no').val($('#journal_id').val());
                $('#journal_date_trans').val($('#journal_date').val());
                $('#journal_memo').val(memo);
                $('#journal_location').val(location);
               
                data_table("#table_adjust_journal","#tbody_adjust_journal",str);
                calculateAndAppendTotals();
            } else {
                data_table("#table_adjust_journal","#tbody_adjust_journal","no data");
            }
        }
    });
    
}

function calculateAndAppendTotals() {
    var debitTotal = 0;
    var creditTotal = 0;

    // Iterate through each row in the table body
    $('#tbody_adjust_journal tr').each(function() {
        var debitValue = $(this).find('#debit_data').val();
        var creditValue = $(this).find('#credit_data').val();

        // Check if debit and credit values are not empty
        if (debitValue !== undefined && creditValue !== undefined) {
            var debit = parseFloat(debitValue.replace(/,/g, ''), 10) || 0;
            var credit = parseFloat(creditValue.replace(/,/g, ''), 10) || 0;

            debitTotal += debit;
            creditTotal += credit;
        }
    });

    var totalRow = `
        <tr id="total_row">
            <td class="font-weight-bold">Total</td>
            <td class="font-weight-bold">${formatNumber(debitTotal)}</td>
            <td class="font-weight-bold">${formatNumber(creditTotal)}</td>
            <td></td>
        </tr>`;
    
    // Remove any existing total row before appending the new one
    $('#total_row').remove();
    //compare if the debit ad credit are equal
    $('#total_debit').val(formatNumber(debitTotal));
    $('#total_credit').val(formatNumber(creditTotal));
   
    $('#tbody_adjust_journal').append(totalRow);
}

function Journal_table() {
    $.ajax({
        url: "assets/php/auto_journal.php",
        method: "POST",
        data: { 
            date_filter_: $('#date_filter').val(),
            formula: "auto_journal_" 
        },
        dataType: "json",
        beforeSend: function() {
            $('.overlay').show();
        },
        success: function(res) {
            $('.overlay').hide();
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += `<tr class="border border-default" style="text-transform:uppercase">
                                <td><i class="fas fa-edit fa-2x btn_adjust_entry" id="${x.transaction_no}" data-date="${x.date}" ></i></td>
                                <td>${x.transaction_no}</td>
                                <td>${x.date}</td>
                                <td><div id="journalEntryContainer-${x.transaction_no}"></div></td>
                                <td><div id="debit_container-${x.transaction_no}"></div>
                                    <div class="d-flex justify-content-between text-capitalize text-bold">
                                        <span>Total:</span>
                                        <label>${x.total_debit}</label>
                                    </div>
                                </td>
                                <td><div id="credit_container-${x.transaction_no}"></div>
                                     <div class="d-flex justify-content-between text-capitalize text-bold">
                                        <span>Total:</span>
                                        <label>${x.total_credit}</label>
                                    </div>
                                </td>
                                <td>${x.balance}</td>
                                <td>${x.remarks}</td>
                                <td>${x.branch}</td>
                                <td>${x.type}</td>
                            </tr>`;
        
                    accoutTitle(x.transaction_no,x.date);
                    Debits(x.transaction_no,x.date);
                    Credits(x.transaction_no,x.date);
                });
                data_table("#table_autoJournal","#tbody_autoJournal",str);
            } else {
                data_table("#table_autoJournal","#tbody_autoJournal","");
            }
        }
    });
}

function accoutTitle(transactionNo,date) {
    $.ajax({
        url: "assets/php/auto_journal.php",
        method: "POST",
        data: { code_: transactionNo,
                date_: date,
                formula: "journal_account_title_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += `<div class="col-12 border"> ${x.account} </div>`;
                });
                $("#journalEntryContainer-" + transactionNo).html(str);
            }
        }
    });
}

function Debits(transactionNo,date) {
    $.ajax({
        url: "assets/php/auto_journal.php",
        method: "POST",
        data: { code_: transactionNo,
                date_: date,
                formula: "journal_debit_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + ((x.debit === '-') ? '-' : x.debit) + '</div>';
                });
                $("#debit_container-" + transactionNo).html(str);
            }
        }
    });
}

function Credits(transactionNo,date) {
    $.ajax({
        url: "assets/php/auto_journal.php",
        method: "POST",
        data: { code_: transactionNo,
                date_: date,
                formula: "journal_credit_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + ((x.credit === '-') ? '-' : x.credit) + '</div>';
                });
                $("#credit_container-" + transactionNo).html(str);
            }
        }
    });
}

function select_account_title() {
	$.ajax({
        url:"assets/php/auto_journal.php",
        method:"POST",
        data:{
            formula:"accout_title_"
        },
        dataType:"json",
        beforeSend:()=>{
           
        },
        success:function(res){
			
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                    str += `<option data-atl="${x.mainaccount_no}" value="${x.account_title}">${x.account_title}</option>`;
                })
            }
			$("#account_title_list").html(createOption(str));
           
        }
    })
}

function resetValue(){
    $('#journal_memo').val('');
    $('#journal_location').val('');
    $('#tbody_adjust_journal').empty();
}

var Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
});

var select_d = [];

function formatNumber(number) {
    return parseFloat(number).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function data_table(table_name,tbody_name,data_tbody) {
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

function data_tablex(table_name, tbody_name, data_tbody) {
    $(table_name).DataTable().destroy();
    $(tbody_name).empty().html(data_tbody);
    $(table_name).DataTable({
        dom: 'rt', // Removing paging and other controls
        "pageLength": -1,
        "lengthChange": false,
        "autoWidth": false,
        "ordering": false // Disabling sorting
    });
};