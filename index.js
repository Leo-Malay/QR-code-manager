const express = require("express");
const qr = require("qrcode");
const path = require("path");
const app = express();
const route = express.Router();
// Configuring the path.
route.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/home.html"));
});
route.get("/scanner", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/scanner.html"));
});
route.post("/generate_qr", async (req, res) => {
    const url = JSON.stringify(req.body);
    if (url.length === 0) res.send("Empty Data!");
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");
        res.redirect("/?src=" + src);
    });
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: !0 }));
app.use(express.json());
app.use("/", route);
// listening at port 8080;
app.listen(process.env.PORT || 8501, "0.0.0.0", () => {
    console.log("[+] Server has started", process.env.PORT || 8501);
});
