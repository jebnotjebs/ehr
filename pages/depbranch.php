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
                <h1>Bank - Branch</h1>
              </div>
              <div class="ml-md-auto">
                  <div class="">
                    <button class="btn btn-md btn-dark" id="newTransact"><i class=" fas fa-plus mr-1"></i>Assign</button>
                  </div>
              </div>
            </div>
        </div>
      </section>
      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">

          <div class="card card-body">
            <div class="card-header">
             
            </div>
              <br>
            <div class="chart-container">
              <div class="overlay-wrapper">
                  <div class="overlay">
                    <i class="fas fa-3x fa-sync-alt fa-spin"></i>
                    <div class="text-bold pt-2 pl-2">Loading...</div>
                  </div>
                  <div class="table-responsive">
                      <div class="scrollbar style-3">
                          <table class="table table-hover table-striped table-borderless text-center" id="table_newbanks">
							<thead>
                          <tr class="table table-bordered table-striped">
						 		 <th>BANK</th>
									<th>ACCOUNT NUMBER</th>
									<th>ACCOUNT NAME</th>
									<th>BRANCH</th>
									<th>ACTION</th>
								</tr>
							</thead>
							<tbody id="tbody_newbanks">
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
  <script src="assets/ajax/depbranch.js"></script>

</body>


<!----------------------start modal add-------------------------------------------------->
<div class="modal fade"  data-backdrop="static"id="addnewTransact" role="dialog" aria-hidden="true">
										<div class="modal-dialog modal-lg" role="document">
											<div class="modal-content">
												<div class="modal-header no-bd">
													<h5 class="modal-title">
														<span class="fw-mediumbold">
														ASSIGN </span> 
													</h5>
													<button type="button" class="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
													<div class="modal-body">
											
													<form id="form_add_newDepbranch">
													<div class="row">
															<input type="hidden" name="formula" value="add_row_newdepbranch">

															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Bank</label>
																	<select required style="width: 100%;"  class="form-control  bg bg-light" name="bank_det" id="bank_det"></select>
																</div>
															</div>
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Account Name</label>
																	<input  style="width: 100%;"  class="form-control  bg bg-light "  name="acct_name" readonly id="acct_name_input">
																</div>
															</div>
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Account Number</label>
																	<input  style="width: 100%;"  class="form-control  bg bg-light "  name="acct_number" readonly id="acct_number_input">
																</div>
															</div>
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Branch</label>
																	<select required style="width: 100%;"  class="form-control  bg bg-light" name="branches_" id="branches_"></select>
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
	<!--------------------- start edit modal ---------------------------------------------->
	<div class="modal fade"  data-backdrop="static"id="editnewbankModal" tabindex="-1" role="dialog" aria-hidden="true">
										<div class="modal-dialog modal-lg" role="document">
											<div class="modal-content">
												<div class="modal-header no-bd">
													<h5 class="modal-title">
														<span class="fw-mediumbold">
														Edit information</span> 
													</h5>
													<button type="button" class="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
												<div class="modal-body">
													<form id="form_edit">
														<div class="row">
														<input type="hidden" name="formula" value="edit_row">
															<input type="hidden" name="edit_id" id="edit_id">
															
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Bank</label>
																	<input type="text" style="width: 100%;" class="form-control bg bg-light" name="edit_bank_det" id="edit_bank_det" autocomplete="off" >
																	
																</div>
															</div>
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Account Name</label>
																	<input  style="width: 100%;"  class="form-control  bg bg-light "  name="edit_acct_name" readonly id="edit_acct_name_input">
																</div>
															</div>
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Account Number</label>
																	<input  style="width: 100%;"  class="form-control  bg bg-light "  name="edit_acct_number" readonly id="edit_acct_number_input">
																</div>
															</div>
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Branch</label>
																	<select required style="width: 100%;"  class="form-control  bg bg-light" name="edit_branches_" id="edit_branches_"></select>
																</div>
															</div>		
															<div class="col-sm-12 di mt-2">
																<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
																<button type="submit" class="btn btn-primary float-right">Update</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>

	<!----------------------- end edit modal --------------------------------------------->

