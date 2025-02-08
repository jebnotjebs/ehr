<?php
  include 'index.php';
?>
<body>
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container-fluid">
            <div class="d-flex justify-content-between">
              <div class="">
                <button class="btn btn-dark btn-md" onclick="window.location.href='toa.php'">Type of account</button>
                <button class="btn btn-secondary btn-md" onclick="window.location.href='category.php'">Category</button>
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
                    <div class="col-lg-2 col-md-4 col-sm-12">
                      <label for="">Type of account:</label>
                      <div class="form-group">
                        <select id="select_toa" class="form-control" required>
                        </select>
                      </div>
                    </div>


                    <div class="col-lg-2 col-md-4 col-sm-12">
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
              <label for="">ALL TYPE OF ACCOUNT TABLE</label>
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
                          <table class="table table-bordered table-striped" id="table_toa">
                              <thead>
                                  <tr>
                                      <th>Account #</th>
                                      <th>Type of account</th>
                                      <th>Date added</th>
                                      <th>Status</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_toa">
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
<script src="assets/ajax/toa.js"></script>
