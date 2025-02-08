<html lang="en">
<head>
  <title>EHR</title>
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <link rel="icon" href="../dist/img/logo_gb.png" type="image/x-icon" />
  <meta charset="utf-8">
  
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../plugins/fontawesome-free/css/all.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/adminlte.min.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- jquery -->
  <script src="../plugins/jquery/jquery.min.js"></script>
  <!-- jQuery UI 1.11.4 -->
  <script src="../plugins/jquery-ui/jquery-ui.min.js"></script>
  <!-- Bootstrap 4 -->
  <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
 </head>

 <style>
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    /* Styles for large screens */
    @media (min-width: 1024px) {
        .container {
            width: 80%;
            max-width: 1200px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .logo {
            flex: 1;
            text-align: center;
        }
        .logo img {
            max-width: 100%;
            height: auto;
            max-height: 100vh;
        }
        .login-card-container {
            flex: 1;
            display: flex;
            justify-content: flex-end;
        }
        .login-card {
            height: 400px;
            width: 400px;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .login-card h2 {
            margin-top: 0;
            text-align: center;
        }
        .login-card form {
            display: flex;
            flex-direction: column;
        }
        .login-card label {
            margin-bottom: 5px;
        }
        .login-card input[type="text"],
        .login-card input[type="password"] {
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .login-card input[type="submit"] {
            padding: 10px;
            border: none;
            background-color: #2e343a;
            color: #fff;
            cursor: pointer;
            border-radius: 5px;
        }
        .login-card input[type="submit"]:hover {
            background-color:rgb(79, 77, 80);
        }
        .login-card i {
            font-size: 3em;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    /* Styles for small screens */
    @media (max-width: 1023px) {
        .container {
            width: 100%;
            padding: 0 20px;
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 100%;
            height: auto;
            max-height: 100px;
        }
        .login-card-container {
            justify-content: center;
        }
        .login-card {
            /* width: 100%; */
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .login-card h2 {
            margin-top: 0;
            text-align: center;
        }
        .login-card form {
            display: flex;
            flex-direction: column;
        }
        .login-card label {
            margin-bottom: 5px;
        }
        .login-card input[type="text"],
        .login-card input[type="password"] {
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .login-card input[type="submit"] {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #2e343a;
            color: #fff;
            cursor: pointer;
            border-radius: 5px;
        }
        .login-card input[type="submit"]:hover {
            background-color: #rgb(79, 77, 80);
        }
        .login-card i {
            font-size: 2em;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    @keyframes shake {
        0% { transform: translate(1px, 1px) rotate(0deg); }
        10% { transform: translate(-1px, -2px) rotate(-1deg); }
        20% { transform: translate(-3px, 0px) rotate(1deg); }
        30% { transform: translate(3px, 2px) rotate(0deg); }
        40% { transform: translate(1px, -1px) rotate(1deg); }
        50% { transform: translate(-1px, 2px) rotate(-1deg); }
        60% { transform: translate(-3px, 1px) rotate(0deg); }
        70% { transform: translate(3px, 1px) rotate(-1deg); }
        80% { transform: translate(-1px, -1px) rotate(1deg); }
        90% { transform: translate(1px, 2px) rotate(0deg); }
        100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    .login-card.shake {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }
</style>

<body class="hold-transition login-page">
  <div class="container">
      <div class="logo">
          <img src="../dist/img/logo.png" alt="Your Logo">
      </div>
      <div class="login-card-container">
          <div class="login-card">
              <i class="fas fa-lg fa-user-lock"></i>
              <form id="form_login">
                  <label for="">Username</label>
                  <input type="text" id="username" placeholder="Username" required>
                  <label for="">Password</label>
                  <input type="password" id="pass_" placeholder="Password" required>
                  <input type="submit" value="Login">
                  <span id="login-error" style="display: none;"></span>
              </form>
              <!-- <p>Forgot passwossrd? <a href="#">Click here</a></p> -->
          </div>
      </div>
  </div>
</body>
</html>
<script src="js/index.js"></script>

