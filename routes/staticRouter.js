const express = require("express");
const URL = require("../models/url");

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("GET / route hit");
    const allUrls = await URL.find({});
    return res.render('home', { urls: allUrls });
});

module.exports = router;
