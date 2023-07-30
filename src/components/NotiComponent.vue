<template>
  <LayoutComponent>
    <div class="" >
      <div class="m-2 p-2">
        <div class="container">
          <div class="noti-card">
            <div class="d-flex p-2">
              <div class="parent-profile-card">
                <img
                  src="https://i.quotev.com/62m3azvpaaaa.jpg"
                  class="rounded-circle profile-pic"
                />
              </div>
              <div class="ms-4 noti-msg-div">
                <p>  Someone liked  your post.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </LayoutComponent>
</template>

<script>
import LayoutComponent from "../components/LayoutComponent.vue";
// import { io } from 'socket.io-client';
// const socket = io('http://localhost:8000');
export default {
  name: "NotiComponent",
  components: {
    LayoutComponent,
  },
  data() {
    return {
      notifications:[]
    };
  },
  methods: {
    name() {},
  },
  mounted() {
   
  },
};
</script>

<style scoped>
.noti-card {
  width: 100%;
  height: 100%;
  margin: auto;
  border: 1px solid #3d3d3d;
  background-color: rgba(48, 48, 48, 0.911);
}

.profile-pic {
  width: 100px;
  height: 100px;
  /* width: 50%; */
  /* height: 80%;  */
}
</style>
