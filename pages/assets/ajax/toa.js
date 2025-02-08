$(document).ready(function(){
	toa_table();
})

//load
$(document).on('submit','#form_load',function(e){
	e.preventDefault();

	$.ajax({
        url:"assets/php/toa.php",
        method:"POST",
        data:{
			toa_:$('#select_toa').val(),
            formula:"load_"
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
                            <td>${x.account_no}</td>
                            <td>${x.toa}</td>
                            <td>${x.dt_added}</td>
							<td>${x.status} <i class="fas fa-pen-square change_status" id="${x.status}" data-id_="${x.id}" style="font-size: 17px;"></i></td>
                           
                        </tr>`;
                })
            }
            data_tablex("#table_toa","#tbody_toa",str);
        }
    })
})

//add
$(document).on('click','#btn_add',function(e){
	e.preventDefault();

	Swal.fire({
        title: 'Type of account:',
        input: 'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
		confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#343a40',
        cancelButtonColor: '#d33',
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
            return inputValue;
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            let userInput = result.value; 
            $.ajax({
                url: "assets/php/toa.php",
                method: "POST",
                data: {
                    toa_: userInput,
                    formula: "add_"
                },
                beforeSend: () => {
                    
                },
                success: function(res) {
                  
                    switch (res) {
                        case "success":
                            Toast.fire({
                                icon: 'success',
                                title: 'TYPE OF ACCESS ADDED SUCCESSFULLY!'
                            });
                            toa_table();
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
				url:"assets/php/toa.php",
				method: "POST",
			
				data:{
					id_:e.target.dataset.id_,
					status_:a,
	
					formula:"status_"
				},
				
				beforeSend: () => {
		
				},
				success: function(res) {
					switch (res) {
						case "success":
							Toast.fire({
										icon: 'success',
										title: 'STATUS SET TO ' + a
									});
							toa_table();
		
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

function toa_table() {
	$.ajax({
        url:"assets/php/toa.php",
        method:"POST",
        data:{
            formula:"toa_"
        },
        dataType:"json",
        beforeSend:()=>{
            $('.overlay').show();
        },
        success:function(res){
			$('.overlay').hide();
            select_d = res;
            
            var str ="",str2 = "";
            if (!$.isEmptyObject(select_d)) {
                select_d.forEach((x)=>{		

                str += `<tr class="border border-default" style="text-transform:uppercase">
                            <td>${x.account_no}</td>
                            <td>${x.toa}</td>
                            <td>${x.dt_added}</td>
							<td>${x.status} <i class="fas fa-pen-square change_status" id="${x.status}" data-id_="${x.id}" style="font-size: 17px;"></i></td>
                           
                        </tr>`;

				str2 += `<option value ='${x.account_no}'>${x.toa} - ${x.account_no}</option>`;
                })
            }
            data_tablex("#table_toa","#tbody_toa",str);
			$("#select_toa").html(createOptionAll('Select type of account', str2));
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