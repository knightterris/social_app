const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
// const io = new Server(server);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//image storage
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
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
    
    cb(null, uniqueSuffix + '-' + file.originalname);
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
  const image = req.file ? uniqueSuffix + '-' + req.file.originalname : null;

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
      {
        $lookup: {
          from: "users",
          localField: "reactions",
          foreignField: "_id",
          as: "liked_users",
        },
      },
     
    ])
    .toArray();
    console.log(posts)
  res.json(posts);
});

//update post
app.put("/update/post", upload.single("new_image"), async (req, res) => {
  const newImage = req.file ?  uniqueSuffix + '-' + req.file.originalname : null;
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
  const newLocation = req.body.update_user_location;
  const newBio = req.body.update_user_bio;
  const updated_at = req.body.updated_at;
  const newProfilePicture =  req.file ? uniqueSuffix + '-' + req.file.originalname : null;

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
              user_bio: newBio,
              user_location: newLocation,
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
              user_bio: newBio,
              user_location: newLocation,
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
//save post
app.post("/save/post", async (req, res) => {
  // console.log(req.body)
  const postId = req.body.postId;
  const userEmail = req.body.userEmail;
  const created_at = req.body.created_at;
  const savedPost = await db.collection("save_posts").insertOne({
     postId,
     userEmail,
     created_at
  });
  res.status(200).json(savedPost);
});
//search data
app.post("/search/data", async (req, res) => {
  const req_input = req.body.search_input;
  try {
    const result = await db.collection("posts").aggregate([
        {
          $lookup: {
            from: "users",
            localField: "creatorEmail",
            foreignField: "email",
            as: "creator",
          },
        },
        {
          $match: {
            $or: [
              { caption: { $regex: req_input, $options: "i" } },
              { "creator.name": { $regex: req_input, $options: "i" } },
              { "creator.email": { $regex: req_input, $options: "i" } },
            ],
          },
        },
      ])
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error Data searching", error);
    res.status(500).json({ msg: "Internal Server error!" });
  }
});
//toggle like
app.put("/toggle/like/:postId/:userId", async (req,res) => {
  const postId = req.params.postId;
  const userId = req.params.userId;
  const post = await db.collection('posts').findOne({
    _id: new ObjectId(postId),
  })
  
  post.reactions = post.reactions || [];

  //most important step
  if (post.reactions.find(item => item.toString() === userId)) {
		post.reactions = post.reactions.filter(uid => uid.toString() !== userId);
	} else {
		post.reactions.push(new ObjectId(userId));
	}
  await db.collection("posts").updateOne(
    { _id: new ObjectId(postId) },
    {
      $set: post,
    },
  );
  res.status(200).json(post);
  
})


// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/pfp", express.static(path.join(__dirname, "pfp")));

app.listen(8000, () => {
  console.log("API server running at 8000");
});
