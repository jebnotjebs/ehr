$(document).ready(function(){
	discount_table();
    account_title();
})

//account title
$(document).on('change','#acct_title',function(e){
	e.preventDefault();

    $.ajax({
        url:"assets/php/discount_utility.php",
        method: "POST",
        data:{
            id_:$(this).data('value-id'),
            value_:$('#acct_title_list [value="' + $(this).val() + '"]').data('account_no'),
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
                    discount_table();
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

function discount_table() {
	$.ajax({
        url:"assets/php/discount_utility.php",
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
                            <td>${x.type}</td>
							<td><div class="form-group">
                                    <input type="select" id="acct_title" data-value-id="${x.code}" data-value-code="${x.code}" value="${(x.je_account_no == null ? "" : x.account_title)}" class="form-control" list="acct_title_list">
                                    <datalist id="acct_title_list"></datalist>
                                </div>
                            </td>
                        </tr>`;
                })
            }
            data_tablex("#table_discount","#tbody_discount",str);
        }
    })
}

function account_title() {
	$.ajax({
        url:"assets/php/discount_utility.php",
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
            $("#acct_title_list").html(createOption('', str));
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