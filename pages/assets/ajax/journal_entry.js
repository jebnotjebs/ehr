$(document).ready(function(){
    addNewRow();
    addNewRow();
    account_title();
    branches();
    Journal_table();
    data_table("#table_journalentry","#tbody_journalentry","");
    $('#current-date').text(new Date().toLocaleDateString());
})

var table_number = 1;


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


// Update totals whenever a value changes
$('#tbody_journal').on('input', 'input[type="number"]', function() {
    calculateAndAppendTotals();
});

//tab
$('#tbody_journal').on('keydown', 'tr:nth-last-child(2) td:last-child button', function handleTab(e) {
    // Check if the pressed key is "Tab"
    if (e.keyCode === 9) {
        // Prevent the default tab behavior
        e.preventDefault();
      
        // Add a new row to the table
        addNewRow();
    }
});

function saveJournalData() {
    if($('#memo_data').val() == '' || null){
        Toast.fire({
            icon: 'error',
            title: 'MEMO IS EMPTY!, please insert memo before saving journal'
        });
    }
    else{
        var journalData = [];
        // Iterate over each row in the table
        $("#tbody_journal tr:not(:last)").each(function() {
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
                    id: $(this).find("#table_number_data").val(),
                    account_title: $('#account_title_list [value="' + $(this).find("#account_title_data").val() + '"]').data('atl'),
                    debit: $(this).find("#debit_data").val(),
                    credit: $(this).find("#credit_data").val()
                };
                journalData.push(rowData); // Add the row data to the array
            }
        });
    
        // Send the data to the server
        $.ajax({
            url: "assets/php/journal_entry.php",
            method: "POST",
            data: { 
                date_trans_:$("#date_trans").val(),
                branch_data_:$("#branch_data").val(),
                memo_: $('#memo_data').val(),
                journalData: JSON.stringify(journalData),
                formula: "save_journal_"
                
            }, // Send data as JSON string
           
            beforeSend: function() {
                $('.overlay').show();
            },
            success: function(res) {
               
                switch (res) {
                    case "success":
                        Toast.fire({
                            icon: 'success',
                            title: 'JOURNAL ENTRY ADDED SUCCESSFULLY!'
                        });
                        Journal_table();
                        resetValue();
                        $(this).closest('tr').remove();
                        $('.overlay').hide();
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
}

function addNewRow() {
    var newRow = `
        <tr class="border border-default" style="text-transform:uppercase">
            <td id="table_number_data">${table_number}</td>
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
    $('#tbody_journal').append(newRow);
    table_number += 1;
    $('.trash-button').last().click(function() {
        var row = $(this).closest('tr');
        row.find('#debit_data, #credit_data').val('0');
        row.find('input').not('#debit_data, #credit_data').val('');
        calculateAndAppendTotals();
    });
    // Calculate totals and append a new row
    calculateAndAppendTotals();
}

function calculateAndAppendTotals() {
    var debitTotal = 0;
    var creditTotal = 0;

    // Iterate through each row in the table body
    $('#tbody_journal tr').each(function() {
        var debit = parseFloat($(this).find('#debit_data').val()) || 0;
        var credit = parseFloat($(this).find('#credit_data').val()) || 0;

        // Add debit and credit values to the totals
        debitTotal += debit;
        creditTotal += credit;
    });

    // Append a new row with totals
    var totalRow = `
        <tr id="total_row">
            <td colspan="2">Total</td>
            <td>${formatNumber(debitTotal)}</td>
            <td>${formatNumber(creditTotal)}</td>
            <td colspan="3"></td>
        </tr>`;
    
    // Remove any existing total row before appending the new one
    $('#total_row').remove();
    //add value
    $('#total_debit').val(formatNumber(debitTotal));
    $('#total_credit').val(formatNumber(creditTotal));
    // Append the total row to the table body
    $('#tbody_journal').append(totalRow);
}

function branches() {
	$.ajax({
        url:"assets/php/journal_entry.php",
        method:"POST",
        data:{
            formula:"branches_"
        },
        dataType:"json",
        beforeSend:()=>{
           
        },
        success:function(res){
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                    str += `<option data-b="${x.code}" value ='${x.name}'>${x.name}</option>`;
                })
            }
			$("#branch_list").html(createOption(str));
        }
    })
}

function account_title() {
	$.ajax({
        url:"assets/php/journal_entry.php",
        method:"POST",
        data:{
            formula:"main_account_"
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

function Journal_table() {
    $.ajax({
        url: "assets/php/journal_entry.php",
        method: "POST",
        data: { formula: "journal_" },
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
                                <td>${x.date_transaction}</td>
                                <td>${x.transaction_no}</td>
                                <td><div id="journalEntryContainer-${x.transaction_no}"></div></td>
                                <td><div id="debit_container-${x.transaction_no}"></div></td>
                                <td><div id="credit_container-${x.transaction_no}"></div></td>
                                <td> ${x.memo}</td>
                                <td>${x.added_by}</td>
                                
                            </tr>`;
        

                    accoutTitle(x.transaction_no);
                    Debits(x.transaction_no);
                    Credits(x.transaction_no);
                });

                data_table("#table_journalentry","#tbody_journalentry",str);
            } else {
                // Handle case when no data is returned
            }
        }
    });
}

function accoutTitle(transactionNo) {
    $.ajax({
        url: "assets/php/journal_entry.php",
        method: "POST",
        data: { code_: transactionNo,
                 formula: "journal_desc_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border">' +  x.account_title + '</div>';

                });
                $("#journalEntryContainer-" + transactionNo).html(str);
            }
        }
    });
}

function Debits(transactionNo) {
    $.ajax({
        url: "assets/php/journal_entry.php",
        method: "POST",
        data: { code_: transactionNo, formula: "journal_debit_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + ((x.debit === '0.00' || x.debit === '0') ? '-' : x.debit) + '</div>';
                });
                $("#debit_container-" + transactionNo).html(str);
            }
        }
    });
}

function Credits(transactionNo) {
    $.ajax({
        url: "assets/php/journal_entry.php",
        method: "POST",
        data: { code_: transactionNo, formula: "journal_credit_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + ((x.credit === '0.00' || x.credit === '0') ? '-' : x.credit) + '</div>';
                });
                $("#credit_container-" + transactionNo).html(str);
            }
        }
    });
}

function resetValue(){
    $('#memo_data').val('');
    $('#branch_data').val('');
    table_number = 1;
    $('#tbody_journal').empty();
    addNewRow();
    addNewRow();
    branches();
    account_title();
}

function formatNumber(number) {
    return (Math.round(parseFloat(number) * 100) / 100).toLocaleString('en') ;
}

var Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 3000
  });

var select_d = [];


function createOptionAll(title, str){
	return "<option value ='' selected disabled>"+title+"</option> <option value ='All'>All</option>"+str;
}

function createOption(title, str) {
    return `<option value="" selected disabled>${title}</option>${str}`;
}
//data-tables
function data_tablex(table_name, tbody_name, data_tbody) {
    $(table_name).DataTable().destroy();
    $(tbody_name).empty().html(data_tbody);
    $(table_name).DataTable({
        dom: 'rt', // Removing paging and other controls
        "pageLength": 10,
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
    		"pageLength": 5,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["excel", "pdf", "print", "colvis"]
	    }
	);
};