$(document).ready(function(){
    $('.overlay').hide();
    // data_table("#table_autoJournal","#tbody_autoJournal","")
 
})

$(document).on('click','#btn_load',function(e){
	e.preventDefault();
    General_table();
})

function General_table() {
    $.ajax({
        url: "assets/php/general_ledger.php",
        method: "POST",
        data: { 
            date_from_: $('#date_from').val(),
            date_to_: $('#date_to').val(),
            formula: "general_" 
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
                    str += `
                        <tr class="border border-default" style="text-transform:uppercase">
                            <td colspan="2" class="text-left font-weight-bold font-italic">${x.account_title}</td>
                            <td colspan="4"></td> 
                        </tr>
                        <tr class="border border-default" style="text-transform:uppercase">
                            <td><div id="general_date-${x.mainaccount_no}"></div></td>
                            <td><div id="general_memo-${x.mainaccount_no}"></div></td>
                            <td><div id="transaction_debit-${x.mainaccount_no}"></div></td>
                            <td><div id="transaction_credit-${x.mainaccount_no}"></div></td>
                            <td><div id="balance_debit-${x.mainaccount_no}"></div></td>
                            <td><div id="balance_credit-${x.mainaccount_no}"></div></td>
                        </tr>`;
                    gl_date(x.mainaccount_no);
                    gl_memo(x.mainaccount_no);
                    trans_Debits(x.mainaccount_no);
                    trans_Credits(x.mainaccount_no);
                    blnce_Debits(x.mainaccount_no);
                    blnce_Credits(x.mainaccount_no);
                });
               
                $('#tbody_autoJournal').empty().html(str);
            } else {
                $('#tbody_autoJournal').empty().html("");
            }
        }
    });
}


function gl_date(mainaccount_no) {
    $.ajax({
        url: "assets/php/general_ledger.php",
        method: "POST",
        data: { code_: mainaccount_no,
                date_from_: $('#date_from').val(),
                date_to_: $('#date_to').val(),
                formula: "general_date_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border">' + x.date_transaction + '</div>';
                });
                $("#general_date-" + mainaccount_no).html(str);
            }
        }
    });
}

function gl_memo(mainaccount_no) {
    $.ajax({
        url: "assets/php/general_ledger.php",
        method: "POST",
        data: { code_: mainaccount_no,
                date_from_: $('#date_from').val(),
                date_to_: $('#date_to').val(),
                formula: "general_accountTitle_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border">' + x.memo + '</div>';
                });
                $("#general_memo-" + mainaccount_no).html(str);
            }
        }
    });
}


function trans_Debits(mainaccount_no) {
    $.ajax({
        url: "assets/php/general_ledger.php",
        method: "POST",
        data: { code_: mainaccount_no,
                date_from_: $('#date_from').val(),
                date_to_: $('#date_to').val(),
                formula: "trans_Debits_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + ((x.debit === '0.00') ? '-' : x.debit) + '</div>';
                });
                $("#transaction_debit-" + mainaccount_no).html(str);
            }
        }
    });
}

function trans_Credits(mainaccount_no) {
    $.ajax({
        url: "assets/php/general_ledger.php",
        method: "POST",
        data: { code_: mainaccount_no,
                date_from_: $('#date_from').val(),
                date_to_: $('#date_to').val(),
                formula: "general_credit_" },
        dataType: "json",
        success: function(res) {
            var str = "";
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    str += '<div class="col-12 border text-right">' + ((x.credit === '0.00') ? '-' : x.credit) + '</div>';
                });
                $("#transaction_credit-" + mainaccount_no).html(str);
            }
        }
    });
}

function blnce_Debits(mainaccount_no) {
    $.ajax({
        url: "assets/php/general_ledger.php",
        method: "POST",
        data: { code_: mainaccount_no,
                date_from_: $('#date_from').val(),
                date_to_: $('#date_to').val(),
                formula: "balance_debit_" },
        dataType: "json",
        success: function(res) {
            var str = "", d_total = 0;
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    var debitValue = Number(x.debit.replace(/,/g, ""));
                    var creditValue = Number(x.credit.replace(/,/g, ""));
                    if (!isNaN(debitValue)) {
                        if (debitValue === 0) {
                            d_total -= creditValue; 
                        } else {
                            d_total += debitValue;
                        }
                        var formattedTotal = d_total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}); 
                        str += `<div class="col-12 border text-right">${formattedTotal}</div>`;
                    }
                });
                $("#balance_debit-" + mainaccount_no).html(str);
            }
        }
    });
}

function blnce_Credits(mainaccount_no) {
    $.ajax({
        url: "assets/php/general_ledger.php",
        method: "POST",
        data: { code_: mainaccount_no,
                date_from_: $('#date_from').val(),
                date_to_: $('#date_to').val(),
                formula: "balance_credit_" },
        dataType: "json",
        success: function(res) {
            var str = "", c_total = 0;
            if (!$.isEmptyObject(res)) {
                res.forEach(function(x) {
                    var debitValue = Number(x.debit.replace(/,/g, ""));
                    var creditValue = Number(x.credit.replace(/,/g, ""));
                    if (!isNaN(creditValue)) {
                        if (creditValue === 0) {
                            c_total -= debitValue; 
                        } else {
                            c_total += creditValue;
                        }
                        var formattedTotal = c_total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}); 
                        str += `<div class="col-12 border text-right">${formattedTotal}</div>`;
                    }
                });
                $("#balance_credit-" + mainaccount_no).html(str);
            }
        }
    });
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
    $(tbody_name).empty().html(data_tbody);
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