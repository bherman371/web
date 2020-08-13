<template>
  <div class="form--login-logout">
			<form class="form-inline">
				<div class="form-group">
					<input class="form-control form-control-sm" type="text" placeholder="Username" value="" required>
				</div>
				<div class="form-group">
					<input class="form-control form-control-sm" type="password" placeholder="Password" value="" required>
				</div>
				<button class="btn btn-primary btn-md-2">Login</button>
			</form>
			<a href="#" class="btn btn-primary btn-md-2 login-btn-responsive" data-toggle="modal" data-target="#registration-login-form-popup">Login</a>
		</div>
</template>

<script>
export default {
  name: "LoginForm"
}
</script>

<style>

</style>