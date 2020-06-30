const {User, validate} = require('../user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) =>{
  const users = await genres.find().sort('name');
  res.send(users)
});
