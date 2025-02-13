<?php
  include 'index.php';
?>
<body class="hold-transition sidebar-mini layout-fixed dark-mode" data-panel-auto-height-mode="height">
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="ml-md-auto">
            <div class="">
              <button class="btn btn-md btn-dark" id="newTransact"><i class=" fas fa-plus mr-1"></i>Add New User</button>
            </div>
        </div>
      </section>


      <!-- Main content -->
      <section class="content">
        <div class="container-fluid">

          <div class="card card-body">
            <div class="card-header">
              <label for="">User Accounts</label>
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
                          <table class="table table-hover table-striped table-borderless text-center" id="table_user">
							<thead>
                          <tr class="table table-bordered table-striped">
								<th>ID</th>
								<th>USERNAME</th>
								<th>PASSWORD</th>
								<th>DATE ADDED</th>
								<th>ACTION</th>
								</tr>
							</thead>
							<tbody id="tbody_user">
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
  

  <script src="assets/ajax/create_user.js"></script>

</body>



      <!----------------------start modal add-------------------------------------------------->
	  <div class="modal fade"  data-backdrop="static"id="addnewTransact" role="dialog" aria-hidden="true">
										<div class="modal-dialog modal-lg" role="document">
											<div class="modal-content">
												<div class="modal-header no-bd">
													<h5 class="modal-title">
														<span class="fw-mediumbold">
														New User Account </span> 
													</h5>
													<button type="button" class="close" data-dismiss="modal" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
													<div class="modal-body">
											
													<form id="form_add_newuser">
													<div class="row">

															<div class="col-md-6">
																<div class="form-group form-group-default">
																	<label>Username</label>
																	<input type="text" style="width: 100%;" class="form-control bg bg-light" name="username" id="username" required>
																</div>
															</div>
															
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Password</label>
																	<input type="password" style="width: 100%;" class="form-control bg bg-light" name="password" id="password" required>
																	<i class="bi bi-eye-slash" id="togglePassword"></i>
																</div>
															</div>
																							
															<div class="col-sm-12 di mt-1">
																<button type="submit" class="btn btn-primary float-right"> Save </button>
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
	<div class="modal fade"  data-backdrop="static"id="editnewuserModal" tabindex="-1" role="dialog" aria-hidden="true">
										<div class="modal-dialog modal-lg" role="document">
											<div class="modal-content">
												<div class="modal-header no-bd">
													<h5 class="modal-title">
														<span class="fw-mediumbold">
														Edit User Account</span> 
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
																<div class="form-group form-group-default">
																	<label>Username</label>
																	<input type="text" style="width: 100%;" class="form-control bg bg-light" name="edit_username" id="edit_username" required>
																</div>
															</div>
															
															<div class="col-md-6">
																<div class="form-group form-group-default" >
																	<label>Password</label>
																	<input type="password" style="width: 100%;" class="form-control bg bg-light" name="edit_password" id="edit_password" required>
																</div>
															</div>
																											
															<div class="col-sm-12 di mt-1">
																<button type="submit" class="btn btn-primary float-right"> update </button>
																<button type="button" class="btn btn-danger float-left" data-dismiss="modal">Close</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>

	<!----------------------- end edit modal --------------------------------------------->