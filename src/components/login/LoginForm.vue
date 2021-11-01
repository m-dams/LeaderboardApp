<template>
  <main class="form-signin">
    <form>
      <h2 class="header">Please sign in</h2>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email-input" name="email" placeholder="Email" />

        <label for="password">Password</label>
        <input
          type="password"
          id="password-input"
          name="password"
          placeholder="Password"
        />
      </div>

      <div class="checkbox">
        <label><input type="checkbox" value="remember-me" /> Remember me</label>
      </div>
      <div v-if="error">
        {{ error }}
      </div>
      <div v-if="success" id="success">Logged in Successfully</div>
      <button class="submit-button" @click.prevent="sign_in()">Submit</button>
      <div>
        <router-link class="forgot-password-link" type="submit" to="/signup"
          >Forgot password?</router-link
        >
      </div>
      <div>
        <router-link class="sign-in-link" type="submit" to="/signup"
          >Don't have an account? Sign up</router-link
        >
      </div>
    </form>
  </main>
</template>

<script>
import axios from "axios";
import router from "../../router";
export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      error: null,
      success: false,
    };
  },
  methods: {
    sign_in: async function () {
      // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      // // At request level
      // const agent = new https.Agent({
      //   rejectUnauthorized: false
      // });
      const email = document.getElementById("email-input").value;
      const password = document.getElementById("password-input").value;
      const url = "http://localhost:8080/auth/login";
      this.success = false;
      this.error = null;
      try {
        const res = await axios
          .post(url, {
            email,
            password,
          })
          .then((response) => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
          });
        this.success = true;
        console.log(res.data);
      } catch (error) {
        {
          this.error = error.message;
          if (error.response) {
            // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // no response
            console.log(error.request);
            // instance of XMLHttpRequest in the browser
            // instance ofhttp.ClientRequest in node.js
          } else {
            // Something wrong in setting up the request
            console.log("Error", error.message);
          }
          console.log(error.config);
        }
      }

      router.push("Leaderboard");
    },
    logout() {
      localStorage.removeItem("user");
    },
  },
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
input[type="email"],
input[type="password"] {
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
