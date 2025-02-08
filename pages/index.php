<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>E-HR</title>
  <link rel="icon" href="../dist/img/logo.png" type="image/x-icon" />
  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../plugins/fontawesome-free/css/all.min.css">
  <!-- SweetAlert2 -->
  <link rel="stylesheet" href="../plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
  <!-- Select2 -->
  <link rel="stylesheet" href="../plugins/select2/css/select2.min.css">
  <link rel="stylesheet" href="../plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/adminlte.min.css">
  <!-- overlayScrollbars -->
  <link rel="stylesheet" href="../plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="../plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="../plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="../plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
  <!-- chart -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.0"></script>
</head>

<script type="text/javascript">
  if(typeof(EventSource) !== "undefined") 
  {
    const sessionChecker = new EventSource("../pages/assets/sse/session-checker.php");
    sessionChecker.onmessage = function(event) 
    {
      if(event.data === "expired")
      {
        Swal.fire({
          icon: 'warning',
          title: 'OOPS!! SESSION EXPIRED',
          }).then((result) => {
          window.location.href = "../../set/index.php";
        })
      }
      console.log("SESSION", event.data);
    };
  } 
  else 
  {
      console.log("Sorry! No server-sent events support..")
  }
</script>

<style>
  .page-item.active .page-link {
    z-index: 3;
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
  }

</style>

<body class="hold-transition layout-fixed light-mode" data-panel-auto-height-mode="height">
<div class="wrapper">

  <!-- Navbar -->
  <nav class="main-header navbar navbar-expand navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <div class="font-italic"><?=$_SESSION['username']?></div>
      
    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Navbar Search -->
      <li class="nav-item">
        <a class="nav-link" data-widget="fullscreen" href="#" role="button" data-toggle="tooltip" data-placement="left" title="FULL SCREEN">
          <i class="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" href="#"  id="logout" data-toggle="tooltip" data-placement="left" title="LOGOUT">
          <i class="fas fa-power-off"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-dark-warning elevation-4">
    <div class="bg-light">
      <a href="#" class="brand-link">
        <img src="../dist/img/logo.png" alt="AdminLTE Logo" class="brand-image" >
        <span class="brand-text font-weight-bold ">title here</span>
      </a>
    </div>
    

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="../dist/img/avatar2.png" class="img-circle" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block font-italic"><?=$_SESSION['username']?></a>
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
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Dashboard
                <i class=""></i>
                <span class="badge badge-info right"></span>
              </p>
            </a>
          </li>

       

          <!-- /.Accounting management -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <p>
                  Accounting Management
                  <i class="fas fa-angle-left right"></i>
                  <span class="badge badge-info right"></span>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item ml-2">
                  <a href="###" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Dashboard</p>
                  </a>
              </li>
              <!-- journal entry -->
              <li class="nav-item ml-2">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-copy"></i>
                  <p>
                    Journal Entry
                    <i class="fas fa-angle-left right"></i>
                    <span class="badge badge-info right"></span>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item ml-2">
                    <a href="journal_entry.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Manual Journal</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="auto_journal.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Automatic Journal</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="posted_journal.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Posted Journal</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="general_ledger.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>General Ledger</p>
                    </a>
                  </li>
                
                </ul>
              </li>
              <!-- /.char of account -->
              <li class="nav-item ml-2">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-copy"></i>
                  <p>
                    Chart of account
                    <i class="fas fa-angle-left right"></i>
                    <span class="badge badge-info right"></span>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item ml-2">
                    <a href="toa.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Type of account</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="category.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Category</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="subcategory.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Subcategory</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="main_account.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Main account</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="listcoa.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>List COA</p>
                    </a>
                  </li>
                </ul>
              </li>
              <!-- financials -->
              <li class="nav-item ml-2">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-copy"></i>
                  <p>
                    Financials
                    <i class="fas fa-angle-left right"></i>
                    <span class="badge badge-info right"></span>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Trial Balance</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Balance Sheet</p>
                    </a>
                  </li>
                  <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Profit & Loss</p>
                    </a>
                  </li>
                </ul>
              </li>
              <!-- Automatic Journal Utility -->
              <li class="nav-item ml-2">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-copy"></i>
                  <p style="font-size: 14px;">
                    Automatic Journal Utility
                    <i class="fas fa-angle-left right"></i>
                    <span class="badge badge-info right"></span>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item ml-2">
                    <a href="#" class="nav-link">
                      <i class="nav-icon fas fa-copy"></i>
                      <p style="font-size: 15px;">
                        DSR
                        <i class="fas fa-angle-left right mr-2"></i>
                        <span class="badge badge-info right"></span>
                      </p>
                    </a>
                    <ul class="nav nav-treeview">
                      <li class="nav-item ml-4">
                        <a href="products_utility.php" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Product</p>
                        </a>
                      </li>
                      <li class="nav-item ml-4">
                        <a href="discount_utility.php" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Discount</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                 
                  <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>DIMR</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>

          <!-- /.Product Services -->
          <li class="nav-item">
              <a href="#" class="nav-link">
                <p>
                  Purchase & Services
                  <i class="fas fa-angle-left right"></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Purchase Price List</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Purchase Quotation</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Purchase Order</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Purchase Invoice</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Purchase Return</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Service Quotation</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Service Order</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Service Invoice</p>
                    </a>
                </li>

                <!-- purchase utility -->
                <li class="nav-item ml-2">
                  <a href="#" class="nav-link">
                    <i class="nav-icon fas fa-copy"></i>
                    <p>
                      Utility
                      <i class="fas fa-angle-left right"></i>
                      <span class="badge badge-info right"></span>
                    </p>
                  </a>
                  <ul class="nav nav-treeview">
                    <li class="nav-item ml-2">
                      <a href="####" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Product Category</p>
                      </a>
                    </li>
                    <li class="nav-item ml-2">
                      <a href="####" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Product Creation</p>
                      </a>
                    </li>
                    <li class="nav-item ml-2">
                      <a href="####" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Brands</p>
                      </a>
                    </li>
                    <li class="nav-item ml-2">
                      <a href="####" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Units</p>
                      </a>
                    </li>
                    <li class="nav-item ml-2">
                      <a href="####" class="nav-link">
                          <i class="far fa-circle nav-icon"></i>
                          <p>Taxes</p>
                      </a>
                    </li>
                  
                  </ul>
                </li>

              
              </ul>
          </li>

          <!-- /Sales -->
          <li class="nav-item">
              <a href="#" class="nav-link">
                <p>
                  Sales
                  <i class="fas fa-angle-left right"></i>
                  <span class="badge badge-info right"></span>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Sales Quotation</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Sales Order</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Sales Invoice</p>
                    </a>
                </li>
                <li class="nav-item ml-2">
                    <a href="####" class="nav-link">
                        <i class="far fa-circle nav-icon"></i>
                        <p>Sales Return</p>
                    </a>
                </li>
              </ul>
          </li>

          <!-- /.Inventory -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <p>
                Inventory
                <i class=""></i>
                <span class="badge badge-info right"></span>
              </p>
            </a>
          </li>

          <!-- /.Budgets -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <p>
                Budget
                <i class=""></i>
                <span class="badge badge-info right"></span>
              </p>
            </a>
          </li>

           <!-- /.Payroll -->
           <li class="nav-item">
            <a href="#" class="nav-link">
              <p>
                Payroll
                <i class=""></i>
                <span class="badge badge-info right"></span>
              </p>
            </a>
          </li>

          <!-- /.Settings -->
          <li class="nav-item">
            <a href="#" class="nav-link">
              <p>
                Settings
                <i class="fas fa-angle-left right"></i>
                <span class="badge badge-info right"></span>
              </p>
            </a>
            <ul class="nav nav-treeview">
              <!-- /Company heirarchy -->
              <li class="nav-item ml-2">
                <a href="#" class="nav-link">
                  <i class="nav-icon fas fa-copy"></i>
                  <p>
                    Company heirarchy
                    <i class="fas fa-angle-left right"></i>
                    <span class="badge badge-info right"></span>
                  </p>
                </a>
                <ul class="nav nav-treeview">
                  <li class="nav-item ml-4">
                    <a href="ch_company.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Company</p>
                    </a>
                  </li>
                  <li class="nav-item ml-4">
                    <a href="ch_division.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Division</p>
                    </a>
                  </li>
                  <li class="nav-item ml-4">
                    <a href="ch_category.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Category</p>
                    </a>
                  </li>
                  <li class="nav-item ml-4">
                    <a href="ch_department.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>Department</p>
                    </a>
                  </li>
                  <li class="nav-item ml-4">
                    <a href="ch_all.php" class="nav-link">
                      <i class="far fa-circle nav-icon"></i>
                      <p>List of all company</p>
                    </a>
                  </li>
                </ul>
              </li>
              
              <li class="nav-item ml-2">
                <a href="pages/layout/top-nav.html" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>User Creation</p>
                </a>
              </li>
              <li class="nav-item ml-2">
                <a href="create_book.php" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Create Book</p>
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

<!-- jQuery -->
<script src="../plugins/jquery/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../plugins/jquery-ui/jquery-ui.min.js"></script>
<!-- Bootstrap 4 -->
<script src="../plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
<!-- SweetAlert2 -->
<script src="../plugins/sweetalert2/sweetalert2.min.js"></script>
<!-- overlayScrollbars -->
<script src="../plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
<!-- Select2 -->
<script src="../plugins/select2/js/select2.full.min.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.js"></script>
<!-- <script src="assets/ajax/index.js"></script> -->

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
  $(document).ready(function(){
     $('[data-toggle="tooltip"]').tooltip();   
  });
  $(document).on("click","#logout", function(e){
	e.preventDefault();

	$('#modal_logout').modal('show');
})
</script>


<!-- modal -->
<div id="modal_logout" class="modal fade" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style=" overflow-y: scroll;">	
  <div class="modal-dialog modal-md">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" style="font-size: 20px;">Are you sure?.</h5>
        <button type="button" id="" class="close close_modal" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="text-center">	
          <a href="../set/out.php">
            <button class="btn btn-dark">Proceed</button>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

</body>
</html>
