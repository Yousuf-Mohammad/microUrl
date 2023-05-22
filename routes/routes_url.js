const express = require("express");
const { handleGenerateShortURL, handleGetAnalytics, handleGetAll } = require("../controller/controller_url");


const router = express.Router();

router.post("/", handleGenerateShortURL);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/analytics/getAll", handleGetAll);

module.exports = router;