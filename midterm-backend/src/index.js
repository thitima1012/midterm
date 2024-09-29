const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const productRouter = require("./routers/product.router");
const authRouter = require("./routers/auth.router")
const corsOption = {
    origin: ['https://device-manager-front-yaqw.vercel.app', 'http://localhost:5173'], // อนุญาตหลาย origin
    credentials: true, // หากใช้ cookies หรือ tokens
};


//use Middleware
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded
    ({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1>Hello FinancialTracker API</h1>");
});

app.use("/api/v1/product",  productRouter);
app.use("/api/v1/auth",  authRouter);

app.listen(PORT, () => {
    console.log("Listenig to http://localhost:" + PORT);
});