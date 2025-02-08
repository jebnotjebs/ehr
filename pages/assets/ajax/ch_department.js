$(document).ready(function(){
	Company();
    Division();
	Category();
    Deparment();
})
//form save
$(document).on('submit','#form_save',function(e){
	e.preventDefault();

	Swal.fire({
		title: 'Are you sure?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#343a40',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes!'
	  }).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				url:"assets/php/ch_department.php",
				method: "POST",
			
				data:{
					company_:$('#slct_company').val(),
                    division_:$('#slct_division').val(),
					category_:$('#slct_category').val(),
                    department_:$('#department_name').val(),
					formula:"save_deparment_"
				},
				
				beforeSend: () => {
					$('.loading_').removeClass('d-none');
				},
				success: function(res) {
		 			 $('.loading_').addClass('d-none');
					
					switch (res) {
						case "success":
							Toast.fire({
										icon: 'success',
										title: 'COMPANY ADDED SUCCESSFULLY!'
									});
							$('#form_save')[0].reset();	
							Deparment();
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
		}
	  })

})


function Deparment() {
	$.ajax({
        url:"assets/php/ch_department.php",
        method:"POST",
        data:{
            formula:"department_"
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
                            <td>${x.company_code}</td>
                            <td>${x.company_desc}</td>
                            <td>${x.division_code}</td>
                            <td>${x.division_desc}</td>
							<td>${x.category_code}</td>
							<td>${x.category_desc}</td>
                            <td>${x.department_code}</td>
                            <td>${x.department_desc}</td>
                            <td>${x.dt_added}</td>
                        </tr>`;
                })
            }
            data_tablex("#table_department","#tbody_department",str);
        }
    })
}

function Company() {
	$.ajax({
        url:"assets/php/ch_department.php",
        method:"POST",
        data:{
            formula:"company_"
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

                    str += `<option value ='${x.company_code}'>${x.company_desc}</option>`;
                })
            }
            $("#slct_company").html(createOption('Select company', str));
        }
    })
}

function Division() {
	$.ajax({
        url:"assets/php/ch_department.php",
        method:"POST",
        data:{
            formula:"division_"
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

                    str += `<option value ='${x.division_code}'>${x.division_desc}</option>`;
                })
            }
            $("#slct_division").html(createOption('Select division', str));
        }
    })
}

function Category() {
	$.ajax({
        url:"assets/php/ch_department.php",
        method:"POST",
        data:{
            formula:"category_"
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

                    str += `<option value ='${x.category_code}'>${x.category_desc}</option>`;
                })
            }
            $("#slct_category").html(createOption('Select category', str));
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


//data-tables
function data_tablex(table_name,tbody_name,data_tbody) {
    $(table_name).DataTable().destroy();
    $(tbody_name).empty().html(data_tbody);
    $(table_name).DataTable(
    	{ dom: 'Bfrtip',
    		"pageLength": 50,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["excel", "pdf", "print", "colvis"]
	    }
	);
};