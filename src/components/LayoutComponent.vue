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
  <div id="bottom-nav" class="parent-bottom-nav">
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
            <i class="bx bxs-bell nav-icon position-relative">
              <span style="font-size: 12px;"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              >
                {{unreadCount}}
              </span>
            </i>
          </li>
        </router-link>
      </ul>
    </div>
  </div>

  <router-link to="/post" v-if="!postIconStatus" class="float" id="my-float">
    <i class="bx bxs-network-chart my-float" ></i>
  </router-link>
  <slot></slot>
  <!-- <SearchComponent :searchResult="searchResult" /> -->
</template>

<script>
import axios from "axios";
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:8000');
// import SearchComponent from '../components/SearchComponent.vue';
const api = "http://localhost:8000";
export default {
  name: "LayoutComponent",
  data() {
    return {
      searchInput: "",
      postIconStatus: "",
      searchResult:"",
      unreadCount:0,
    };
  },
  components: {
    // SearchComponent,
  },
  computed: {
    
  },

  methods: {
    showAlert() {
      const search_input = this.searchInput;
        axios.post(`${api}/search/data`, { search_input }).then((res) => {
          const result = res.data;
          if(!result){
            console.log("No data found");
          }else{
            this.$store.dispatch('saveSearchResult', result);
            this.$router.push('/search');
          }
        });
    },
      
  },
  mounted() {

    if (this.$route.name == "post") {
      this.postIconStatus = true;
    } else {
      this.postIconStatus = false;
    }
    // JavaScript
    let scrollTimeout;

    // Function to show the navigation and reset the timeout
    function showNavigation() {
      const navigation = document.getElementById('bottom-nav');
      const floatIcon = document.getElementById('my-float');
      navigation.style.display = 'block';
      floatIcon.style.bottom = '85px';

      clearTimeout(scrollTimeout);

      // Hide the navigation after 2 seconds of inactivity
      scrollTimeout = setTimeout(() => {
        navigation.style.display = 'none';
        floatIcon.style.bottom = '5px';
      }, 2000);
    }

    // Add an event listener to the scrollable element (e.g., window)
    window.addEventListener('scroll', showNavigation);

  },
};
</script>

<style scoped>
.bottom-nav {
  /* box-shadow: 5px 9px 2px 5px rgb(35, 190, 224); */
  position: fixed;
  z-index: 9999;
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
  z-index: 99;
  width: 50px;
  height: 50px;
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
  margin-top: 12px;
  font-size: 25px;
}
</style>
