<template>
  <LayoutComponent>
    <div class="m-2 p-2">
      <div class="container">
        <div class="friend-card">
          <div class="d-flex align-items-center p-2">
            <div class="parent-profile-card">
              <img
                src="https://i.quotev.com/62m3azvpaaaa.jpg"
                class="rounded-circle profile-pic"
              />
            </div>
            <div class="ms-4 name-div">
              <p class="text-white mt-3">JennyRubyJane</p>
            </div>
            <div class="ms-auto">
              <i class="bx bxs-user-plus text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-2 p-2">
      <div class="container">
        <div class="friend-card">
          <div class="d-flex align-items-center p-2">
            <div class="parent-profile-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpIMgfm1-6TyGC6l49fiRWeHPraX5YYdiTpw&usqp=CAU"
                class="rounded-circle profile-pic"
              />
            </div>
            <div class="ms-4 name-div">
              <p class="text-white mt-3">roses_are_rosie</p>
            </div>
            <div class="ms-auto">
              <i class="bx bxs-user-plus text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-2 p-2">
      <div class="container">
        <div class="friend-card">
          <div class="d-flex align-items-center p-2">
            <div class="parent-profile-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpWSTZ9f3KMGEaGP3ci9idPAqnMwy86HqgGM_Uv_zLh7OpOJP7vZ3S2CmFTWaVS4QD6eo&usqp=CAU"
                class="rounded-circle profile-pic"
              />
            </div>
            <div class="ms-4 name-div">
              <p class="text-white mt-3">sooyaa__</p>
            </div>
            <div class="ms-auto">
              <i class="bx bxs-user-plus text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-2 p-2">
      <div class="container">
        <div class="friend-card">
          <div class="d-flex align-items-center p-2">
            <div class="parent-profile-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzzIxrTPHWJZibS3PpUzqaPdulWKT22IT2Q&usqp=CAU"
                class="rounded-circle profile-pic"
              />
            </div>
            <div class="ms-4 name-div">
              <p class="text-white mt-3">lisa</p>
            </div>
            <div class="ms-auto">
              <i class="bx bxs-user-plus text-white"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LayoutComponent>
</template>

<script>
import LayoutComponent from "../components/LayoutComponent.vue";
export default {
  name: "FriendComponent",
  components: {
    LayoutComponent,
  },
  data() {
    return {};
  },
  methods: {
    name() {},
  },
  mounted() {},
};
</script>

<style scoped>
.friend-card {
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
.bxs-user-plus {
  font-size: 30px;
  cursor: pointer;
}
</style>
