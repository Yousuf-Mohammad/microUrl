const URL = require("../model/model_url");
const shortid = require('shortid');



/////Getting URL and generate Short URL////////// 

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

/////////////////////////////////////////////////////





////Getting All Stored Data With analytics////////////

async function handleAllData(req, res) {
    const entry = await URL.find();
    res.json({ entry });
    console.log("data found")
}

////////////////////////////////////////////////////






////Getting Specific Data With analytics////////////

async function handleSingleData(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    res.json({ entry });
    console.log("data found")
}
/////////////////////////////////////////////






///////////////Rerouting URL ////////////

async function handleReRouteUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
}

///////////////////////////////////////////////






module.exports = {
    handleGenerateShortURL,
    handleAllData,
    handleReRouteUrl,
    handleSingleData

};