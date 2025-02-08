<?php
  include 'index.php';
?>
<style>
    .swal2-label {
      display: block;
      margin-bottom: -10px; /* Adjust this value as needed */
    }
    .table-responsive {
      height: 600px; /* Adjust this value according to your needs */
      overflow-y: auto;
    }
    .table-responsive thead th {
      position: sticky !important;
      top: 0 !important;
      background-color: white;
      z-index: 1000 !important;
    }

</style>
<body class="hold-transition sidebar-mini layout-fixed dark-mode" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container-fluid">
            <div class="d-flex justify-content-between">
             <div class="">
                <button class="btn btn-secondary btn-md" onclick="window.location.href='toa.php'">Type of account</button>
                <button class="btn btn-dark btn-md" onclick="window.location.href='category.php'">Category</button>
                <button class="btn btn-secondary btn-md" onclick="window.location.href='subcategory.php'">Subcategory</button>
                <button class="btn btn-secondary btn-md" onclick="window.location.href='main_account.php'">Main account</button>
                <button class="btn btn-secondary btn-md" onclick="window.location.href='listcoa.php'">List of COA</button>
              </div>

              <div class="ml-md-auto">
                  <div class="">
                    <button class="btn btn-md btn-dark" id="btn_add">ADD</button>
                  </div>
              </div>
            </div>
        </div>
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="card card-default">
            <div class="card-header">
              <h3 class="card-title">Filter</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-card-widget="collapse">
                  <i class="fas fa-minus"></i>
                </button>
              </div>
            </div>
           
            <div class="card-body" style="display: block;">
              <div class="col">
                <form id="form_load">
                  <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-8">
                        <label class="font-weight-bolder">
                            CATEGORY 
                            <i class="loading_ d-none fas fa-spinner fa-spin"></i>
                        </label>
                        <select id="select_categoty" class="form-control"></select>
                    </div>
                    
                    <div class="col-lg-3 col-md-4 col-sm-4">
                      <label for="" style="opacity: 0;">###</label>
                      <div class="form-group">
                          <button type="submit" class="btn btn-md btn-dark">Load <i class="loading_ d-none fas fa-spinner fa-spin"></i></button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="card card-body">
            <div class="card-header">
              <label for="">ALL CATEGORY TABLE</label>
            </div>
              <br>
            <div class="chart-container">
              <div class="overlay-wrapper">
                  <div class="overlay">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                    <div class="text-bold pt-2">Loading...</div>
                  </div>
                  <div class="table-responsive">
                      <div class="scrollbar style-3">
                          <table class="table table-bordered table-striped" id="table_category">
                              <thead>
                                  <tr>
                                      <th>Account #</th>
                                      <th>Type of account</th>
                                      <th>Category #</th>
                                      <th>Category</th>
                                      <th>Status</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_category">
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </section>
  </div>

  <script src="assets/ajax/category.js"></script>

</body>

