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
                <button class="btn btn-dark btn-md" onclick="window.location.href='main_account.php'">Main account</button>
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
                            ACCOUNT TITLE - <label id="accoutTitle_desc" class="text-uppercase"></label>
                            <button type="button" id="remv_acc_title" class="close float-right" aria-label="Close">
                                <span aria-hidden="true" class="ml-2">&times;</span>
                            </button>
                            <i class="loading_ d-none fas fa-spinner fa-spin"></i>
                        </label>
                        <input required autocomplete="off" class="form-control"  placeholder="SELECT TYPE OF ACCOUNT" id="sub_data" list="sub_list">
                        <datalist id="sub_list">
                        </datalist>
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
                          <table class="table table-bordered table-striped" id="table_main">
                              <thead>
                                  <tr>
                                      <th>Account #</th>
                                      <th>Type of account</th>
                                      <th>Category #</th>
                                      <th>Category</th>
                                      <th>Subcategory #</th>
                                      <th>Subcategory</th>
                                      <th>Main Account #</th>
                                      <th>Account title</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_main">
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
<script src="assets/ajax/main_account.js"></script>

<!-- modals -->
<div class="modal fade" id="modal_add" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">ADD ACCOUNT TITLE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form for inputs -->
        <form id="form_add">
            <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-16">
                    <div class="form-group">
                        <label>
                            TYPE OF ACCOUNT:  <label id="toa_desc" class="text-uppercase"></label>
                            <button type="button" id="remv_toa" class="close float-right" aria-label="Close">
                                <span aria-hidden="true" class="ml-2">&times;</span>
                            </button>
                            <i class="loading_ d-none fas fa-spinner fa-spin"></i>
                        </label>
                        <input required autocomplete="off" class="form-control"  placeholder="SELECT TYPE OF ACCOUNT" id="toa_data" list="select_toa">
                        <datalist id="select_toa">
                        </datalist>
                    </div>
                </div>
                
                <div class="col-lg-4 col-md-6 col-sm-16">
                    <div class="form-group">
                        <label>
                            CATEGORY:  <label id="category_desc" class="text-uppercase"></label>
                            <button type="button" id="remv_category" class="close float-right" aria-label="Close">
                                <span aria-hidden="true" class="ml-2">&times;</span>
                            </button>
                            <i class="loading_ d-none fas fa-spinner fa-spin"></i>
                        </label>
                        <input required autocomplete="off" class="form-control"  placeholder="SELECT CATEGORY" id="category_data" list="select_category" readonly>
                        <datalist id="select_category">
                        </datalist>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-16">
                    <div class="form-group">
                        <label>
                            SUBCATEGORY:  <label id="subcategory_desc" class="text-uppercase"></label>
                            <button type="button" id="remv_subcategory" class="close float-right" aria-label="Close">
                                <span aria-hidden="true" class="ml-2">&times;</span>
                            </button>
                            <i class="loading_ d-none fas fa-spinner fa-spin"></i>
                        </label>
                        <input required autocomplete="off" class="form-control"  placeholder="SELECT SUBCATEGORY" id="subcategory_data" list="subcategory_list" readonly>
                        <datalist id="subcategory_list">
                        </datalist>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-16">
                    <div class="form-group">
                        <label for="">ACCOUNT TITLE</label>
                        <input type="text" id="acct_title" class="form-control" placeholder="Enter account title">
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-16">
                    <div class="form-group">
                        <label for="">BALANCE</label>
                        <input type="text" id="balance_data" class="form-control" value="0">
                    </div>
                </div>

                <div class="col-lg-4 col-md-6 col-sm-16">
                    <div class="form-group">
                        <label for="">REPORT</label>
                        <select id="report_data" class="select2 select2-danger" data-dropdown-css-class="select2-dark" data-placeholder="Select a report" multiple="multiple" style="width: 100%;">
                            <option value="BALANCE SHEET">BALANCE SHEET</option>
                            <option value="CASH FLOW">CASH FLOW</option>
                            <option value="PNL">PNL</option>
                            <option value="s">s</option>
                            <option value="d">d</option>
                            <option value="aass">aass</option>
                            <option value="aassaass">aassaass</option>
                            <option value="PNLPNL">PNLPNL</option>
                            <option value="BALANCE">BALANCE</option>
                            <option value="BALANCEBALANCE">BALANCEBALANCE</option>

                        </select>
                    </div>
                </div>
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


