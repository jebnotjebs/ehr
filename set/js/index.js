$(document).ready(function(){
})

$(document).on("submit","#form_login", function(e){
    e.preventDefault();

    if($('#username').val() != '' && $('#pass_').val() != '')
    {
    $.ajax({
        url:"login.php",
        method:"POST",
        data:{
        username:$('#username').val(), 
        password:$('#pass_').val()
        },
        cache:false,
        beforeSend:function(){
        
        },
        success:function(data){ 
            if(data !== "empty"){
              
                window.location.href = "../pages/index.php";
            }
            else{
                $('#login-error').text('Credential not found!!').css('color', 'red').show();
                $('.login-card').addClass('shake'); 
                setTimeout(function() {
                    $('.login-card').removeClass('shake'); // Remove the shake 
                    $('#login-error').hide(); // Hide the error message
                }, 820);
            }
        }
    });
    }
    else
    {
    swal("Oops!", "Please fillup all fields", {
        buttons: {
        confirm: {
            className : 'btn btn-danger'
        }
        },
    });
    }
    
});


var select_d = [];



