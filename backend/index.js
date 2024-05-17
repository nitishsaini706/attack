// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const routes = require("./routes/index");

const app = express();
app.use(bodyParser.json());
const corsOptions = {
 " Access-Control-Allow-Origin":"*"
};

app.use(cors(corsOptions));

app.get("/",(req,res)=>{
    res.json("server working fine")
})
app.use(routes);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
