const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("invalid route");
});

router.post("/", function(req, res, next) {
  debugger;
  res.send("recieved");
});

module.exports = router;
