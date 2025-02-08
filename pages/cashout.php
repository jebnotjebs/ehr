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
            <h1>Money Out</h1>
          </div>

          <div class="ml-md-auto">
            <div class="">
              <button class="btn btn-md btn-dark" id="newTransactOut"><i class=" fas fa-plus mr-1"></i>Money Out</button>
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
            <div class="col-md-4 p-2">
                <div class="form-group form-group-default">
                    <label class="font-weight-bolder">RELEASED FROM</label>
                    <input required type="date" id="date_from" value="<?=date('Y-m-d');?>" style="width: 100%;" class="form-control bg bg-light" placeholder="Date" />
                </div>
            </div>
            <div class="col-md-4 p-2">
                <div class="form-group form-group-default">
                    <label class="font-weight-bolder">RELEASED TO</label>
                    <input required type="date" value="<?=date('Y-m-d');?>" style="width: 100%;" class="form-control bg bg-light" id="date_to" placeholder="Date" />
                </div>
            </div>
           
			<div class="col-lg-2 col-md-4 col-sm-4">
                    <label for="" style="opacity: 0;">###</label>
                    <div class="form-group">
                      <button type="submit" class="btn btn-md btn-dark mt-1">Load <i class="loading_ d-none fas fa-spinner fa-spin"></i></button>
                    </div>
                  </div>
        </div>
    </form>
            </div>
          </div>
        </div>

        <div class="card card-body">
          <div class="card-header">
            <label for="">MONEY OUT TABLE</label>
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
					<table class="table table-hover table-striped table-borderless text-center" id="table_cshout">
						<thead>
						<tr class="table table-bordered table-striped">
								<th>BANK</th>
								<th>CHEQUE NUMBER</th>
								<th>PAYEE</th>
								<th>CHEQUE DATE</th>
								<th>DR DATE</th>
								<th>DR NUMBER</th>
								<th>CATEGORY</th>
								<th>BRANCH</th>
								<th>BRANCH UNIT</th>
								<th>PARTICULARS</th>
								<th>AMOUNT</th>
								<th>REMARKS</th>
								

							</tr>
						</thead>
						<tbody id="tbody_cshout">
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

  <script src="assets/ajax/cashout.js"></script>

</body>
<!----------------------start modal add-------------------------------------------------->
<div class="modal fade"  data-backdrop="static"id="addnewTransactOut" role="dialog" aria-hidden="true">
										<div class="modal-dialog modal-lg" role="document">
											<div class="modal-content">
												<div class="modal-header no-bd">
													<h5 class="modal-title">
														<span class="fw-mediumbold">
														MONEY OUT</span> 
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
																	<label>Bank</label>
																	<select required style="width: 100%;"  class="form-control  bg bg-light" name="banks__" id="banks__"></select>
																</div>
															</div>
															
															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Cheque Number</label>
														
																		
																		<input required class="form-control bg bg-light w-100" name="chequeNum" id="chequeNum" type="text" autocomplete="off">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Payee</label>
															
																	<input required class="form-control bg bg-light w-100" name="payee" id="payee" type="text" autocomplete="off">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Cheque Date</label>
														
																	<input required class="form-control bg bg-light w-100" name="chequeDt" id="chequeDt" type="date" >
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>DR Date</label>
																		<input required class="form-control bg bg-light w-100" name="drDt" id="drDt" type="date" >
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>DR Number</label>
																		<input required onblur="this.value = this.value.toUpperCase().replace(/[^\d.-]/g, '')" onkeyup="this.value = this.value.toUpperCase().replace(/[^\d.-]/g, '')"  class="form-control bg bg-light w-100" name="drNum" id="drNum" type="text" autocomplete="off">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Category</label>															
																		<select required style="width: 100%;"  class="form-control  bg bg-light" name="cAteg" id="cAteg"></select>
																</div>
															</div>
															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Branch</label>																
																		<select required style="width: 100%;"  class="form-control  bg bg-light" name="bRnch" id="bRnch"></select>
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Branch Unit</label>
																	<select required style="width: 100%;"  class="form-control  bg bg-light" name="bRnchUnt" id="bRnchUnt"></select>
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Particulars</label>
																		<input required class="form-control bg bg-light w-100" name="pRtculars" id="pRtculars" type="text" autocomplete="off">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Amount</label>
																		<input required onblur="this.value = this.value.toUpperCase().replace(/[^\d.-]/g, '')" onkeyup="this.value = this.value.toUpperCase().replace(/[^\d.-]/g, '')" class="form-control bg bg-light w-100" name="amount" id="amount" type="text" autocomplete="off">
																</div>
															</div>

															<div class="col-md-4">
																<div class="form-group form-group-default" >
																	<label>Remarks</label>
																		<input required class="form-control bg bg-light w-100" name="rMrks" id="rMrks-" type="text" autocomplete="off">
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
									