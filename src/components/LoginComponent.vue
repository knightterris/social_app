<template>
  <div class="container">
    <div class="login-card center p-3">
      <h3 class="text-center text-info">Login</h3>
      <hr class="text-info" />

      <label for="email" class="form-label my-2 text-info">Email</label>
      <div class="input-container">
        <i class="bx bx-envelope input-icon text-info"></i>
        <input
          type="text"
          id="email"
          v-model="userData.email"
          class="form-control bg-dark text-white input-field"
          :class="{ 'border border-danger': this.errorMsgStatus }"
          placeholder="Enter your Email"
        />
      </div>
      <small class="text-danger" v-if="this.errorMsgStatus"
        >This field cannot be empty.</small
      ><br />

      <label for="password" class="form-label my-2 text-info">Password</label>
      <div class="input-container">
        <i class="bx bxs-key input-icon text-info"></i>
        <input
          type="password"
          id="password"
          v-model="userData.password"
          class="form-control bg-dark text-white input-field"
          :class="{ 'border border-danger': this.errorMsgStatus }"
          placeholder="Enter your Password"
        />
      </div>
      <small class="text-danger" v-if="this.errorMsgStatus"
        >This field cannot be empty.</small
      ><br />

      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-login" @click="login()">Login</button>
      </div>

      <div class="text-center my-3 text-info fw-bold">
        <p>
          Don't have an account?
          <router-link to="/register" class="text-info">Sign up!</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
const api = "http://localhost:8000";
export default {
  name: "LoginComponent",
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      errorMsgStatus: false,
    };
  },
  methods: {
    login() {
      if (this.userData.email == "" && this.userData.password == "") {
        this.errorMsgStatus = true;
      } else {
        axios
          .post(`${api}/login`, this.userData)
          .then((res) => {
            // console.log(res.status);
            // console.log(res.data.token);
            if (res.status == 200) {
              this.$router.push("/index");
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: false,
              });

              Toast.fire({
                icon: "success",
                title: "Login is successful.",
              });
              localStorage.setItem("token", res.data.token);
              this.$store.dispatch('saveUserData',res.data.user);
              // localStorage.setItem("user", JSON.stringify(res.data.user));
            }
          })
          .catch((error) => {
            console.error(error.response.status);
            if (error.response.status == 400) {
              this.$router.push("/");
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: false,
              });

              Toast.fire({
                icon: "error",
                title: "Something went wrong!",
              });
            }
          });
      }
    },
  },
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.center {
  width: 50%;
  margin: auto;
  border: 2px solid #000000;
  border-radius: 20px;
  padding: 10px;
  background-color: #00000000;
  box-shadow: 2px 3px rgb(0, 0, 0);
}
.btn-login {
  border: 2px solid #000000;
  background-color: rgb(62, 232, 255);
  box-shadow: 2px 4px rgb(0, 0, 0);
  text-shadow: 1px 1.1px #000000;
  font-weight: bold;
}
::placeholder {
  color: rgb(62, 232, 255);
  /* opacity: 1; Firefox */
}
.input-container {
  position: relative;
}

.input-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.input-field {
  padding-right: 40px; /* Increase padding to create space */
  width: 100%;
  box-shadow: 3px 4px rgb(0, 0, 0);
  text-shadow: 2px 2.1px #000000;
}

/* Media Queries for responsive layout */
@media screen and (max-width: 768px) {
  .input-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }

  .input-field {
    padding-right: 10px; /* Adjust padding for smaller screens */
  }
}

@media screen and (max-width: 425px), (max-width: 375px) {
  .center {
    width: 100% !important;
  }
}
</style>
