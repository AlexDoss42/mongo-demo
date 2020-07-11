const _ = require('lodash');
const config = require('config');
const jwt = require('jasonwebtoken');
const bcrypt = require('bcrypt');
const {User, validate} = require('../user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async(req, res) =>{
 const { error } = validate(req.body);
if (error) return res.status(400).send(error.detail[0].message);

let user = await User.findOne({ email: req.body.email });
if (user) return res.status(400).send("User already registered.");

const validPassword = await bcrypt.compare(req.body.password, user.password);
if (!validPassword) return res.status(400).send("Invalid email or password");

const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));

res.send(token);
});