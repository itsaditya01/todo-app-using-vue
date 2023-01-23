<template>
  <div id="login-main">
    <!-- <h1 style="color: #2f3d49; top: 10px; left: 50px">
      Todo App
    </h1> -->
    <div class="form-structor">
      <div class="signup" v-bind:class="{ slideup: slide_down }">
        <h2 class="form-title" id="signup" @click="slideDown">
          <span>or</span>Sign up
        </h2>
        <div class="form-holder">
          <input type="text" class="input" placeholder="Name" v-model="sname" />
          <input
            type="email"
            class="input"
            placeholder="Email"
            v-model="semail"
          />
          <input
            type="password"
            class="input"
            placeholder="Password"
            v-model="spassword"
          />
          <input
            type="password"
            class="input"
            placeholder="Confirm Password"
            v-model="spassword2"
          />
        </div>
        <button class="submit-btn" @click="signupUser">Sign up</button>
      </div>
      <div class="login" v-bind:class="{ slideup: slide_up }">
        <div class="center">
          <h2 class="form-title" id="login" @click="slideUp">
            <span>or</span>Log in
          </h2>
          <div class="form-holder">
            <input
              type="email"
              class="input"
              placeholder="Email"
              v-model="email"
            />
            <input
              type="password"
              class="input"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <div v-if="this.error" style="margin-top: 10px; margin-left: 10px">
            {{ this.message }}
          </div>

          <button class="submit-btn" @click="loginUser">Log in</button>
        </div>
      </div>
    </div>
    <!-- <div style="position: absolute; top: 0; color: black; left: 0;">
      {{ sname }}
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      password: "",
      sname: "",
      spassword: "",
      semail: "",
      spassword2: "",
      slide_up: true,
      slide_down: false,
      message: "",
      error: false
    };
  },
  methods: {
    slideUp: function() {
      // console.log(slide_up);
      if (!this.slide_up) {
        this.slide_up = true;
      } else {
        this.slide_down = true;
        this.slide_up = false;
      }
    },
    slideDown: function() {
      if (!this.slide_down) {
        this.slide_down = true;
      } else {
        this.slide_up = true;
        this.slide_down = false;
      }
    },
    loginUser: function() {
      this.$http
        .post("http://localhost:3000/auth/login", {
          email: this.email,
          password: this.password
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            this.$router.push({ name: "Home" });
          } else {
            this.error = true;
            this.message = data.message;
          }
        });
    },
    signupUser: function() {
      this.$http
        .post("http://localhost:3000/auth/signup", {
          name: this.sname,
          email: this.semail,
          password: this.spassword,
          password2: this.spassword2,
          is_admin: false
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem("token", data.token);
            this.$router.push({ name: "Home" });
          } else {
            alert(data.message);
          }
        });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans");
#login-main {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  /* background-color: #46687a; */
  /* flex-direction: column; */
}
html,
body {
  position: relative;
  min-height: 100vh;
  background-color: #e1e8ee;
  /* display: flex; */
  align-items: center;
  justify-content: center;
  font-family: "Fira Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.form-structor {
  background-color: #222;
  border-radius: 15px;
  height: 550px;
  width: 350px;
  position: relative;
  box-shadow: 0 8px 8px -4px lightblue;
  overflow: hidden;
}
.form-structor::after {
  content: "";
  opacity: 0.8;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  background-position: left bottom;
  background-size: 500px;
  background-image: url("https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf884ad570b50659c5fa2dc2cfb20ecf&auto=format&fit=crop&w=1000&q=100");
}
.form-structor .signup {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup.slideup {
  top: 5%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup.slideup .form-holder,
.form-structor .signup.slideup .submit-btn {
  opacity: 0;
  visibility: hidden;
}
.form-structor .signup.slideup .form-title {
  font-size: 1em;
  cursor: pointer;
  color: black !important;
}
.form-structor .signup.slideup .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-title {
  color: #fff;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .signup .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-holder {
  border-radius: 15px;
  background-color: #fff;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
}
.form-structor .signup .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .signup .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .signup .submit-btn {
  background-color: rgba(0, 0, 0, 0.4);
  color: rgba(256, 256, 256, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .signup .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.8);
}
.form-structor .login {
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -20px;
  -webkit-transform: translate(-50%, 0);
  background-color: #fff;
  width: 200%;
  height: 250px;
  border-radius: 50%;
  z-index: 4;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center {
  position: absolute;
  top: calc(50% - 10%);
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  width: 65%;
  z-index: 5;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-title {
  color: #000;
  font-size: 1.7em;
  text-align: center;
}
.form-structor .login .center .form-title span {
  color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-holder {
  border-radius: 15px;
  background-color: #fff;
  border: 1px solid #eee;
  overflow: hidden;
  margin-top: 50px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .form-holder .input {
  border: 0;
  outline: none;
  box-shadow: none;
  display: block;
  height: 30px;
  line-height: 30px;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  font-size: 12px;
}
.form-structor .login .center .form-holder .input:last-child {
  border-bottom: 0;
}
.form-structor .login .center .form-holder .input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.4);
}
.form-structor .login .center .submit-btn {
  background-color: #6b92a4;
  color: rgba(256, 256, 256, 0.7);
  border: 0;
  border-radius: 15px;
  display: block;
  margin: 15px auto;
  padding: 15px 45px;
  width: 100%;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login .center .submit-btn:hover {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.8);
}
.form-structor .login.slideup {
  top: 90%;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slideup .center {
  top: 10%;
  -webkit-transform: translate(-50%, 0%);
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slideup .form-holder,
.form-structor .login.slideup .submit-btn {
  opacity: 0;
  visibility: hidden;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slideup .form-title {
  font-size: 1em;
  margin: 0;
  padding: 0;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
}
.form-structor .login.slideup .form-title span {
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  -webkit-transition: all 0.3s ease;
}
</style>
