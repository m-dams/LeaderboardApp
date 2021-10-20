<template>
  <main class="form-signup">
      <form>
        <h2 class="header">Please sign in</h2>

        <div class="form-group">
           <label>First Name</label>
           <input type="text" class="form-control form-control-lg" placeholder="First name"/>
            <label>Last Name</label>
            <input type="text" class="form-control form-control-lg" placeholder="Last name"/>
             <label>Email address</label>
            <input type="email" class="form-control form-control-lg" placeholder="Email address" />
            <label>Password</label>
            <input type="password" class="form-control form-control-lg" placeholder="Password"/>
        </div>

       
        <input type="submit" value="Submit" />
        <div>
          <router-link class="forgot-password-link" type="submit" to="/signup"
            >Forgot password?</router-link>
        </div>
        <div>
          <router-link class="sign-in-link" type="submit" to="/signup"
            >Already have an account? Sign in</router-link>
        </div>
      </form>
  </main>
</template>

<script>
export default {
  name: "SignUpForm",
};
</script>

<style scoped>
.form-signup {
  width: 50%;
  padding-top: 30px;
  padding-bottom: 60px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  background-color: #f6f9f6;
}
input {
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

