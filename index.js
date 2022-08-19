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
app.get('/user/login', async (req, res) => {
    try {
        const { username, password } = req.query;
        if (username == undefined || password == undefined)
            res.send('Please fill the fields')
        else if (username == "" || password == "")
            res.send('Please fill the fields')
        else {

            const user2 = await apiusers.findOne({
                username,
                password
            })
            if (user2 == null)
                res.status(401).send("Invalid Credentials");
            else {
                res.send(user2);

            }
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }

})

app.get('/personregistration', async function (req, res) {
    try {
        let { username, password } = req.query;

        if (username == undefined || password == undefined)
            res.send('Please fill the fields')
        else if (username == "" || password == "")
            res.send('Please fill the fields')
        else {

            const user = await apiusers.findOne({ username });
            if (user) res.status(401).send("Number is Already Registered!!");
            else {
                const user1 = new apiusers({
                    username,
                    password
                });
                await user1.save();
                res.send("Registered Successfully");
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}
);
