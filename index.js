// const express = require('express');
import express from 'express';
import { engine } from "express-handlebars";
import mongoose from 'mongoose';
import path from "path";
import ContactModel from './Model/Contact';
import nodemailer from 'nodemailer';

const app = express();

//setting an engine
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
// app.set("views", "./views")

/***************Database connection start here************* */
let mongodbURL = "mongodb://localhost:27017/Avinash";
mongoose.connect(mongodbURL, err => {
    if (err) throw err;
    console.log("DATABASE CONNECTED ")
});
/***************Database connection end here************* */

/**************** Adding middleware block ****************/
app.use(express.static(path.join(__dirname, "public")))

//body[parser]
app.use(express.urlencoded({extended: true}))
/**************** ending middleware block ****************/


app.get('/', (req, res) => {
    res.render("home", {title: "welcome to qspiders"})
})
app.get("/contact", (req, res) => {
    res.render("contact", {title:"Contact Us"});
})

app.get("/ all-students", async (req, res) => {
    let students = await ContactModel.find().lean();
    res.render("all-students", { students });
})


//**********All Post request starts here ************///
app.post("/contact", async (req, res) => {
    res.send("hey everything is ok");
    // let { firstname, lastname, email, phone } = req.body;
    // console.log(req.body);

    //save incoming request from user into mongodb database
    let payload = await req.body;
    await ContactModel.create(payload);
    // res.send("ok");
    // res.send({ data, text: "Successfully created" });
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "jesuavinash1@gmail.com",
            pass: ""
        }
    }).sendMail({
        from: "jesuavinash1@gmail.com",
        to: [req.body.email, "prasadsaval2@gmail.com"],
        subject: "Contact form",
        html: `
            <h1>${req.body.firstname}</h1>
            <p>Email : ${req.body.email}</p>
            <p>Phone Number: ${req.body.phone}</p>
        `
    });
})


// app.get("/", (req, res) => {
//     res.render("home", { title: });
// })

app.listen(4000, (err) => {
    if (err) throw err;
    console.log("server is running on port 4000");
})