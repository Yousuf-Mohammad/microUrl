const express = require("express");
const cors = require("cors")
const connectToMongoDB = require("./connect");
const { handleGenerateShortURL,
    handleAllData,
    handleReRouteUrl,
    handleSingleData } = require("./controller/controller_url");



const app = express(); // initiating express app 
const PORT = 8000 || process.env.PORT;

connectToMongoDB("mongodb+srv://dbUser:Zq4UcF8pwSq1tQiw@cluster0.h3ajy.mongodb.net/micro-url").then(() => {
    console.log("MongoDB Connected")
});



app.use(express.json());
app.use(cors())

app.post("/url", handleGenerateShortURL);
app.get("/analytic/:shortId", handleSingleData);
app.get("/:shortId", handleReRouteUrl);
app.get("/", handleAllData)

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`))