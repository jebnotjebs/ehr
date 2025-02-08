<?php
  include 'index.php';
?>
<style>
    .table-responsive {
      height: 700px; 
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
      <section class="content-header">
        <div class="container-fluid">
            <div class="d-flex justify-content-between">
              <div class="">
              </div>
            </div>
        </div>
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="card card-body">
            <div class="card-header">
              <label for="">PRODUCT UTILITY</label>
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
                          <table class="table table-bordered table-striped" id="table_product">
                              <thead>
                                  <tr>
                                      <th>Product code</th>
                                      <th>Description</th>
                                      <th>Account output</th>
                                      <th>Account vat</th>
                                      <th>Account vat exempt</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_product">
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
<script src="assets/ajax/products_utility.js"></script>
