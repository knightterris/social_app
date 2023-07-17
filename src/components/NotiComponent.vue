<template>
  <LayoutComponent>
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
              <p class="text-white mt-3">
                JennyRubyJane commented on your post.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-2 p-2">
      <div class="container">
        <div class="noti-card">
          <div class="d-flex p-2">
            <div class="parent-profile-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpIMgfm1-6TyGC6l49fiRWeHPraX5YYdiTpw&usqp=CAU"
                class="rounded-circle profile-pic"
              />
            </div>
            <div class="ms-4 noti-msg-div">
              <p class="text-white mt-3">roses_are_rosie loved your post.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-2 p-2">
      <div class="container">
        <div class="noti-card">
          <div class="d-flex p-2">
            <div class="parent-profile-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpWSTZ9f3KMGEaGP3ci9idPAqnMwy86HqgGM_Uv_zLh7OpOJP7vZ3S2CmFTWaVS4QD6eo&usqp=CAU"
                class="rounded-circle profile-pic"
              />
            </div>
            <div class="ms-4 noti-msg-div">
              <p class="text-white mt-3">sooyaa__ reposted your post.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="m-2 p-2">
      <div class="container">
        <div class="noti-card">
          <div class="d-flex p-2">
            <div class="parent-profile-card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLzzIxrTPHWJZibS3PpUzqaPdulWKT22IT2Q&usqp=CAU"
                class="rounded-circle profile-pic"
              />
            </div>
            <div class="ms-4 noti-msg-div">
              <p class="text-white mt-3">
                Lisa loved and commented on your post.
              </p>
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
  name: "NotiComponent",
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
