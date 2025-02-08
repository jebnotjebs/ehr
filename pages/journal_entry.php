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
</style>

<body class="hold-transition sidebar-mini layout-fixed" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <button class="btn btn-dark btn-md" id="btn_mje" onclick="window.location.href='journal_entry.php'">Manual Journal Entry</button>
          <button class="btn btn-secondary btn-md" id="btn_aje" onclick="window.location.href='auto_journal.php'">Automatic Journal Entry</button>
          <button class="btn btn-secondary btn-md" id="btn_pje" onclick="window.location.href='posted_journal.php'">Posted Journal Entry</button>
          <button class="btn btn-secondary btn-md" id="btn_gl" onclick="window.location.href='general_ledger.php'">General Ledger</button>
        </div>
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">
          <div class="card card-body">
            <div class="chart-container">
              <div class="overlay-wrapper">
                  <div class="overlay">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                    <div class="text-bold pt-2">Loading...</div>
                  </div>
                  <div class="col-lg-2 col-md-4 col-sm-12">
                    <div class="form-group">
                        <label class="font-weight-bolder">Date of transaction:</label>
                        <input id="date_trans" type="date" class="form-control" required value="<?=date('Y-m-d'); ?>">
                    </div>
                  </div>
                 
                  <div class="table-responsive">
                      <div class="scrollbar style-3">
                          <table class="table table-bordered table-striped display" id="table_journal">
                              <thead>
                                  <tr>
                                      <th>#</th>
                                      <th>Account title</th>
                                      <th>Debit</th>
                                      <th>Credit</th>
                                      <th>Action</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_journal">
                              </tbody>
                          </table>
                          <input type="hidden" id="total_debit">
                          <input type="hidden" id="total_credit">
                          <div class="container-fluid">
                           <div class="row">
                              <div class="col-lg-5">
                                <div class="form-group">
                                  <label for="">MEMO/EXPLANATION:</label>
                                  <input id="memo_data" cols="50" rows="3" class="form-control">
                                </div>
                              </div>
                              <div class="col-lg-3">
                                <div class="form-group">
                                  <label for="">Location:</label>
                                    <input id="branch_data" data-placeholder="" class="form-control" list="branch_list">
                                    <datalist id="branch_list"></datalist>
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

          <div class="card card-body">
            <div class="card-header">
              <label for="">POSTED JOURNAL ENTRY TABLE as of <span id="current-date"></span> </label>
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
                          <table class="table table-bordered table-striped" id="table_journalentry">
                              <thead>
                                  <tr>
                                      <th>Date of transaction</th>
                                      <th>Journal code</th>
                                      <th  class="col-md-4">Account title</th>
                                      <th>Debit</th>
                                      <th>Credit</th>
                                      <th>Memo</th>
                                      <th>Added by</th>
                                  </tr>
                              </thead>
                              <tbody id="tbody_journalentry">
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
<script src="assets/ajax/journal_entry.js"></script>


