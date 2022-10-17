const express = require("express");
const { createFolder, createFile } = require("./utils.js");
const app = express();
const postsData = require("./data/posts.json");
const fs = require("fs");

//pass incoming data with middleware
app.use(express.json());

//create folder
createFolder("data"); //will create a folder named data, can also create subfolder: createFolder("public/src");

//create files
createFile("data/posts.json", "content here");

//rounting

//home route
app.get("/", (req, res) => {
  res.send("Home route");
});

//fetch all posts
app.get("/posts", function (req, res) {
  res.json({
    message: "Posts fetched successfully",
    postsData,
  });
});

//fetch single post
app.get("/posts/:id", function (req, res) {
  //1. get the id of the post
  const id = req.params.id;
  //2. find post by id
  const postFound = postsData.find(post => {
    return post.id === id;
  });

  if (!postFound) {
    res.json({ message: "Post not found" });
  } else {
    //send the post to user
    res.json({ postFound });
  }
});

//create posts
app.post("/posts", function (req, res) {
  //1. get the post from user
  const newPost = req.body;
  //2. push the new post into the existing post
  postsData.unshift({
    ...newPost,
    id: postsData.length.toString(),
  });
  //3. write the the posts.json file
  fs.writeFile("data/posts.json", JSON.stringify(postsData), function (err) {
    if (err) {
      console.log(err);
    }
  });
  //4. send message to user
  res.json({
    message: "Post created successfully",
  });
});

//update posts
app.put("/posts/:id", function (req, res) {
  //get the dynamic id === params
  const id = req.params.id;
  const { title, description, url } = req.body;

  //find the post to update
  const foundPost = postsData.find(function (post) {
    return post.id === id;
  });
  if (!foundPost) {
    return res.json({ msg: "Post not found" });
  }

  //filter out all post with the psot found
  const filteredPosts = postsData.filter(post => post.id !== id);

  //update the found post
  foundPost.title = title;
  foundPost.description = description;
  foundPost.url = url;

  //push the updated post to filtered posts array
  filteredPosts.unshift(foundPost);

  //write to the posts.json file
  fs.writeFile(
    "data/posts.json",
    JSON.stringify(filteredPosts),
    function (err) {
      if (err) {
        console.log(err);
      }
    }
  );
  //3. send message to user
  res.json({
    message: "Post updated successfully",
  });
});

//delete posts
app.delete("/posts/:id", function (req, res) {
  //1. find the id of post
  const id = req.params.id;
  const filterPosts = postsData.filter(post => {
    return post.id !== id;
  });
  //2. rewrite the the posts.json file with the post deleted
  fs.writeFile("data/posts.json", JSON.stringify(filterPosts), function (err) {
    if (err) {
      console.log(err);
    }
  });
  //3. send message to user
  res.json({
    message: "Post deleted successfully",
  });
});

//create a server
app.listen(9000, function () {
  console.log("Server is up and running");
});
