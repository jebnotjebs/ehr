<?php
include 'head.php';
?>

<body class="hold-transition sidebar-mini layout-fixed dark-mode" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="d-flex justify-content-between">
          <div class="">
            <h1>Money In</h1>
          </div>

          <div class="ml-md-auto">
            <div class="">
              <button class="btn btn-md btn-dark" id="newTransact"><i class=" fas fa-plus mr-1"></i>Money In</button>
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
				<div class="col-md-2 mt-3 ">
						<label class="imagecheck mb-3 bg-light" style="width: 100%; height:70%;">
							<input id="all__" name="imagecheck" type="checkbox" value="1" class="imagecheck-input">
							<figure class="imagecheck-figure">
								<div class="p-1 text-center">All Bank</div>
							</figure>
						</label>
					</div>
					<div class="col-md-4 p-2">
						<div class="form-group form-group-default">
							<label class="font-weight-bolder">
								BANK
								<i class="loading2_ d-none fas fa-spinner fa-spin"></i>
							</label>
							<select required class="form-control w-sm-98 w-md-98 w-lg-98" id="bank_" name="bank_" multiple="multiple">
							</select>
						</div>
					</div>
					<div class="col-md-4 p-1">
						<div class="form-group form-group-default">
							<label class="font-weight-bolder">DATE</label>
							<input value="<?php echo date('Y-m-d') ?>" required type="date" id="date_" name="date_" class="form-control" placeholder="Date" />

						</div>
					</div>
					<div class="col-md-2 p-2 mt-4">
						<div class="form-group"> 
						<button type="button" id="load_ars" class="btn btn-md btn-dark mt-1">Load <i class="loading_ d-none fas fa-spinner fa-spin"></i></button>
						</div>
					</div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="card card-body">
          <div class="card-header">
            <label for="">MONEY IN TABLE</label>
          </div>
          <br>
          <div class="chart-container">
          <div class="overlay-wrapper">
              <div class="overlay ">
                <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                <div class="text-bold pt-2 pl-3">Loading...</div>
              </div>
              <div class="table-responsive">
                <div class="scrollbar style-3">
                  <table class="table table-hover table-striped table-borderless text-center" id="table_cdeposit">
						<thead>
							<tr class="table table-bordered table-striped">
								<th>BRANCH CODE</th>
								<th>BANK</th>
								<th>ACCOUNT NAME</th>
								<th>ACCOUNT NUMBER</th>
								<th>DATE OF SALES</th>
								<th>DATE DEPOSIT</th>
								<th>AMOUNT</th>
								<th>STATUS</th>
							</tr>
						</thead>
						<tbody id="tbody_cdeposit">
						</tbody>
					</table>
                </div>
              </div>
            </div>
          </div>
        </div>

<!------------------------------------------------------------------------------------------------------------------>


<div class="card card-body">
          <div class="card-header">
            <label for="">DEPOSITED</label>
          </div>
          <br>
          <div class="chart-container">
          <div class="overlay-wrapper">
              <div class="overlay ">
                <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                <div class="text-bold pt-2 pl-3">Loading...</div>
              </div>
              <div class="table-responsive">
                <div class="scrollbar style-3">
                  <table class="table table-hover table-striped table-borderless text-center" id="table_cdeposited">
						<thead>
							<tr class="table table-bordered table-striped">
								<th>BRANCH CODE</th>
								<th>BANK</th>
								<th>ACCOUNT NAME</th>
								<th>ACCOUNT NUMBER</th>
								<th>DATE OF SALES</th>
								<th>DATE DEPOSIT</th>
								<th>AMOUNT</th>
							</tr>
						</thead>
						<tbody id="tbody_cdeposited">
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

  <script src="assets/ajax/cashin.js"></script>

</body>
<!----------------------start modal add-------------------------------------------------->
<div class="modal fade"  data-backdrop="static"id="addnewTransact" role="dialog" aria-hidden="true">
										<div class="modal-dialog modal-lg" role="document">
											<div class="modal-content">
												<div class="modal-header no-bd">
													<h5 class="modal-title">
														<span class="fw-mediumbold">
														MONEY IN </span> 
													</h5>
													<button type="button" class="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
													<div class="modal-body">
											
													<form id="form_add">
													<div class="row">
															<input type="hidden" name="formula" value="add_row">

															<div class="col-md-4">
																<div class="form-group form-group-default">
																	<label>Branch</label>
																		<select  required style="width: 100%;" class="form-control  bg bg-light " name="banks_" id="banks_"></select>
																</div>
															</div>
															
															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Bank</label>
														
																		<select required style="width: 100%;"  class="form-control  bg bg-light" name="bank_det" id="bank_det"></select>
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Account Name</label>
															
																	<input  style="width: 100%;"  class="form-control  bg bg-light "  name="acct_name" readonly id="acct_name_input">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Account Number</label>
														
																	<input  style="width: 100%;"  class="form-control  bg bg-light "  name="acct_number" readonly id="acct_number_input">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Date of Sales</label>
																		<input required class="form-control bg bg-light w-100" name="dtofSale" id="dtofSale" type="date" >
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Date of Deposit</label>
																		<input required class="form-control bg bg-light w-100" name="dtofDeposit" id="dtofDeposit" type="date">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Amount</label>
																		<input required onblur="this.value = this.value.toUpperCase().replace(/[^\d.-]/g, '')" onkeyup="this.value = this.value.toUpperCase().replace(/[^\d.-]/g, '')" class="form-control bg bg-light w-100" name="amount" id="amount" type="text" autocomplete="off">
																</div>
															</div>
																											
														<div class="col-sm-12 di mt-1">
																<button type="submit" class="btn btn-primary float-right"> Add </button>
																<button type="button" class="btn btn-danger float-left" data-dismiss="modal">Close</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
	<!----------------------end modal add-------------------------------------------------->
