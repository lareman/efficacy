const express = require("express");
const router = express.Router();

/**
 * @route:  POST api/posts/test
 * @desc:   Test post route
 * @access: Public
 ** */
router.post("/test", (req, res) => res.json({ msg: "Posts Works!" }));

module.exports = router;
