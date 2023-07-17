<template>
  <div class="parent-top-nav bg-dark sticky-top">
    <div
      class="bg-dark border border-info border-start-0 border-end-0 border-top-0"
    >
      <ul class="d-flex justify-content-evenly p-0 mt-3 p-1">
        <router-link
          to="/index"
          class="text-decoration-none list-unstyled text-info mt-2"
        >
          <li>
            <i class="bx bxs-network-chart nav-icon"></i>
          </li>
        </router-link>

        <div class="form-group d-flex justify-content-between search-div">
          <input
            v-model="searchInput"
            v-on:keyup.enter="showAlert()"
            type="text"
            class="form-control"
          />
          <i
            class="bx bx-search-alt text-info nav-icon"
            @click="showAlert()"
          ></i>
        </div>

        <router-link
          to="/message"
          class="text-decoration-none list-unstyled text-info mt-2"
        >
          <li>
            <i class="bx bxs-chat nav-icon"></i>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
  <div class="parent-bottom-nav">
    <div
      class="bottom-nav bg-dark border border-info border-start-0 border-end-0 border-bottom-0"
    >
      <ul class="d-flex justify-content-evenly p-0 mt-3">
        <router-link
          to="/index"
          class="text-decoration-none list-unstyled text-info"
        >
          <li>
            <i class="bx bxs-home-circle nav-icon"></i>
          </li>
        </router-link>

        <router-link
          to="/friend"
          class="text-decoration-none list-unstyled text-info"
        >
          <li>
            <i class="bx bxs-user-pin nav-icon"></i>
          </li>
        </router-link>
        <router-link
          to="/profile"
          class="text-decoration-none list-unstyled text-info"
        >
          <li>
            <i class="bx bxs-user nav-icon"></i>
          </li>
        </router-link>
        <router-link
          to="/noti"
          class="text-decoration-none list-unstyled text-info"
        >
          <li>
            <i class="bx bxs-bell nav-icon"></i>
          </li>
        </router-link>
      </ul>
    </div>
  </div>

  <router-link to="/post" v-if="!postIconStatus" class="float">
    <i class="bx bxs-network-chart my-float"></i>
  </router-link>
  <slot></slot>
</template>

<script>
export default {
  name: "LayoutComponent",
  data() {
    return {
      searchInput: "",
      postIconStatus: "",
    };
  },

  methods: {
    showAlert() {
      alert(this.searchInput);
    },
  },
  mounted() {
    if (this.$route.name == "post") {
      this.postIconStatus = true;
    } else {
      this.postIconStatus = false;
    }
  },
};
</script>

<style scoped>
.bottom-nav {
  /* box-shadow: 5px 9px 2px 5px rgb(35, 190, 224); */
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
}
.nav-icon {
  font-size: 28px;
}
.search-div {
  position: relative;
}
.bx-search-alt {
  position: absolute;
  top: 20%;
  left: 85%;
  background-color: white;
}
.bx-search-alt:hover {
  cursor: pointer;
}
.float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 85px;
  right: 35px;
  background-color: #48474722;
  color: #fff;
  border-radius: 50px;
  border: 1px solid #17a2b8;
  text-align: center;
  box-shadow: 1px 1px rgb(35, 190, 224);
}

.my-float {
  margin-top: 10px;
  font-size: 40px;
}
</style>
