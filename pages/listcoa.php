<?php
  include 'index.php';
?>
<style>
    .select2-container--default .select2-selection--multiple .select2-selection__choice {
        background-color: #343a40;
        border: 1px solid #aaa;
        border-radius: 4px;
        cursor: default;
        float: left;
        margin-right: 5px;
        margin-top: 5px;
        padding: 0 5px;
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
<body class="hold-transition sidebar-mini layout-fixed" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container-fluid">
            <div class="d-flex justify-content-between">
              <div class="">
                <button class="btn btn-secondary btn-md" onclick="window.location.href='toa.php'">Type of account</button>
                <button class="btn btn-secondary btn-md" onclick="window.location.href='category.php'">Category</button>
                <button class="btn btn-secondary btn-md" onclick="window.location.href='subcategory.php'">Subcategory</button>
                <button class="btn btn-secondary btn-md" onclick="window.location.href='main_account.php'">Main account</button>
                <button class="btn btn-dark btn-md" onclick="window.location.href='listcoa.php'">List of COA</button>
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
                    <div class="col-lg-2 col-md-6 col-sm-8">
                        <label class="font-weight-bolder">DATE FROM:</label>
                        <input id="date_from" type="date" class="form-control" required>
                    </div>

                    <div class="col-lg-2 col-md-6 col-sm-8">
                        <label class="font-weight-bolder">DATE TO:</label>
                        <input id="date_to" type="date" class="form-control" required>
                    </div>

                    <div class="col-lg-2 col-md-4 col-sm-4">
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
              <label for="">ALL ACCOUNT TITLE TABLE</label>
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
                          <table class="table table-bordered table-striped" id="table_listcoa">
                              <thead>
                                  <tr>
                                      <th>Main Account #</th>
                                      <th>Account title</th>
                                      <th>Balance</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_listcoa">
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

</body>
<script src="assets/ajax/listcoa.js"></script>

