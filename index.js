const express = require("express");

const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`server started at port:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://abhay:Abhay%40123@cluster0.xowgujp.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const apiusersschema = new mongoose.Schema({
    username: String,
    password: String,
})

const apiusers = mongoose.model("apiusers", apiusersschema);

app.get('/', (req, res) => { res.send('hello') });
