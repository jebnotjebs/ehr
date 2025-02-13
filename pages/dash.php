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
            <button class="btn btn-secondary btn-md" onclick="window.location.href='crm_storeDeposit.php'">Store Deposit</button>

            <div class="dropdown d-inline">
              <button class="btn btn-secondary btn-md dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="mr-2">Money In</span>
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <button class="dropdown-item btn-secondary" onclick="window.location.href='crm_cashin.php'">Preliminary Deposit</button>
                <button class="dropdown-item btn-secondary" onclick="window.location.href='crm_realdeposit.php'">Real Deposit</button>
              </div>
            </div>
            <button class="btn btn-secondary btn-md" onclick="window.location.href='crm_cashout.php'">Money Out</button>
            <button class="btn btn-secondary btn-md" onclick="window.location.href='crm_releasedcheque.php'">Released Cheques</button>
            <button class="btn btn-secondary btn-md" onclick="window.location.href='crm_cancelcheque.php'">Cancelled Cheques</button>
            <button class="btn btn-secondary btn-md" onclick="window.location.href='crm_bankreconciliation.php'">Bank Reconciliation</button>
            <button class="btn btn-secondary btn-md" onclick="window.location.href='crm_reconciled.php'">Reconciled</button>
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
    <section class="content">
      <div class="container-fluid">

        <div class="row">
          <div class="col-lg-3 col-6">

            <div class="small-box bg-info">
              <div class="inner">
                <h4><i class="fas fa-university"></i></h4>
                <h4>P <span id="allmonthdeposit"></span></h4>
              </div>
              <div class="icon">
                <i class="ion ion-bag"></i>
              </div>
              <a href="#" class="small-box-footer ">Current Overall Cash Deposited This Month</a>
            </div>
          </div>

          <div class="col-lg-3 col-6">

            <div class="small-box bg-success">
              <div class="inner">
                <h4><i class="fas fa-money-check"></i></h4>
                <h4>P <span id="allmonthdout"></span></h4>
              </div>
              <div class="icon">
                <i class="ion ion-stats-bars"></i>
              </div>
              <a href="#" class="small-box-footer">Current Overall Cash Withdrawal This Month</a>
            </div>
          </div>

          <div class="col-lg-3 col-6">

            <div class="small-box bg-warning">
              <div class="inner">
                <h4><i class="fas fa-money-bill-wave"></i></h4>
                <h4>P <span id="allout"></span></h4>
              </div>
              <div class="icon">
                <i class="ion ion-person-add"></i>
              </div>
              <a href="#" class="small-box-footer">Your Total Overall Cash Withdrawal</a>
            </div>
          </div>

          <div class="col-lg-3 col-6">

            <div class="small-box bg-danger">
              <div class="inner">
                <h4><i class="fas fa-wallet"></i></h4>
                <h4>P <span>102003(static value)</span></h4>
              </div>
              <div class="icon">
                <i class="ion ion-pie-graph"></i>
              </div>
              <a href="#" class="small-box-footer">Your Total Overall Current Balance</a>
            </div>
          </div>

          <div class="col-lg-6 col-6">

            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Pie Chart</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="chartjs-size-monitor">
                  <div class="chartjs-size-monitor-expand">
                    <div class=""></div>
                  </div>
                  <div class="chartjs-size-monitor-shrink">
                    <div class=""></div>
                  </div>
                </div>
                <canvas id="pieChart" style="min-height: 350px; height: 350px; max-height: 350px; max-width: 100%; display: block; width: 379px;" width="758" height="800" class="chartjs-render-monitor"></canvas>
              </div>

            </div>
          </div>


          <div class="col-lg-6 col-6 ">

            <div class="card card-secondary">
              <div class="card-header">
                <h3 class="card-title">Bar Chart</h3>
                <div class="card-tools">
                  <button type="button" class="btn btn-tool" data-card-widget="collapse">
                    <i class="fas fa-minus"></i>
                  </button>
                  <button type="button" class="btn btn-tool" data-card-widget="remove">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div class="chart">
                  <div class="chartjs-size-monitor">
                    <div class="chartjs-size-monitor-expand">
                      <div class=""></div>
                    </div>
                    <div class="chartjs-size-monitor-shrink">
                      <div class=""></div>
                    </div>
                  </div>
                  <canvas id="stackedBarChart" style="min-height: 350px; height: 350px; max-height: 350px; max-width: 100%; display: block; width: 379px;" width="758" height="800" class="chartjs-render-monitor"></canvas>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>

  </div>
  <script src="assets/ajax/crm_dash.js"></script>

</body>