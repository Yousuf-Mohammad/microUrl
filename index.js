const express = require("express");
const urlRoute = require("./routes/routes_url");
const URL = require("./model/model_url");
const connectToMongoDB = require("./connect")


const app = express(); // initiating express app 
const PORT = 8000;

connectToMongoDB("mongodb+srv://dbUser:Zq4UcF8pwSq1tQiw@cluster0.h3ajy.mongodb.net/micro-url").then(() => {
    console.log("MongoDB Connected")
});

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
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
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))