<template>
  <LayoutComponent>
    <div class="container p-3">
      <div class="d-flex bg-dark align-items-center p-2">
        <div class="img-div">
          <img
            :src="getImageUrl(this.userData.image)"
            class="rounded-circle w-100 h-100 object-fit-fill"
          />
        </div>
        <div class="ms-4 name-div">
          <p class="text-white mt-3">{{ userData.name }}</p>
        </div>
        <div class="ms-auto">
          <i class="bx bxs-share-alt text-white" @click="createPost()"></i>
        </div>
      </div>
      <div class="post-caption-div">
        <textarea
          placeholder="What's on your mind"
          v-model="postData.caption"
          cols="30"
          rows="10"
          class="form-control"
        ></textarea>
      </div>
      <!-- add image  -->
      <div class="d-flex justify-content-end mt-2 bg-dark">
        <label for="imageInput" class="file-input-label">
          <i class="bx bxs-camera text-white"></i>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            @change="handleImageSelect"
            class="d-none"
          />
        </label>
      </div>

      <!-- imagepreview -->
      <div class="d-flex justify-content-center">
        <img
          ref="imagePreview"
          id="imagePreview"
          src=""
          alt="Preview"
          v-if="previewImageStatus"
          class=""
        />
      </div>
    </div>
  </LayoutComponent>
</template>

<script>
import LayoutComponent from "../components/LayoutComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";

const api = "http://localhost:8000";

export default {
  name: "CreatePostComponent",
  components: {
    LayoutComponent,
  },
  data() {
    return {
      userData: {},
      postData: {
        caption: "",
        creator: this.$store.getters.getUserData.name,
        creator_mail: this.$store.getters.getUserData.email,
        created_at: new Date(),
        image: null,
      },
      previewImageStatus: false,
    };
  },
  computed: {},
  methods: {
    getImageUrl(filename) {
      return `${api}/pfp/${filename}`;
    },
    createPost() {
      var formData = new FormData();
      formData.append("uploadType", "postPicture");
      formData.append("post_caption", this.postData.caption);
      formData.append("post_creator", this.userData.name);
      formData.append("post_creator_email", this.userData.email);
      formData.append("post_created_at", this.postData.created_at);
      formData.append("post_image", this.postData.image);
      axios.post(`${api}/create/post`, formData).then(async (res) => {
        if (res.status === 200) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
          });

          Toast.fire({
            icon: "success",
            title: "Post created",
          });

          this.$router.push("/index");
        }
      });
    },
    handleImageSelect(event) {
      const file = event.target.files[0];
      this.postData.image = file;

      const reader = new FileReader();

      reader.onload = (event) => {
        this.$refs.imagePreview.src = event.target.result;
      };

      if (file) {
        reader.readAsDataURL(file);
        this.previewImageStatus = true;
      }
    },
  },
  mounted() {
    // this.userData = this.$store.getters.getUserData;
    // console.log(this.userData);
    // const user = this.$store.getters.getUserData;
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.name);
    this.userData.name = user.name;
    this.userData.email = user.email;
    this.userData.image = user.image;
  },
};
</script>

<style scoped>
.img-div {
  width: 60px;
  height: 60px;
}
.name-div {
  line-height: 1;
}
.bg-dark {
  background-color: rgba(48, 48, 48, 0.911) !important;
}
.bxs-share-alt {
  cursor: pointer;
  font-size: 20px;
}
.bxs-camera {
  font-size: 20px;
  cursor: pointer;
}
.file-input-container {
  display: inline-block;
  position: relative;
}

.file-input-label {
  display: inline-block;
  padding: 10px;
  background-color: #333;
  color: #fff;
  cursor: pointer;
}

.file-input-label i {
  margin-right: 5px;
}
#imagePreview {
  width: 700px;
  /* height: ; */
  object-fit: contain;
}
</style>
