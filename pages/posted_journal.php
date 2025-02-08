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
      width: 450px; /* Adjust the width as per your design */
      min-width: 450px; /* Ensure minimum width */
      max-width: 450px; /* Ensure maximum width */
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
  .modal-custom {
    max-width: 90%; /* Adjust the maximum width as needed */
    width: auto !important;
  }
</style>

<body class="hold-transition sidebar-mini layout-fixed" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
       <div class="container-fluid">
          <button class="btn btn-secondary btn-md" onclick="window.location.href='journal_entry.php'">Manual Journal Entry</button>
          <button class="btn btn-secondary btn-md" onclick="window.location.href='auto_journal.php'">Automatic Journal Entry</button>
          <button class="btn btn-dark btn-md" onclick="window.location.href='posted_journal.php'">Posted Journal Entry</button>
          <button class="btn btn-secondary btn-md" onclick="window.location.href='general_ledger.php'">General Ledger</button>
        </div>
      </section>

      <!-- Main content -->
      <section class="content">
        <!-- automatic journal -->
        <div class="container-fluid">
         <div class="card card-body">
            <div class="card-header">
             <label for="">POSTED JOURNAL ENTRY</label>
            </div>
            <br>
            <div class="row">
              <div class="col-lg-2 col-md-4 col-sm-6">
                <div class="form-group">
                  <label for="">SELECT DATE:</label>
                  <input type="date" id="date_filter" class="form-control" value="<?= date('Y-m-d', strtotime('-1 day')) ?>">
                </div>
              </div>

              <div class="col-lg-2 col-md-4 col-sm-6">
                <label for="" style="opacity: 0;">#</label>
                <div class="form-group">
                  <button class="btn btn-dark" class="form-control" id="btn_load">Load</button>
                </div>
              </div>
            </div>
              
            <div class="chart-container">
              <div class="overlay-wrapper">
                  <div class="overlay">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                    <div class="text-bold pt-2">Loading...</div>
                  </div>
                  <div class="table-responsive">
                      <div class="scrollbar style-3">
                          <table class="table table-bordered table-striped" id="table_postedJournal">
                              <thead>
                                  <tr>
                                      <th>Action</th>
                                      <th>Journal code</th>
                                      <th>Date</th>
                                      <th class="fixed-width-col">Account title</th>
                                      <th>Debit</th>
                                      <th>Credit</th>
                                      <th>Memo</th>
                                      <th>Location</th>
                                      <th>Type</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_postedJournal">
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

<script src="assets/ajax/posted_journal.js"></script>

<!-- modals -->
<div class="modal fade" id="modal_adjust_entry">
  <div class="modal-dialog modal-custom" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">ADJUST ENTRY</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="journal_id">
        <input type="hidden" id="journal_date">

        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="chart-container">
              <div class="overlay-wrapper">
                  <div class="overlay">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                    <div class="text-bold pt-2">Loading...</div>
                  </div>
                 
                  <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_trans_no_x">Transaction no:</label>
                        <input type="text" id="journal_trans_no_x" class="form-control" disabled>
                      </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_date_trans">Transaction Date:</label>
                        <input type="date" id="journal_date_trans_x" class="form-control" disabled>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_memo">MEMO/EXPLANATION:</label>
                        <input type="text" id="journal_memo_x" class="form-control" disabled>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_location">Location:</label>
                          <input type="text" id="journal_location_x" class="form-control" disabled>
                      </div>
                    </div>
                  </div>
                  
                  <div class="table-responsive">
                      <div class="scrollbar style-3">
                          <table class="table table-bordered table-striped" id="table_ModalpostedJournal">
                              <thead>
                                  <tr>
                                      <th class="fixed-width-col">Account title</th>
                                      <th>Debit</th>
                                      <th>Credit</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_ModalpostedJournal">
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-12 col-sm-12 border-left">
            <div class="chart-container">
              <div class="overlay-wrapper">
                  <div class="overlay">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                    <div class="text-bold pt-2">Loading...</div>
                  </div>
                  
                  <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_trans_no">Transaction no:</label>
                        <input type="text" id="journal_trans_no" class="form-control" disabled>
                      </div>
                    </div>

                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_date_trans">Transaction Date:</label>
                        <input type="date" id="journal_date_trans" class="form-control" value="<?= date('Y-m-d') ?>" disabled>
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_memo">MEMO/EXPLANATION:</label>
                        <input type="text" id="journal_memo" class="form-control" >
                      </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-2">
                      <div class="form-group">
                        <label for="journal_location">Location:</label>
                          <input type="text" id="journal_location" class="form-control" disabled>
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
                        <div class="justify-content-end">
                            <div class="float-right">
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
  </div>
</div>


