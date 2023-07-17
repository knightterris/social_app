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
                  Yangon
                </div>
                <div
                  class="col-lg-6 col-md-12 col-sm-12 text-white bio-details"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsam, fugit?
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
                  />
                </p>
                <p class="text-dark mt-3">
                  <input
                    type="text"
                    class="form-control"
                    v-model="this.userData.email"
                  />
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
            <div class="content-img p-2">
              <img class="w-100 h-100 object-fit-contain" />
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
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
      previewImageStatus: "",
      profile_image: "",
      profile_id: "",
    };
  },
  methods: {
    getImageUrl(filename) {
      return `${api}/pfp/${filename}`;
    },
    handleImageSelect(event) {
      const file = event.target.files[0];
      this.profile_image = file;

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
      formData.append("ProfileImage", this.profile_image);
      formData.append("updated_at", new Date());
      axios.put(`${api}/update/profile`, formData).then((res) => {
        // console.log(res.data);
        if (res.status == 200) {
          axios.get(`${api}/user/${profile_id}`).then((res) => {
            // console.log(res.data);
            this.userData.name = res.data.name;
            this.userData.email = res.data.email;
            this.profile_image = res.data.image;
            localStorage.setItem("user", JSON.stringify(res.data));
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });

            Toast.fire({
              icon: "success",
              title: "Profile updated",
            });
          });
        }
      });
    },
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user.name);
    this.userData.name = user.name;
    this.userData.email = user.email;
    this.profile_image = user.image;
    this.profile_id = user._id;
  },
};
</script>

<style scoped>
.edit-profile-picture {
  width: 300px !important;
  height: 300px !important;
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
  width: 300px !important;
  height: 300px !important;
  border-radius: 50%;
  /* object-fit: contain; */
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
.bio-details {
  line-height: 2;
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
