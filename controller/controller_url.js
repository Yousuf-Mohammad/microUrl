
const URL = require("../model/model_url");
const shortid = require('shortid');




async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "url is required" });

    const shortId = shortid();

    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({ id: shortId });
}



async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,

    });
}
async function handleGetAll(req, res) {
    const entry = await URL.find();
    const entries = await entry;
    res.json({ entries });
}

module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics,
    handleGetAll
};