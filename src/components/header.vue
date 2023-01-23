<template>
  <div>
    <div id="header">
      <div class="brand">
        <h1>Todo app</h1>
      </div>
      <div class="nav-links" style="display: flex; flex-direction: row;">
        <div style="display: flex; align-items: center; margin-right: 20px">
          <ul>
            <li><router-link to="/" exact>about</router-link></li>
            <li><router-link to="/todo" exact>to-do list</router-link></li>
          </ul>
        </div>
        <div
          style="margin-left: 10px; cursor: pointer;"
          @click="popup = !popup"
          v-if="is_admin"
        >
          <h4 style="font-size: 20px; color: #FC7300;">Create Admin</h4>
        </div>
        <i class="logout-container" @click="logout">
          <font-awesome-icon
            icon="fa-solid fa-right-from-bracket"
          ></font-awesome-icon>
          <h4 style="margin-left: 5px">Logout</h4>
        </i>
      </div>
    </div>
    <div
      v-if="popup"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 50px 50px 60px 50px; background-color: #00425A; border-radius: 10px;"
    >
      <h2 style="text-align: center; color: #BFDB38">Add admin</h2>
      <div style="display: flex; flex-direction: column;">
        <input type="text" v-model="name" placeholder="Name" class="input" />
        <input type="email" v-model="email" placeholder="Email" class="input" />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="input"
        />
        <div @click="" class="icon-holder">
          <button class="add-button" @click="addAdmin">Add Admin</button>
          <button
            class="add-button"
            style="background: #8a1f1f"
            @click="popup = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="pop"
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 50px 50px 60px 50px; background-color: #00425A; border-radius: 10px;"
    >
      <h2 style="text-align: center; color: #BFDB38">{{ this.message }}</h2>

      <div @click="" class="icon-holder">
        <button class="add-button" @click="pop = false">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      popup: false,
      message: "",
      is_admin: false,
      message: "",
      pop: false
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    logout: function() {
      console.log("clicked");
      localStorage.removeItem("token");
      this.$router.push({ name: "Login" });
    },
    getUser: function() {
      fetch("http://localhost:3000/api/getuser", {
        method: "get",
        headers: {
          Accept: "application/json",
          token: localStorage.getItem("token")
        }
      })
        .then(response => response.json())
        .then(data => {
          this.is_admin = data.is_admin;
        });
    },

    addAdmin: function() {
      this.$http
        .post("http://localhost:3000/auth/createadmin", {
          name: this.name,
          email: this.email,
          password: this.password,
          is_admin: true
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.pop = true;
            this.message = data.message;
          } else {
            this.pop = true;
            this.message = data.message;
          }
          this.popup = false;
        });
    }
  }
};
</script>

<style scoped>
#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.icon-holder {
  text-align: center;
}
.logout-container {
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 18px;
  border-radius: 25px;
  background-color: #fc7300;
  padding: 0px 27px;
  height: 50px;
  color: white;
  align-self: center;
  cursor: pointer;
}
.input {
  display: flex;
  width: 300px;
  height: 40px;
  border-radius: 5px;
  padding: 2px 10px;
  margin-bottom: 20px;
}
ul {
  list-style: none;
  display: flex;
  flex-direction: row;
}
ul li {
  margin-left: 50px;
}
a {
  font-size: 20px;
  text-decoration: none;
}
.add-button {
  background: #1f8a70;
  border: 1px solid #1f8a70;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 40px;
  outline: 0;
  padding: 12px 14px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}
</style>
