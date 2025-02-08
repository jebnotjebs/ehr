<?php
	session_start();
	if(isset($_SESSION["employee_id"]))
	{

	}
	else
	{
		header("location:../index.php");
	}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Cash Management System</title>
  <link rel="icon" href="../dist/img/8k.png" type="image/x-icon" />

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../plugins/fontawesome-free/css/all.min.css">
  <!-- SweetAlert2 -->
  <link rel="stylesheet" href="../plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="../plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- Select2 -->
  <link rel="stylesheet" href="../plugins/select2/css/select2.min.css">
  <link rel="stylesheet" href="../plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="../plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="../plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="../plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
</head>

<style>
  .page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }
</style>

<body class="hold-transition sidebar-mini layout-fixed light-mode" data-panel-auto-height-mode="height">
  <div class="wrapper">

    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
      </ul>

      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <!-- Navbar Search -->
        <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button" data-toggle="tooltip" data-placement="left" title="FULL SCREEN">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#" id="logout" data-toggle="tooltip" data-placement="left" title="LOGOUT">
            <i class="fas fa-power-off"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-warning elevation-4">
      <!-- Brand Logo -->
      <a href="#" class="brand-link">
        <img src="../dist/img/8k.png" alt="AdminLTE Logo" class="brand-image img-circle" style="margin-right:1px;">
        <span class="brand-text font-weight-bold">ash Management</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="user w-100">
						<div class="avatar-sm float-left mr-2">
							<img src="http://app.mrsg.ph/application/system/profile_/assets/img/e-image/<?=$_SESSION['employee_id']?>.png" alt="..." class="avatar-img rounded-circle">
						</div>
						<div class="info w-100">
							<a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
								<span>
									<span class="user-level" style="margin-left: 0px; font-size: 10px; margin-top: 10px;">
										<?=isset($_SESSION['user_dept']) ? strtoupper($_SESSION['dept_code']) : 'ADMINISTRATOR'?>
									</span>
									<span class="font-weight-bold" style="color: black; margin-left: -50px; font-size: 10px; margin-top: 20px;">
										<?=strtoupper($_SESSION['name'])?>
									</span>
									
									<span class="caret"></span>
								</span>
							</a>
							<div class="clearfix"></div>
						</div>
					</div>
        </div>

        <!-- SidebarSearch Form -->
        <div class="form-inline">
          <div class="input-group" data-widget="sidebar-search">
            <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
              <button class="btn btn-sidebar">
                <i class="fas fa-search fa-fw"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            <li class="nav-item">
              <a href="index.php" class="nav-link">
                <i class="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboard
                  <i class=""></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="storeDeposit.php" class="nav-link">
                <i class="nav-icon fas fa-store"></i>
                <p>
                  Store Deposit
                  <i class=""></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="cashin.php" class="nav-link">
                <i class="nav-icon fas fa-wallet"></i>
                <p>
                  Money In
                  <i class=""></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="cashout.php" class="nav-link">
                <i class="nav-icon fas fa-money-bill-wave"></i>
                <p>
                  Money Out
                  <i class=""></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
            </li>
            <li class="nav-item">
              <a href="bankreconciliation.php" class="nav-link">
                <i class="nav-icon fas fa-handshake"></i>
                <p>
                  Bank Reconciliation
                  <i class=""></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
            </li>
         <!--   <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-exchange-alt"></i>
                <p>
                  Fund Transfer
                  <i class=""></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
            </li>-->
        

            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fas fa-cogs"></i>
                <p>
                  Bank Settings
                  <i class="fas fa-angle-left right"></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item ml-2">
                  <a href="newbank.php" class="nav-link">
                    <i class="fas fa-caret-right nav-icon"></i>
                    <p>New Bank</p>
                  </a>
                </li>
                <li class="nav-item ml-2">
                  <a href="assigncheque.php" class="nav-link">
                    <i class="fas fa-caret-right nav-icon"></i>
                    <p>Cheque Registration</p>
                  </a>
                </li>
                <li class="nav-item ml-2">
                  <a href="depbranch.php" class="nav-link">
                    <i class="fas fa-caret-right nav-icon"></i>
                    <p>Depository Bank</p>
                  </a>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>
    <!-- Content Wrapper. Contains page content -->
    <!-- /.content-wrapper -->
  </div>
  <!-- ./wrapper -->

  <!-- jQuery -->
  <script src="../plugins/jquery/jquery.min.js"></script>
  <!-- jQuery UI 1.11.4 -->
  <script src="../plugins/jquery-ui/jquery-ui.min.js"></script>
  <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
  <!-- Bootstrap 4 -->
  <script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- SweetAlert2 -->
  <script src="../plugins/sweetalert2/sweetalert2.min.js"></script>
  <!-- overlayScrollbars -->
  <script src="../plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
  <!-- Select2 -->
	<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
  <!-- AdminLTE App -->
  <script src="../dist/js/adminlte.js"></script>


  <!-- DataTables  & Plugins -->
  <script src="../plugins/datatables/jquery.dataTables.min.js"></script>
  <script src="../plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
  <script src="../plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
  <script src="../plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
  <script src="../plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
  <script src="../plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
  <script src="../plugins/jszip/jszip.min.js"></script>
  <script src="../plugins/pdfmake/pdfmake.min.js"></script>
  <script src="../plugins/pdfmake/vfs_fonts.js"></script>
  <script src="../plugins/datatables-buttons/js/buttons.html5.min.js"></script>
  <script src="../plugins/datatables-buttons/js/buttons.print.min.js"></script>
  <script src="../plugins/datatables-buttons/js/buttons.colVis.min.js"></script>

  <script>
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
    $(document).on("click", "#logout", function(e) {
      e.preventDefault();

      $('#modal_logout').modal('show');
    })
  </script>



  <!-- modal -->
  <div id="modal_logout" class="modal fade" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style=" overflow-y: scroll;">
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" style="font-size: 20px;">You are trying to leave.</h5>
          <button type="button" id="" class="close close_modal" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <div class="text-center">
            <a href="../set/out.php">
              <button class="btn btn-warning">Proceed</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer" style=" position: fixed; bottom: 0; right: 0;background-color: #f8f9fa; padding: 10px;">
					<div class="container">
					<div class="copyright">
						Designed and Developed by <i class="fa fa-heart heart text-danger"></i> <a href="#">OnlySolutions</a><span data-toggle="tooltip" data-placement="top" title="09162829611 on WhatsApp" id="whatsapp"> | Chester</span>
					</div>       
					</div>
				</footer>
</body>

</html>