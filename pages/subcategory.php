<?php
  include 'index.php';
?>

<style>
   .table-responsive {
      height: 600px; 
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
                <button class="btn btn-secondary btn-md" onclick="window.location.href='category.php'">Category</button>
                <button class="btn btn-dark btn-md" onclick="window.location.href='subcategory.php'">Subcategory</button>
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
                            SUBCATEGORY 
                            <i class="loading_ d-none fas fa-spinner fa-spin"></i>
                        </label>
                        <select id="subcategory_data" class="form-control"></select>
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
              <label for="">ALL SUBCATEGORY TABLE</label>
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
                          <table class="table table-bordered table-striped" id="table_subcategory">
                              <thead>
                                  <tr>
                                      <th>Account #</th>
                                      <th>Type of account</th>
                                      <th>Category #</th>
                                      <th>Category</th>
                                      <th>Subcategory #</th>
                                      <th>Subcategory</th>
                                      <th>Status</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_subcategory">
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
<script src="assets/ajax/subcategory.js"></script>

<!-- modals -->
<div class="modal fade" id="modal_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">ADD NEW SUBCATEGORY</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form for inputs -->
        <form id="form_add">
          <div class="form-group">
            <label>
                TYPE OF ACCOUNT:  <label id="toa_desc" class="text-uppercase"></label>
                <button type="button" id="remv_toa" class="close float-right" aria-label="Close">
                    <span aria-hidden="true" class="ml-2">&times;</span>
                </button>
                <i class="loading_ d-none fas fa-spinner fa-spin"></i>
            </label>
            <input required autocomplete="off" class="form-control"  placeholder="SELECT TYPE OF ACCOUNT" id="toa_list" list="select_toa">
            <datalist id="select_toa">
            </datalist>
          </div>
          <div class="form-group">
            <label>
                CATEGORY:  <label id="category_desc" class="text-uppercase"></label>
                <button type="button" id="remv_category" class="close float-right" aria-label="Close">
                    <span aria-hidden="true" class="ml-2">&times;</span>
                </button>
                <i class="loading_ d-none fas fa-spinner fa-spin"></i>
            </label>
            <input required autocomplete="off" class="form-control"  placeholder="SELECT CATEGORY" id="category_list" list="select_category" readonly>
            <datalist id="select_category">
            </datalist>
          </div>
          <div class="form-group">
            <label for="category">SUBCATEGORY:</label>
            <input type="text" class="form-control" id="subcategory_id" name="category">
          </div>

          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-dark">Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


