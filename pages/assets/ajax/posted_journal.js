$(document).ready(function(){
    $('.overlay').hide();
    Journal_table();
})

$(document).on('click','#btn_load',function(e){
	e.preventDefault();

    Journal_table();
})

$(document).on('click','.btn_adjust_entry',function(e){
    $('#tbody_adjust_journal').empty();
    $('#journal_id').val(e.target.id);
    $('#journal_date').val(e.target.dataset.date);
    $('#modal_adjust_entry').modal('show')
    adjust_journal();
    select_account_title();
    modal_journal();
})

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
$(document).on('keydown', '#modal_adjust_entry tbody button', function(e) {
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

function adjust_journal() {
    $.ajax({
        url: "assets/php/posted_journal.php",
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
            var memo = '', location = '';
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    memo = x.memo;
                    location = x.location;
                });
                $('#journal_trans_no_x').val($('#journal_id').val());
                $('#journal_date_trans_x').val($('#journal_date').val());
                $('#journal_memo_x').val(memo);
                $('#journal_location_x').val(location);

                $('#journal_location').val(location);
                let transCode = $('#journal_id').val()
                let extension = parseInt(transCode.split('-')[1]) || 0; // Extract extension or default to 0 if not found
                extension = String(extension + 1).padStart(2, '0'); // Increment extension and pad with leading zeros if necessary
                let newTransCode = transCode.split('-')[0] + '-' + extension; // Construct new transaction code
                $('#journal_trans_no').val(newTransCode);
            } 
            addNewRow();
            calculateAndAppendTotals();
        }
    });
}

function addNewRow() {
    var newRow = `
        <tr class="border border-default" style="text-transform:uppercase">
            <td>
                <div class="form-group">
                    <input type="select" id="account_title_data" data-placeholder="" class="form-control" list="account_title_list">
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
    
    $('.overlay').hide();
    
    // Append the new row to the table body
    $('#tbody_adjust_journal').append(newRow);
    $('.trash-button').last().click(function() {
        var row = $(this).closest('tr');
        row.find('#debit_data, #credit_data').val('0');
        row.find('input').not('#debit_data, #credit_data').val('');
        calculateAndAppendTotals();
    });
    // Calculate totals and append a new row
    calculateAndAppendTotals();
}

function modal_journal() {
    $.ajax({
        url: "assets/php/posted_journal.php",
        method: "POST",
        data: { 
            journal_date_: $('#journal_date').val(),
            journal_id_: $('#journal_id').val(),
            formula: "modal_journal_" 
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
                    str += ` <tr class="border border-default" style="text-transform:uppercase">
                                <td><div id="ModaljournalEntryContainer-${x.transaction_no}"></div></td>
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
                            </tr>`;
                            accoutTitle(x.transaction_no,x.date_transaction);
                            Debits(x.transaction_no,x.date_transaction);
                            Credits(x.transaction_no,x.date_transaction);
                   
                });
                data_tablex("#table_ModalpostedJournal","#tbody_ModalpostedJournal",str);
            } else {
                data_tablex("#table_ModalpostedJournal","#tbody_ModalpostedJournal","");
            }
        }
    });
    
}

function saveJournalData() {

    if($('#journal_memo').val() == ''){
        Swal.fire({
            icon: 'error',
            title: 'Input Error',
            text: 'Please input memo',
            confirmButtonText: 'OK',
            customClass: {
                confirmButton: 'bg-dark'
              },
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
                    var hasValues = true; 
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
                            account_title_: $(this).find("#account_title_data").val(),
                            debit_: $(this).find("#debit_data").val(),
                            credit_: $(this).find("#credit_data").val()
                        };
                        journalData.push(rowData);
                    }
                });
                $.ajax({
                    url: "assets/php/posted_journal.php",
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
                                $('#modal_adjust_entry').modal('hide')
                                break;
                            default:
                                Swal.fire({
                                    icon: 'error',
                                    title: res,
                                    text: 'Please contact the developer!'
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
   
}

function Journal_table() {
    $.ajax({
        url: "assets/php/posted_journal.php",
        method: "POST",
        data: { 
            date_filter_: $('#date_filter').val(),
            formula: "posted_journal_" 
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
                                <td><i class="fas fa-edit fa-2x btn_adjust_entry" id="${x.transaction_no}" data-date="${x.date_transaction}" ></i></td>
                                <td>${x.transaction_no}</td>
                                <td>${x.date_transaction}</td>
                                <td><div id="journalEntryContainer-${x.transaction_no}"></div></td>
                                <td><div id="Modaldebit_container-${x.transaction_no}"></div>
                                    <div class="d-flex justify-content-between text-capitalize text-bold">
                                        <span>Total:</span>
                                        <label>${x.total_debit}</label>
                                    </div>
                                </td>
                                <td><div id="Modalcredit_container-${x.transaction_no}"></div>
                                    <div class="d-flex justify-content-between text-capitalize text-bold">
                                        <span>Total:</span>
                                        <label>${x.total_credit}</label>
                                    </div>
                                </td>
                                <td>${x.memo}</td>
                                <td>${x.location}</td>
                                <td>${x.added_by}</td>
                            </tr>`;

                    accoutTitle(x.transaction_no,x.date_transaction);
                    Debits(x.transaction_no,x.date_transaction);
                    Credits(x.transaction_no,x.date_transaction);
                });
                data_table("#table_postedJournal","#tbody_postedJournal",str);
            } else {
                data_table("#table_postedJournal","#tbody_postedJournal","");
            }
        }
    });
}

function accoutTitle(transactionNo,date) {
    $.ajax({
        url: "assets/php/posted_journal.php",
        method: "POST",
        data: { code_: transactionNo,
                date_: date,
                formula: "journal_account_title_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border">' + x.account_title + '</div>';
                });
                $("#journalEntryContainer-" + transactionNo).html(str);
                $("#ModaljournalEntryContainer-" + transactionNo).html(str);
                
            }
        }
    });
}

function Debits(transactionNo,date) {
    $.ajax({
        url: "assets/php/posted_journal.php",
        method: "POST",
        data: { code_: transactionNo,
                date_: date,
                formula: "journal_debit_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + x.debit + '</div>';
                });
                $("#debit_container-" + transactionNo).html(str);
                $("#Modaldebit_container-" + transactionNo).html(str);
            }
        }
    });
}

function Credits(transactionNo,date) {
    $.ajax({
        url: "assets/php/posted_journal.php",
        method: "POST",
        data: { code_: transactionNo,
                date_: date,
                formula: "journal_credit_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + x.credit + '</div>';
                });
                $("#credit_container-" + transactionNo).html(str);
                $("#Modalcredit_container-" + transactionNo).html(str);
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

function select_account_title() {
	$.ajax({
        url:"assets/php/posted_journal.php",
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
    $('#journal_trans_no').val('');
    $('#journal_memo').val('');
    $('#journal_location').val('');
    $('#journal_id').val('');
    $('#journal_date').val('');
    $('#tbody_adjust_journal').empty();
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

function formatNumber(number) {
    return parseFloat(number).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//data-tables
function data_tablex(table_name, tbody_name, data_tbody) {
    $(table_name).DataTable().destroy();
    $(tbody_name).empty().html(data_tbody);
    $(table_name).DataTable({
        dom: 'rt', // Removing paging and other controls
        "pageLength": 100,
        "lengthChange": false,
        "autoWidth": false,
        "ordering": false // Disabling sorting
    });
};

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