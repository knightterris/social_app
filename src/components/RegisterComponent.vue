<template>
  <div class="container">
    <div class="login-card center p-3">
      <h3 class="text-center text-info">Register</h3>
      <hr class="text-info" />

      <label for="name" class="form-label my-2 text-info">Name</label>
      <div class="input-container">
        <i class="bx bx-user input-icon text-info"></i>
        <input
          type="text"
          id="name"
          v-model="userData.name"
          class="form-control bg-dark text-white input-field"
          :class="{ 'border border-danger': this.errorMsgStatus }"
          placeholder="Enter your Username"
        />
      </div>
      <small class="text-danger" v-if="this.errorMsgStatus"
        >This field cannot be empty.</small
      ><br />

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
          :type="showPasswords ? 'text' : 'password'"
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

      <label for="confirm-password" class="form-label my-2 text-info"
        >Confirm Password</label
      >
      <div class="input-container">
        <i class="bx bxs-key input-icon text-info"></i>
        <input
          :type="showPasswords ? 'text' : 'password'"
          id="confirm-password"
          v-model="userData.confirm_password"
          class="form-control bg-dark text-white input-field"
          :class="{ 'border border-danger': this.errorMsgStatus }"
          placeholder="Enter your Confirm Password"
        />
      </div>
      <small class="text-danger" v-if="this.errorMsgStatus"
        >This field cannot be empty.</small
      ><br />

      <div class="d-flex justify-content-start">
        <input
          type="checkbox"
          class="checkbox"
          id="showpasswords"
          v-model="showPasswords"
        />
        <label class="ms-3 text-info" for="showpasswords">Show Passwords</label>
      </div>

      <div class="d-flex justify-content-center my-3">
        <button class="btn btn-login" @click="register">Sign Up</button>
      </div>

      <div class="text-center my-3 text-info fw-bold">
        <p>
          Already have an account?
          <router-link to="/" class="text-info">Login!</router-link>
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
  name: "RegisterComponent",
  data() {
    return {
      userData: {
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      errorMsgStatus: false,
      showPasswords: false,
    };
  },
  methods: {
    register() {
      if (
        this.userData.name == "" &&
        this.userData.email == "" &&
        this.userData.password == "" &&
        this.userData.confirm_password == ""
      ) {
        this.errorMsgStatus = true;
      } else {
        axios.post(`${api}/register`, this.userData).then((res) => {
          // console.log(res.data);
          if (res.status == 200) {
            this.$router.push("/");
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "success",
              title: "Registration is successful.",
            });
          }
        });
      }
    },
  },
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
.checkbox {
  width: 20px;
  height: 20px;
  /* border-radius: 50%; */
}

.center {
  width: 50%;
  margin: auto;
  border: 2px solid #00aaff;
  border-radius: 20px;
  padding: 10px;
  background-color: #00000000;
  box-shadow: 2px 3px rgb(0, 156, 240);
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
