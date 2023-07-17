const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require("mongodb");
const mongo = new MongoClient("mongodb://127.0.0.1");
const db = mongo.db("social_app");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const secret = "thisissocialapppassword";

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//image storage
// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";
    if (req.body.uploadType === "postPicture") {
      folder = "uploads/";
    } else if (req.body.uploadType === "postUpdatePicture") {
      folder = "uploads/";
    } else if (req.body.uploadType === "profilePicture") {
      folder = "pfp/";
    }
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// register
app.post("/register", async (req, res) => {
  // console.log(req.body);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 15);
  const user = await db.collection("users").insertOne({
    name,
    email,
    password: hashPassword,
  });
  // console.log(user);
  if (user.insertedId) {
    const loggedInUser = await db.collection("users").findOne({
      _id: new ObjectId(user.insertedId),
    });
    return res.status(200).json(loggedInUser);
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong! Please try again!" });
});

// login
app.post("/login", async (req, res) => {
  // console.log(req.body.email);
  const email = req.body.email;
  const password = req.body.password;
  const user = await db.collection("users").findOne({ email });
  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      const token = jwt.sign(user, secret);
      return res.send({ token, user });
    } else {
      return res
        .status(400)
        .json({ msg: "Something went wrong! Please try again!" });
    }
  } else {
    return res
      .status(400)
      .json({ msg: "Something went wrong! Please try again!" });
  }
});

//create_Post
app.post("/create/post", upload.single("post_image"), async (req, res) => {
  const caption = req.body.post_caption;
  const creator = req.body.post_creator;
  const creatorEmail = req.body.post_creator_email;
  const createdAt = req.body.post_created_at;
  const image = req.file.originalname;

  const post = await db.collection("posts").insertOne({
    caption,
    creator,
    creatorEmail,
    createdAt,
    image,
  });
  return res.status(200).json(post);
});

app.get("/get/posts", async (req, res) => {
  // const posts = await db.collection("posts").find().toArray();
  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creatorEmail",
          foreignField: "email",
          as: "creator",
        },
      },
    ])
    .toArray();
  res.json(posts);
});

//update post
app.put("/update/post", upload.single("new_image"), async (req, res) => {
  const newImage = req.file ? req.file.originalname : null;
  const newCaption = req.body.new_caption;
  const post_id = req.body.post_id;
  const updated_at = req.body.updated_at;

  try {
    const post = await db.collection("posts").findOne({
      _id: new ObjectId(post_id),
    });
    if (!post) {
      res.status(404).json({ msg: "Post not found!" });
    } else {
      if (newImage != null) {
        const imagePath = `./uploads/${post.image}`;
        fs.unlinkSync(imagePath);
        const updatedPost = await db.collection("posts").updateOne(
          { _id: new ObjectId(post_id) },
          {
            $set: {
              caption: newCaption,
              image: newImage,
              updated_at: updated_at,
            },
          }
        );
        res.status(200).json(updatedPost);
      } else {
        const updatedPost = await db.collection("posts").updateOne(
          { _id: new ObjectId(post_id) },
          {
            $set: {
              caption: newCaption,
              updated_at: updated_at,
            },
          }
        );
        res.status(200).json(updatedPost);
      }
    }
  } catch (error) {
    console.error("Something serious occured!", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete post
app.delete("/delete/post/:id", async (req, res) => {
  const postId = req.params.id;
  // console.log(postId);
  const post = await db.collection("posts").findOne({
    _id: new ObjectId(postId),
  });
  if (!post) {
    res.status(400).json({ msg: "Post not found!" });
  } else {
    const imagePath = `./uploads/${post.image}`;
    await db.collection("posts").deleteOne({ _id: new ObjectId(postId) });
    fs.unlinkSync(imagePath);
    res.status(200).json({ msg: "Post Deleted" });
  }
});
//update profile
app.put("/update/profile", upload.single("ProfileImage"), async (req, res) => {
  // console.log(req.file.originalname);
  const user_id = req.body.user_id;
  const newName = req.body.update_user_name;
  const newEmail = req.body.update_user_email;
  const updated_at = req.body.updated_at;
  const newProfilePicture = req.file.originalname;

  try {
    const user = await db.collection("users").findOne({
      _id: new ObjectId(user_id),
    });
    if (!user) {
      res.status(404).json({ msg: "User not found!" });
    } else {
      if (newProfilePicture != null) {
        // const imagePath = `./profile_pictures/${user.image}`;
        // if (imagePath) {
        //   fs.unlinkSync(imagePath);
        // }
        const updatedPost = await db.collection("users").updateOne(
          { _id: new ObjectId(user_id) },
          {
            $set: {
              name: newName,
              image: newProfilePicture,
              email: newEmail,
              updated_at: updated_at,
            },
          }
        );
        res.status(200).json(updatedPost);
      } else {
        const updatedPost = await db.collection("users").updateOne(
          { _id: new ObjectId(user_id) },
          {
            $set: {
              name: newName,
              email: newEmail,
              updated_at: updated_at,
            },
          }
        );
        res.status(200).json(updatedPost);
      }
    }
  } catch (error) {
    console.error("Something serious occured!", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/user/:id", async (req, res) => {
  const user_id = req.params.id;
  const user = await db.collection("users").findOne({
    _id: new ObjectId(user_id),
  });
  if (!user) {
    res.status(400).json({ msg: "User not found!" });
  } else {
    res.status(200).json(user);
  }
});
// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/pfp", express.static(path.join(__dirname, "pfp")));

app.listen(8000, () => {
  console.log("API server running at 8000");
});
