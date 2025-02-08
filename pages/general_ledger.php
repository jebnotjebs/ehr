
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
  .fixed-width-col {
      width: 450px; 
      min-width: 450px; 
      max-width: 450px; 
  }
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

<body class="hold-transition sidebar-mini layout-fixed" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6">
              <button class="btn btn-secondary btn-md" onclick="window.location.href='journal_entry.php'">Manual Journal Entry</button>
              <button class="btn btn-secondary btn-md" onclick="window.location.href='auto_journal.php'">Automatic Journal Entry</button>
              <button class="btn btn-secondary btn-md" onclick="window.location.href='posted_journal.php'">Posted Journal Entry</button>
              <button class="btn btn-dark btn-md" onclick="window.location.href='general_ledger.php'">General Ledger</button>
            </div>
            <div class="col-6 justify-content-end">
                <div class="bg-secondary" style="opacity: .5;">
                    <h4 class="font-italic text-center">GENERAL LEDGER</h4>
                </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Main content -->
      <section class="content">
        <!-- automatic journal -->
        <div class="container-fluid">
         <div class="card card-body">
            <div class="card-header">
              <div class="row">
                <div class="col-6">
                  <div class="row">
                    <div class="col-12">
                      <span class="font-weight-bold ">Company Name: MRS G Cakes shop</span>
                    </div>
                    <div class="col-12">
                      <span class="font-weight-bold">Address: <span >Capirpiriwan, Cordon, Isabela</span></span>
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="row">
                    <div class="col-lg-2 col-md-4 col-sm-6">
                      <label for="" style="opacity: 0;">#</label>
                      <div class="form-group">
                        <label  class="font-bold" id="btn_load">Time period:</label>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6">
                      <div class="form-group">
                        <label for="">Date from:</label>
                        <input type="date" id="date_from" class="form-control" value="<?=date('Y-m-d')?>">
                      </div>
                    </div>

                    <div class="col-lg-3 col-md-4 col-sm-6">
                      <div class="form-group">
                        <label for="">Date to:</label>
                        <input type="date" id="date_to" class="form-control" value="<?=date('Y-m-d')?>">
                      </div>
                    </div>

                    <div class="col-lg-3 col-md-4 col-sm-6">
                      <label for="" style="opacity: 0;">#</label>
                      <div class="form-group">
                        <button class="btn btn-dark" class="form-control" id="btn_load">Load</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
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
                          <table class="table table-bordered table-striped" id="table_autoJournal">
                              <thead>
                                <tr>
                                    <th colspan="2"></th>
                                    <th colspan="2" class="text-center">Transaction</th>
                                    <th colspan="2" class="text-center">Balance</th>
                                </tr>
                                <tr class="">
                                    <th>Date</th>
                                    <th class="fixed-width-col">Description</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                    <th>Debit</th>
                                    <th>Credit</th>
                                </tr>
                              </thead>
                              <tbody id="tbody_autoJournal">
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
<script src="assets/ajax/general_ledger.js"></script>
<!-- modals -->
<div class="modal fade" id="modal_check">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">PRE ADJUST ENTRY</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="journal_id">
        <input type="hidden" id="journal_date">

        <div class="chart-container">
          <div class="overlay-wrapper">
              <div class="overlay">
                <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                <div class="text-bold pt-2">Loading...</div>
              </div>
              
              <div class="row">
                <div class="col-3">
                  <div class="form-group">
                    <label for="journal_trans_no">Transaction no:</label>
                    <input type="text" id="journal_trans_no" class="form-control" disabled>
                  </div>
                </div>

                <div class="col-3">
                  <div class="form-group">
                    <label for="journal_date_trans">Transaction Date:</label>
                    <input type="date" id="journal_date_trans" class="form-control" disabled>
                  </div>
                </div>
              </div>
             
              <div class="table-responsive">
                <input type="hidden" id="total_debit">
                <input type="hidden" id="total_credit">
                <div class="scrollbar style-3">
                  <table class="table table-bordered table-striped display" id="table_adjust_journal">
                      <thead>
                          <tr>
                              <th>Account title</th>
                              <th>Debit</th>
                              <th>Credit</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody id="tbody_adjust_journal">
                      </tbody>
                  </table>
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-lg-5">
                        <div class="form-group">
                          <label for="journal_memo">MEMO/EXPLANATION:</label>
                          <input type="text" id="journal_memo" class="form-control" disabled>
                        </div>
                      </div>
                      <div class="col-lg-3">
                        <div class="form-group">
                          <label for="journal_location">Location:</label>
                            <input type="text" id="journal_location" class="form-control" disabled>
                        </div>
                      </div>
                    </div>
                    <div class="ml-md-auto">
                        <div class="">
                          <button class="btn btn-md btn-dark" id="save_journal">SAVE</button>
                        </div>
                    </div>
                    
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



