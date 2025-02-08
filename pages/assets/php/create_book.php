<?php
  include 'index.php';
?>
<body class="hold-transition sidebar-mini layout-fixed dark-mode" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container-fluid">
          <div class="">
              <button class="btn btn-dark btn-md" onclick="window.location.href='ch_company.php'">Company</button>
              <button class="btn btn-secondary btn-md" onclick="window.location.href='ch_division.php'">Division</button>
              <button class="btn btn-secondary btn-md" onclick="window.location.href='ch_category.php'">Category</button>
              <button class="btn btn-secondary btn-md" onclick="window.location.href='ch_department.php'">Department</button>
              <button class="btn btn-secondary btn-md" onclick="window.location.href='ch_all.php'">List of Company</button>
          </div>
        </div>
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="card card-default">
           
            <div class="card-body" style="display: block;">
              <div class="col">
                <form id="form_save">
                  <div class="row">
                    <div class="col-lg-2 col-md-4 col-sm-12">
                      <label for="">Company:</label>
                     <input type="text" id="company_name" class="form-control" onkeyup="this.value = this.value.toUpperCase()" required>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-12">
                      <label for="" style="opacity: 0;">###</label>
                      <div class="form-group">
                          <button type="submit" class="btn btn-md btn-dark">Save <i class="loading_ d-none fas fa-spinner fa-spin"></i></button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="card card-body">
            <div class="card-header">
              <label for="">ALL COMPANY TABLE</label>
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
                          <table class="table table-bordered table-striped" id="table_company">
                              <thead>
                                  <tr>
                                      <th>Company code</th>
                                      <th>Company desc</th>
                                      <th>Date added</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_company">
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
<script src="assets/ajax/ch_company.js"></script>

