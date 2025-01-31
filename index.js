const express = require("express")
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connect");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");


const app = express();

const PORT = 8002;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve('./views')) //telling express ki mere saare files views folder me hai

app.use(express.json()); //middleware for body reading and supporting json data
app.use(express.urlencoded({extended: false})) // for form datas
app.use(cookieParser());



app.use('/url',restrictToLoggedInUserOnly, urlRoute); //ye middleware sirf tabhi chalega jab req /url pe aegi. you need to be logged in to access this
app.use('/user', userRouter);
app.use('/', checkAuth, staticRouter);

app.get('/url/:shortId', async (req, res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortId
    }, { $push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    }})

    res.redirect(`${entry.redirectURL}`);
})

app.listen(PORT, console.log(`Server started at PORT: ${PORT}`));