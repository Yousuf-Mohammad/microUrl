const express = require("express");
const { handleGenerateShortURL } = require("../controller/controller_url");


const router = express.Router();

router.post("/", handleGenerateShortURL);
// router.get("/analytics/:shortId", handleGetAnalytics);


module.exports = router;