const express = require("express");
const mongoose = require("mongoose");
/* DB Config */
const db = require("./config/keys").mongoURI;
/* Define Express as app */
const app = express();
/* Define Express port to use */
const port = process.env.PORT || 5000;
/* Bring in routes to use */
const users = require("./routes/api/users");
const posts = require("./routes/api/posts");

/* Connect to MondoDB */
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* 

/* Define the root of our Routes */
app.use("/api/users", users);
app.use("/api/posts", posts);

// app.get("/", (req, res) => res.send("Hello World"));

/* Start server */
app.listen(port, () => console.log(`Server running on port ${port}`));
