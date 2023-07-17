<template>
  <div class="">
    <LayoutComponent>
      <div class="container" v-for="(post, index) in posts" :key="index">
        <div class="m-3 p-1">
          <div class="post-card">
            <!-- heading -->
            <div class="d-flex align-items-center p-2">
              <div class="img-div">
                <img
                  :src="getProfileUrl(post.creator[0].image)"
                  class="rounded-circle w-100 h-100 object-fit-fill"
                />
              </div>
              <div class="ms-4 name-div">
                <p class="text-white mt-3">
                  {{ post.creator[0].name }} | {{ post.creator[0].email }}
                </p>
                <p class="text-white">{{ formatCreatedAt(post.createdAt) }}</p>
                <!-- <p class="text-white">2 Hours Ago</p> -->
              </div>
              <div class="ms-auto dropdown">
                <i
                  class="bx bx-dots-horizontal-rounded text-white"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                ></i>
                <ul class="dropdown-menu">
                  <li>
                    <p
                      class="dropdown-item"
                      v-if="post.creatorEmail == user.email"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      @click="selectedPost = post"
                    >
                      Edit
                    </p>
                  </li>

                  <li>
                    <p
                      class="dropdown-item"
                      v-if="post.creatorEmail == user.email"
                      @click="deletePost(post._id)"
                    >
                      Delete
                    </p>
                  </li>

                  <li>
                    <router-link class="dropdown-item" to="#">Save</router-link>
                  </li>
                </ul>
              </div>
            </div>
            <!-- linebreak -->
            <div class="p-1">
              <hr class="text-white" />
            </div>
            <!-- content -->
            <div class="content">
              <div class="content-img p-2">
                <img
                  :src="getImageUrl(post.image)"
                  class="w-100 h-100 object-fit-contain"
                />
              </div>
              <div class="p-1">
                <hr class="text-white" />
              </div>
              <div class="content-body p-2">
                <p class="text-white">
                  {{ post.caption }}
                </p>
              </div>
              <div class="content-actions">
                <ul class="d-flex list-unstyled actions-div">
                  <li
                    class="w-100 d-flex align-items-center justify-content-center border border-info border-top-0 border-start-0 border-bottom-0 p-2"
                  >
                    <i class="bx bxs-heart-circle text-info"></i>
                    <span class="action-text text-info">100Likes</span>
                  </li>
                  <li
                    class="w-100 d-flex align-items-center justify-content-center border border-info border-top-0 border-start-0 border-bottom-0 p-2"
                  >
                    <i class="bx bxs-comment-dots text-info"></i>
                    <span class="action-text text-info">100Chats</span>
                  </li>
                  <li
                    class="w-100 d-flex align-items-center justify-content-center p-2"
                  >
                    <i class="bx bx-repost text-info"></i>
                    <span class="action-text text-info">100Reposts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutComponent>

    <!-- modal -->
    <!-- Modal -->
    <div class="modal fade5" id="staticBackdrop">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="staticBackdropLabel">
              Edit your post
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div v-if="selectedPost">
              <div class="d-flex align-items-center p-2">
                <div class="img-div">
                  <img
                    src="https://i.quotev.com/62m3azvpaaaa.jpg"
                    class="rounded-circle w-100 h-100 object-fit-fill"
                  />
                </div>
                <div class="ms-4 name-div">
                  <p class="text-dark mt-3">{{ selectedPost.creator }}</p>
                </div>
              </div>
              <input
                type="text"
                class="form-control"
                v-model="selectedPost.caption"
              />
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
              <div class="content-img p-2">
                <img
                  :src="getImageUrl(selectedPost.image)"
                  class="w-100 h-100 object-fit-contain"
                />
              </div>
              <!-- Display other properties of the selected post -->
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="updatePost(selectedPost._id)"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
const api = "http://localhost:8000";
import LayoutComponent from "../components/LayoutComponent.vue";
export default {
  name: "IndexComponent",
  components: {
    LayoutComponent,
  },
  data() {
    return {
      user: {
        email: "",
      },
      posts: [],
      editBtnStatus: "",
      selectedPost: null,
      previewImageStatus: false,
      newImage: null,
    };
  },
  methods: {
    getImageUrl(filename) {
      return `${api}/uploads/${filename}`;
    },
    getProfileUrl(filename) {
      return `${api}/pfp/${filename}`;
    },
    handleImageSelect(event) {
      const file = event.target.files[0];
      this.newImage = file;

      const reader = new FileReader();

      reader.onload = (event) => {
        this.$refs.imagePreview.src = event.target.result;
      };

      if (file) {
        reader.readAsDataURL(file);
        this.previewImageStatus = true;
      }
    },
    updatePost(id) {
      const postId = id;
      const file = this.newImage;
      var formData = new FormData();
      formData.append("uploadType", "postUpdatePicture");
      formData.append("post_id", postId);
      formData.append("new_caption", this.selectedPost.caption);
      formData.append("new_image", file);
      formData.append("updated_at", new Date());
      axios.put(`${api}/update/post`, formData).then((res) => {
        // console.log(res.data);
        if (res.status == 200) {
          axios.get(`${api}/get/posts`).then((res) => {
            this.posts = res.data;
          });

          this.$router.push("/index");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });

          Toast.fire({
            icon: "success",
            title: "Post updated",
          });
        }
      });
    },
    deletePost(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // alert(id);
          axios
            .delete(`${api}/delete/post/${id}`)
            .then((res) => {
              if (res.status == 200) {
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                });

                Toast.fire({
                  icon: "success",
                  title: "Post deleted",
                });
                axios.get(`${api}/get/posts`).then((res) => {
                  this.posts = res.data;
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },
    //for human better looking time
    formatCreatedAt(createdAt) {
      const postCreatedAt = moment(createdAt, "ddd MMM DD YYYY HH:mm:ss");
      const now = moment();
      const diffInDays = now.diff(postCreatedAt, "days");
      const diffInHours = now.diff(postCreatedAt, "hours");
      const diffInMinutes = now.diff(postCreatedAt, "minutes");

      if (diffInDays > 0) {
        return `${diffInDays} days ago`;
      } else if (diffInHours > 0) {
        return `${diffInHours} hours ago`;
      } else {
        return `${diffInMinutes} minutes ago`;
      }
    },
  },
  computed: {
    // sortedPosts() {
    //   // to show the latest post
    //   return this.posts.slice().reverse();
    // },
  },
  mounted() {
    const userData = JSON.parse(localStorage.getItem("user"));
    // console.log(userData);
    const login_email = userData.email;
    this.user.email = login_email;
    axios.get(`${api}/get/posts`).then((res) => {
      // console.log(res.data);
      this.posts = res.data;
    });
  },
};
</script>

<style scoped>
.post-card {
  width: 100%;
  height: 100%;
  margin: auto;
  border: 1px solid #3d3d3d;
  background-color: rgba(48, 48, 48, 0.911);
}
.img-div {
  width: 60px;
  height: 60px;
}
.name-div {
  line-height: 1;
}
.content-img {
  width: 100%;
  height: 350px;
}
.actions-div {
  justify-content: space-around;
  align-items: center;
}
.action-text {
  /* max-width: 0px; Adjust the width as needed */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content-actions ul li {
  background-color: #585858;
}
.bx-dots-horizontal-rounded {
  cursor: pointer;
  font-size: 20px;
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
  width: 100%;
  /* height: ; */
  object-fit: contain;
}
</style>
