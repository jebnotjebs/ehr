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

  <div class="content-wrapper" style="min-height: 554.4px;">

    <section class="content-header">
      <div class="container-fluid">
        <div class="d-flex justify-content-between">
          <div class="">
            <button class="btn btn-dark btn-md" onclick="window.location.href='crm_dash.php'">Dashboard</button>
            <button class="btn btn-secondary btn-md" onclick="window.location.href='patient_reg.php'">Add Patient</button>

            <div class="dropdown d-inline">
              <button class="btn btn-secondary btn-md dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-toggle="tooltip" data-placement="top" title="Bank Settings">
                <i class="fa fa-cogs"></i>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item" onclick="window.location.href='crm_newbank.php'">Open New Bank</button>
                <button class="dropdown-item" onclick="window.location.href='crm_assigncheque.php'">Cheque Registration</button>
                <button class="dropdown-item" onclick="window.location.href='crm_depbranch.php'">Assign Store Bank</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
  <script src="assets/ajax/crm_dash.js"></script>

</body>