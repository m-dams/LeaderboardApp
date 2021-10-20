<template>
  <main class="form-signin">
      <form>
        <h2 class="header">Please sign in</h2>

        <div class="form-group">
           <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email">

            <label for="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password">
        </div>

        <div class="checkbox">
          <label
            ><input type="checkbox" value="remember-me" /> Remember me</label>
        </div>
        <input type="submit" value="Submit" />
        <div>
          <router-link class="forgot-password-link" type="submit" to="/signup"
            >Forgot password?</router-link>
        </div>
        <div>
          <router-link class="sign-in-link" type="submit" to="/signup"
            >Don't have an account? Sign up</router-link>
        </div>
      </form>
  </main>
</template>

<script>
export default {
  name: "LoginForm",
};
</script>

<style scoped>
.form-signin {
  width: 50%;
  padding-top: 30px;
  padding-bottom: 60px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  background-color: #f6f9f6;
}
input[type="email"],input[type="password"]{
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type="submit"] {
  width: 20%;
  background-color: #42b983;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border-radius: 2px;
  cursor: pointer;
}

label{
  display: block;
  position: relative;
}

</style>

