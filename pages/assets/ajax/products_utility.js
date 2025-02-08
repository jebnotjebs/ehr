$(document).ready(function(){
	product_table();
    account_title();
})

//output
$(document).on('change','#account_output',function(e){
	e.preventDefault();

    $.ajax({
        url:"assets/php/products_utility.php",
        method: "POST",
        data:{
            id_:$(this).data('value-id'),
            value_:$('#account_output_list [value="' + $(this).val() + '"]').data('account_no'),
            x_:'je_output',
            formula:"update_"
        },
        beforeSend: () => {
        },
        success: function(res) {
            switch (res) {
                case "success":
                    Toast.fire({
                                icon: 'success',
                                title: 'update success'
                            });
                    product_table();
                    account_title();
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
    })
})

//vat
$(document).on('change','#account_vat',function(e){
	e.preventDefault();
    $.ajax({
        url:"assets/php/products_utility.php",
        method: "POST",
        data:{
            id_:$(this).data('value-id'),
            value_:$('#account_vat_list [value="' + $(this).val() + '"]').data('account_no'),
            x_:'je_vat',
            formula:"update_"
        },
        beforeSend: () => {
        },
        success: function(res) {
            switch (res) {
                case "success":
                    Toast.fire({
                                icon: 'success',
                                title: 'update success'
                            });
                    product_table();
                    account_title();
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
    })
})

//vat excempt
$(document).on('change','#account_vat_excempt',function(e){
	e.preventDefault();
    $.ajax({
        url:"assets/php/products_utility.php",
        method: "POST",
        data:{
            id_:$(this).data('value-id'),
            value_:$('#account_vatexcempt_list [value="' + $(this).val() + '"]').data('account_no'),
            x_:'je_vat_excempt',
            formula:"update_"
        },
        beforeSend: () => {
        },
        success: function(res) {
            switch (res) {
                case "success":
                    Toast.fire({
                                icon: 'success',
                                title: 'update success'
                            });
                    product_table();
                    account_title();
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
    })
})

function product_table() {
	$.ajax({
        url:"assets/php/products_utility.php",
        method:"POST",
        data:{
            formula:"products_"
        },
        dataType:"json",
        beforeSend:()=>{
            $('.overlay').show();
        },
        success:function(res){
			$('.overlay').hide();
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                str += `<tr class="border border-default" style="text-transform:uppercase">
                            <td>${x.code}</td>
                            <td>${x.description}</td>
							<td><div class="form-group">
                                    <input type="select" id="account_output" data-value-id="${x.code}" data-value-code="${x.code}" value="${(x.je_output == null ? "" : x.je_output)}" class="form-control" list="account_output_list">
                                    <datalist id="account_output_list"></datalist>
                                </div>
                            </td>
                            <td><div class="form-group">
                                    <input type="select" id="account_vat" data-value-id="${x.code}" value="${(x.je_vat == null ? "" : x.je_vat)}" class="form-control" list="account_vat_list">
                                    <datalist id="account_vat_list"></datalist>
                                </div>
                            </td>
                            <td><div class="form-group">
                                    <input type="select" id="account_vat_excempt" data-value-id="${x.code}" value="${(x.je_vat_excempt == null ? "" : x.je_vat_excempt)}" class="form-control" list="account_vatexcempt_list">
                                    <datalist id="account_vatexcempt_list"></datalist>
                                </div>
                            </td>
                        </tr>`;

                })
            }
            data_tablex("#table_product","#tbody_product",str);
           
        }
    })
}

function account_title() {
	$.ajax({
        url:"assets/php/products_utility.php",
        method:"POST",
        data:{
            formula:"account_title_"
        },
        dataType:"json",
        beforeSend:()=>{
            $('.overlay').show();
        },
        success:function(res){
			$('.overlay').hide();
            select_d = res;
            
            var str ="";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                    str += `<option  data-account_no="${x.mainaccount_no}" value ='${x.account_title}'>${x.account_title}</option>`;

                })
            }
            $("#account_output_list").html(createOption('', str));
            $("#account_vat_list").html(createOption('', str));
            $("#account_vatexcempt_list").html(createOption('', str));
        }
    })
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


//data-tables
function data_tablex(table_name,tbody_name,data_tbody) {
    $(table_name).DataTable().destroy();
    $(tbody_name).empty().html(data_tbody);
    $(table_name).DataTable(
    	{ dom: 'Bfrtip',
    		"pageLength": -1,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["excel", "pdf", "print", "colvis"]
	    }
	);
};