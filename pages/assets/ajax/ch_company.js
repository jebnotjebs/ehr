$(document).ready(function(){
	Company();
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
				url:"assets/php/ch_company.php",
				method: "POST",
			
				data:{
					company_:$('#company_name').val(),
					formula:"save_company_"
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
							Company();
		
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

//chagne status
$(document).on('click','.change_status',function(e){
	e.preventDefault();

	let a = (e.target.id == 'ACTIVE' ? 'INACTIVE' : 'ACTIVE');
	Swal.fire({
		title: 'Set status to ' + a + '?',
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#343a40',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes!'
	  }).then((result) => {
		if (result.isConfirmed) {
			$.ajax({
				url:"assets/php/ch_company.php",
				method: "POST",
			
				data:{
					id_:e.target.dataset.id_,
					status_:a,
	
					formula:"status_"
				},
				
				beforeSend: () => {
		
				},
				success: function(res) {
		
					console.log(res);
					switch (res) {
						case "success":
							Toast.fire({
										icon: 'success',
										title: 'STATUS SET TO ' + a
									});
							Company();
		
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



function Company() {
	$.ajax({
        url:"assets/php/ch_company.php",
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

                str += `<tr class="border border-default" style="text-transform:uppercase">
                            <td>${x.company_code}</td>
                            <td>${x.company_desc}</td>
                            <td>${x.dt_added}</td>
                        </tr>`;
                })
            }
            data_tablex("#table_company","#tbody_company",str);
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
    		"pageLength": 5,
            "lengthChange": false,
            "autoWidth": false,
            "buttons": ["excel", "pdf", "print", "colvis"]
	    }
	);
};