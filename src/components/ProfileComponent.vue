<template>
  <LayoutComponent>
    <div class="bg-custom-grey w-100 profile-parent" style="height: 85px">
      <div class="profile-picture-div">
        <img :src="getImageUrl(this.profile_image)" class="profile-picture" />
        <div class="text-white user-name">{{ this.userData.name }}</div>
        <div class="text-white user-email">{{ this.userData.email }}</div>
        <div class="edit-profile-button">
          <div
            class="btn btn-custom rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Edit Profile
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="row">
                <div
                  class="col-lg-6 col-md-12 col-sm-12 text-white bio-details"
                >
                  111K Followers
                </div>
                <div
                  class="col-lg-6 col-md-12 col-sm-12 text-white bio-details"
                >
                  11 Following
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12">
              <div class="row">
                <div
                  class="col-lg-6 col-md-12 col-sm-12 text-white bio-details"
                >
                  {{ this.userData.user_location ? this.userData.user_location : '-' }}
                </div>
                <div
                  class="col-lg-6 col-md-12 col-sm-12 text-white bio-details"
                >
                {{ this.userData.user_bio ? this.userData.user_bio : '-' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="container container-2">
          <ul
            class="d-flex justify-content-evenly sections list-unstyled"
            id="myTab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <a
                class="nav-link active text-info"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="web"
                aria-selected="true"
                >Home</a
              >
            </li>

            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-info"
                id="likes-tab"
                data-bs-toggle="tab"
                data-bs-target="#likes"
                type="button"
                role="tab"
                aria-controls="likes"
                aria-selected="false"
                >Likes</a
              >
            </li>
            <li class="nav-item" role="presentation">
              <a
                class="nav-link text-info"
                id="reposts-tab"
                data-bs-toggle="tab"
                data-bs-target="#reposts"
                type="button"
                role="tab"
                aria-controls="reposts"
                aria-selected="false"
                >Reposts</a
              >
            </li>
          </ul>

          <!-- Tab panes -->
          <div class="tab-content">
            <!-- home tab -->
            <div
              class="tab-pane active show"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <div
                class="m-2"
                v-for="(homePost, index) in homePosts"
                :key="index"
              >
                <div
                  class="post-card"
                  v-if="homePost.creator[0]._id === this.profile_id"
                >
                  <!-- heading -->
                  <div class="d-flex align-items-center p-2">
                    <div class="img-div">
                      <img
                        :src="getImageUrl(homePost.creator[0].image)"
                        class="rounded-circle w-100 h-100 object-fit-fill"
                      />
                    </div>
                    <div class="ms-4 name-div">
                      <p class="text-white mt-3">
                        {{ homePost.creator[0].name }} |
                        {{ homePost.creator[0].email }}
                      </p>
                      <p class="text-white">
                        {{ formatCreatedAt(homePost.createdAt) }}
                      </p>
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
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop1"
                            v-if="homePost.creator[0].email == this.userData.email"
                            @click="selectedPost = homePost"
                          >
                            Edit
                          </p>
                        </li>

                        <li>
                          <p class="dropdown-item" 
                          v-if="homePost.creator[0].email == this.userData.email"
                          @click="deletePost(homePost._id)"
                          >
                          Delete
                          </p>
                        </li>

                        <li>
                          <p class="dropdown-item" 
                          @click="savePost(homePost._id)"
                          >
                          Save
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- linebreak -->
                  <div class="p-1" v-if="homePost.image">
                    <hr class="text-white" />
                  </div>
                  <!-- content -->
                  <div class="content">
                    <div class="content-img p-2" v-if="homePost.image">
                      <img
                        :src="getPostImageUrl(homePost.image)"
                        class="w-100 h-100 object-fit-contain"
                      />
                    </div>
                    <div class="p-1">
                      <hr class="text-white" />
                    </div>
                    <div class="content-body p-2">
                      <p class="text-white">{{ homePost.caption }}</p>
                    </div>
                    <div class="content-actions">
                      <ul class="d-flex list-unstyled actions-div">
                        <li
                          class="w-100 d-flex align-items-center justify-content-center border border-info border-top-0 border-start-0 border-bottom-0 p-2"
                        >
                          <i class="text-info me-3 bx" :class="{'bxs-heart': isLikedByCurrentUser(homePost), 'bx-heart': !isLikedByCurrentUser(homePost)}" 
                            @click="toggleLike(homePost._id)"
                          >
                          </i>

                          <span class="action-text text-info " data-bs-toggle="modal"
                              data-bs-target="#likeUsers" @click="showLikeUser = homePost">{{ homePost.reactions?.length ? homePost.reactions?.length : 0}}</span>
                        </li>
                        <li
                          class="w-100 d-flex align-items-center justify-content-center border border-info border-top-0 border-start-0 border-bottom-0 p-2"
                        >
                          <i class='bx bx-message-dots text-info me-3'></i>
                          <span class="action-text text-info">100</span>
                        </li>
                        <li
                          class="w-100 d-flex align-items-center justify-content-center p-2"
                        >
                          <i class='bx bx-share-alt text-info me-3'></i>
                          <span class="action-text text-info">100</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- likes tab -->
            <div
              class="tab-pane show"
              id="likes"
              role="tabpanel"
              aria-labelledby="likes-tab"
            >
              <div
                  class="m-2"
                  v-for="(likedPost, index) in likedPosts"
                  :key="index"
                >
                  <div
                    class="post-card"
                  
                  >
                    <!-- heading -->
                    <div class="d-flex align-items-center p-2">
                      <div class="img-div">
                        <img
                          :src="getImageUrl(likedPost.creator[0].image)"
                          class="rounded-circle w-100 h-100 object-fit-fill"
                        />
                      </div>
                      <div class="ms-4 name-div">
                        <p class="text-white mt-3">
                          {{ likedPost.creator[0].name }} |
                          {{ likedPost.creator[0].email }}
                        </p>
                        <p class="text-white">
                          {{ formatCreatedAt(likedPost.createdAt) }}
                        </p>
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
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop1"
                              v-if="likedPost.creator[0].email == this.userData.email"
                              @click="selectedPost = likedPost"
                            >
                              Edit
                            </p>
                          </li>

                          <li>
                            <p class="dropdown-item" 
                            v-if="likedPost.creator[0].email == this.userData.email"
                            @click="deletePost(likedPost._id)"
                            >
                            Delete
                            </p>
                          </li>

                          <li>
                            <p class="dropdown-item" 
                            @click="savePost(likedPost._id)"
                            >
                            Save
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <!-- linebreak -->
                    <div class="p-1" v-if="likedPost.image">
                      <hr class="text-white" />
                    </div>
                    <!-- content -->
                    <div class="content">
                      <div class="content-img p-2" v-if="likedPost.image">
                        <img
                          :src="getPostImageUrl(likedPost.image)"
                          class="w-100 h-100 object-fit-contain"
                        />
                      </div>
                      <div class="p-1">
                        <hr class="text-white" />
                      </div>
                      <div class="content-body p-2">
                        <p class="text-white">{{ likedPost.caption }}</p>
                      </div>
                      <div class="content-actions">
                        <ul class="d-flex list-unstyled actions-div">
                          <li
                            class="w-100 d-flex align-items-center justify-content-center border border-info border-top-0 border-start-0 border-bottom-0 p-2"
                          >
                            <i class="text-info me-3 bx" :class="{'bxs-heart': isLikedByCurrentUser(likedPost), 'bx-heart': !isLikedByCurrentUser(likedPost)}" 
                              @click="toggleLike(likedPost._id)"
                            >
                            </i>

                            <span class="action-text text-info " data-bs-toggle="modal"
                                data-bs-target="#likeUsers" @click="showLikeUser = likedPost">{{ likedPost.reactions?.length ? likedPost.reactions?.length : 0}}</span>
                          </li>
                          <li
                            class="w-100 d-flex align-items-center justify-content-center border border-info border-top-0 border-start-0 border-bottom-0 p-2"
                          >
                            <i class='bx bx-message-dots text-info me-3'></i>
                            <span class="action-text text-info">100</span>
                          </li>
                          <li
                            class="w-100 d-flex align-items-center justify-content-center p-2"
                          >
                            <i class='bx bx-share-alt text-info me-3'></i>
                            <span class="action-text text-info">100</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
            </div>

            <!-- reposts tab -->
            <div
              class="tab-pane"
              id="reposts"
              role="tabpanel"
              aria-labelledby="reposts-tab"
            >
              <div class="post-card">
                <!-- heading -->
                <div class="d-flex align-items-center p-2">
                  <div class="img-div">
                    <img
                      src=""
                      class="rounded-circle w-100 h-100 object-fit-fill"
                    />
                  </div>
                  <div class="ms-4 name-div">
                    <p class="text-white mt-3">name | email || Reposts</p>
                    <p class="text-white">time</p>
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
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Edit
                        </p>
                      </li>

                      <li>
                        <p class="dropdown-item">Delete</p>
                      </li>

                      <li>
                        <router-link class="dropdown-item" to="#"
                          >Save</router-link
                        >
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
                    <img class="w-100 h-100 object-fit-contain" />
                  </div>
                  <div class="p-1">
                    <hr class="text-white" />
                  </div>
                  <div class="content-body p-2">
                    <p class="text-white">caption</p>
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
        </div>
      </div>
    </div>

    <!-- show like users modal -->
    <div class="modal fade5" id="likeUsers">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Liked by
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="" v-if="showLikeUser.liked_users != []">
                <div class="m-2 p-2" v-for="(users,index) in showLikeUser.liked_users" :key="index">
                    <div class="friend-card">
                      <div class="d-flex align-items-center p-2">
                        <div class="parent-profile-card">
                          <img
                          :src="getImageUrl(users.image)"
                            class="rounded-circle object-fit-fill profile-pic"
                          />
                        </div>
                        <div class="ms-4 name-div">
                          <p class="text-dark mt-3">{{ users.name }}</p>
                        </div>
                        <div class="ms-auto">
                          <i class="bx bxs-user-plus text-dark"></i>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </LayoutComponent>

  <!-- Modal -->
  <div class="modal fade5" id="staticBackdrop">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Edit your profile
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <div class="p-2">
              <div class="img-div text-center">
                <img
                  :src="getImageUrl(this.profile_image)"
                  class="rounded-circle w-100 h-100 edit-profile-picture"
                />
              </div>
              <div class="ms-4 name-div">
                <p class="text-dark mt-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.userData.name"
                    placeholder="Enter your username"
                  />
                </p>
                <p class="text-dark mt-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.userData.email"
                    placeholder="Enter your email"
                  />
                </p>
                <p class="text-dark mt-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.user_location"
                    placeholder="Enter your location"
                  />
                </p>

                <p class="text-dark mt-3">
                  <textarea v-model="this.user_bio" cols="30" rows="5" class="form-control" placeholder="Describe about yourself"></textarea>
                </p>
              </div>
            </div>

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
                class=""
                v-if="previewImageStatus"
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
            @click="updateProfile(this.profile_id)"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- edit post Modal -->
  <div class="modal fade5" id="staticBackdrop1">
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
                  :src="getImageUrl(selectedPost.creator[0].image)"
                  class="rounded-circle w-100 h-100 object-fit-fill"
                />
              </div>
              <div class="ms-4 name-div">
                <p class="text-dark mt-3">
                  {{ selectedPost.creator[0].name }}
                </p>
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
                id="postImagePreview"
                src=""
                alt="Preview"
                v-if="previewImageStatus"
                class=""
              />
            </div>
            <div class="content-img p-2" >
              <img
                :src="getPostImageUrl(selectedPost.image)"
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
import LayoutComponent from "../components/LayoutComponent.vue";
const api = "http://localhost:8000";
export default {
  name: "ProfileComponent",
  components: {
    LayoutComponent,
  },
  data() {
    return {
      userData: {},
      user_location:"",
      user_bio:"",
      previewImageStatus: "",
      profile_image: "",
      profile_id: "",
      homePosts: [],
      likedPosts: [],
      updateProfileImage:'',
      selectedPost: null,
      newPostImage:"",
      showLikeUser:[],
    };
  },
  methods: {
    getImageUrl(filename) {
      return `${api}/pfp/${filename}`;
    },
    getPostImageUrl(filename) {
      return `${api}/uploads/${filename}`;
    },
    handleImageSelect(event) {
      const file = event.target.files[0];
      this.updateProfileImage = file;
      this.newPostImage = file;

      const reader = new FileReader();

      reader.onload = (event) => {
        this.$refs.imagePreview.src = event.target.result;
      };

      if (file) {
        reader.readAsDataURL(file);
        this.previewImageStatus = true;
      }
    },
    updateProfile(id) {
      // alert(id);
      const profile_id = id;
      var formData = new FormData();
      formData.append("uploadType", "profilePicture");
      formData.append("user_id", profile_id);
      formData.append("update_user_name", this.userData.name);
      formData.append("update_user_email", this.userData.email);
      formData.append("update_user_location", this.user_location);
      formData.append("update_user_bio", this.user_bio);
      formData.append("ProfileImage", this.updateProfileImage);
      formData.append("updated_at", new Date());
      axios.put(`${api}/update/profile`, formData).then((res) => {
        // console.log(res.data);
        if (res.status == 200) {
          axios.get(`${api}/user/${profile_id}`).then((res) => {
            // console.log(res.data);
            this.userData.name = res.data.name;
            this.userData.email = res.data.email;
            this.userData.user_location = res.data.user_location;
            this.userData.user_bio = res.data.user_bio;
            this.profile_image = res.data.image;
            // this.$store.dispatch('saveUserData',res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: false,
            });

            Toast.fire({
              icon: "success",
              title: "Profile updated",
            });
          });
        }
      });
    },
    updatePost(id) {
      const postId = id;
      const file = this.newPostImage;
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
            this.homePosts = res.data.reverse();
          });

          this.$router.push("/profile");
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
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
                  timerProgressBar: false,
                });

                Toast.fire({
                  icon: "success",
                  title: "Post deleted",
                });
                axios.get(`${api}/get/posts`).then((res) => {
                  this.homePosts = res.data;
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },

    savePost(id){
      const postId = id;
      const userEmail = this.userData.email;
      const created_at = new Date();
      
      axios.post(`${api}/save/post`, { postId, userEmail,created_at }).then((res)=>{
        // console.log(res)
        if (res.status === 200) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
          });

          Toast.fire({
            icon: "success",
            title: "Post saved",
          });
          axios.get(`${api}/get/posts`).then((res) => {
            // console.log(res.data);
            this.homePosts = res.data.reverse();
          });
        }
      })
    },
    isLikedByCurrentUser(post) {
      const currentUserId = this.userData.id;
      return post.reactions?.includes(currentUserId);
    },
    toggleLike(id){
      const postId = id;
      const userId = this.userData.id;
      axios.put(`${api}/toggle/like/${postId}/${userId}`).then((res)=>{
        if(res.status == 200){
          axios.get(`${api}/get/posts`).then((res) => {
            // this.homePosts = res.data.reverse();
            this.homePosts = res.data.map((post) => {
              return {
                ...post,
                isLikedByCurrentUser: this.isLikedByCurrentUser(post),
              };
            }).reverse();
            const likedPosts = res.data.filter(post => post.reactions?.includes(this.userData.id));
            this.likedPosts = likedPosts.map(post => ({
                ...post,
                isLikedByCurrentUser: this.isLikedByCurrentUser(post),
              })).reverse();
          });
        }
      });
    },
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
  mounted() {
    // const user = this.$store.getters.getUserData;
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.name);
    this.userData.id = user._id;
    this.userData.name = user.name;
    this.userData.email = user.email;
    this.userData.user_location = user.user_location;
    this.userData.user_bio = user.user_bio;
    this.user_location = user.user_location;
    this.user_bio = user.user_bio;
    this.profile_image = user.image;
    this.profile_id = user._id;
    axios.get(`${api}/get/posts`).then((res) => {
      this.homePosts = res.data.map((post) => {
        return {
          ...post,
          isLikedByCurrentUser: this.isLikedByCurrentUser(post),
        };
      }).reverse();
    });
    axios.get(`${api}/get/liked/posts/${this.userData.id}`).then((res) => {
      // console.log(res.data)
      this.likedPosts = res.data.map((post) => {
        return {
          ...post,
          isLikedByCurrentUser: this.isLikedByCurrentUser(post),
        };
      }).reverse();
      // console.log(this.likedPosts)
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
  cursor:pointer;
}

.bx-dots-horizontal-rounded {
  cursor: pointer;
  font-size: 20px;
}

.sections {
  margin-top: 90px !important;
  background-color: #070c1057;
  padding: 40px;
}
.sections li {
  position: relative;
}
.sections a::after {
  content: "";
  width: 0%;
  height: 2px;
  background-color: #0aceff;
  box-shadow: 0 0 3px #00fff2, 0 0 #03ffdd, 0 0 #0aceff, 0 0 10px #00e9ff,
    0 0 10px #0ae2f6, 0 0 #00ffe6, 0 0 #04dcff, 0 0 #00e2ff;

  position: absolute;
  bottom: -4px;
  left: 0;
  transition: 0.5s;
}

.sections a:hover::after,
.sections .active::after {
  width: 100%;
}
/* .edit-profile-picture {
  width: 300px !important;
  height: 300px !important;
} */
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
  /* width: 300px !important; */
  height: 300px !important;
  border-radius: 50%;
  /* object-fit: contain; */
}
#postImagePreview{
  width: 100%;
  /* height: ; */
}
.bg-custom-grey {
  background-color: rgba(16, 16, 16, 0.782);
}
.profile-picture-div {
  position: relative;
  height: 100%;
}
.profile-picture {
  position: absolute;
  left: 10%;
  top: 40%;
  width: 100px;
  height: 100px;
  /* object-fit: contain; */
  border-radius: 50%;
}
.user-name {
  position: absolute;
  left: 20%;
  top: 110%;
}
.user-email {
  position: absolute;
  left: 20%;
  top: 140%;
}
.btn-custom {
  position: absolute;
  color: black;
  background-color: white;
  border-color: rgba(31, 31, 31, 0.829);
  box-shadow: 2px 2px black;
  left: 90%;
  top: 110%;
}
.container {
  position: absolute;
  top: 190%;
  left: 10%;
}
.container-2 {
  position: absolute;
  top: 230%;
  left: 10%;
}
.bio-details {
  line-height: 2;
}

.friend-card {
    width: 100%;
    height: 100%;
    margin: auto;
    border-radius: 2%;
    box-shadow: 2px 2px 2px 2px;
    box-sizing: border-box;
    /* border: 1px solid #3d3d3d; */
    background-color: rgb(255 255 255 / 91%);
}

.profile-pic {
  width: 100px;
  height: 100px;
}
.bxs-user-plus {
  font-size: 30px;
  cursor: pointer;
}
.bxs-heart{
  cursor:pointer;
}
.bx-heart{
  cursor:pointer;
}

.bx-message-dots{
  cursor:pointer;
}

.bx-share-alt{
  cursor:pointer;
}
@media screen and (max-width: 1250px) {
  .user-name {
    left: 25%;
  }
}
@media (max-width: 670px) {
  .user-name {
    left: 30% !important;
  }
}
@media (max-width: 650px) {
  .user-name {
    left: 40% !important;
  }
}
@media (max-width: 426px) {
  .user-name {
    left: 40% !important;
  }
}
@media (max-width: 320px) {
  .user-name {
    left: 50% !important;
  }
}
@media (max-width: 1024px) {
  .btn-custom {
    left: 80% !important;
  }
}
@media (max-width: 1024px) {
  .btn-custom {
    left: 70% !important;
  }
}
@media (max-width: 1024px) {
  .btn-custom {
    font-size: 14px !important;
  }
}
@media (max-width: 1024px) {
  .container {
    left: 3% !important;
  }
}
@media (max-width: 426px) {
  .container {
    left: 0% !important;
  }
}
@media (max-width: 768px) {
  .user-email {
    left: 25% !important;
  }
}
@media (max-width: 426px) {
  .user-email {
    left: 40% !important;
  }
}
</style>
