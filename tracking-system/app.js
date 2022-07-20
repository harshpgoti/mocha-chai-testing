const express = require('express');
const mongoose = require("mongoose");
const userRoutes = require('./routes/user');
const walletRoutes = require('./routes/wallet');
const { mongoose_url } = require('./config/secret.json');

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

mongoose.connect(mongoose_url,{
    useNewUrlParser: true
})
.then(result => console.log('connection successfull'))
.catch(error => handleError(error));

app.get('/',(req,res)=>{
    res.status(200).json({
      message: 'Health: OK'
  });
});

app.use("/user", userRoutes);
app.use("/wallet", walletRoutes);

module.exports = app;