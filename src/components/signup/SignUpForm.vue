<template>
  <main class="form-signup">
    <form>
      <h2 class="header">Please sign in</h2>

      <div class="form-group">
        <label>Nickname</label>
        <input type="text" id="nickname-input" placeholder="Nickname" />
        <label>Email address</label>
        <input type="email" id="email-input" placeholder="Email address" />
        <label>Password</label>
        <input type="password" id="password-input" placeholder="Password" />
      </div>
      <button class="submit-button" @click.prevent="signup()">Submit</button>
      <div>
        <router-link class="forgot-password-link" type="submit" to="/signup"
          >Forgot password?</router-link
        >
      </div>
      <div>
        <router-link class="sign-in-link" type="submit" to="/login"
          >Already have an account? Sign in</router-link
        >
      </div>
    </form>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpForm",
  data() {
    return {
      nickname: "",
      username: "",
      password: "",
      error: null,
      success: false,
    };
  },
  methods: {
    signup: async function () {
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      // // At request level
      // const agent = new https.Agent({
      //   rejectUnauthorized: false
      // });
      const nickname = document.getElementById("nickname-input").value;
      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;
      const url = "http://localhost:8080/auth/register";
      this.success = false;
      this.error = null;
      const res = await axios.post(url, {
        nickname,
        email,
        password,
      });
      console.log(res.data);
    },
  },
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
.submit-button {
  width: 20%;
  background-color: #42b983;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border-radius: 2px;
  cursor: pointer;
}

label {
  display: block;
  position: relative;
}
</style>
