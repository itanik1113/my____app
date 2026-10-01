const express = require('express');
const router = express.Router();
const User = require('../models/User');

const users = [
    { name: 'John Doeee', age: 30, email: 'john.doe@example.com' },
    { name: 'Jane Smith', age: 25, email: 'jane.smith@example.com' },
    { name: 'Bob Johnson', age: 35, email: 'bob.johnson@example.com' },
    { name: 'Alice Williams', age: 28, email: 'alice.williams@example.com' }
];

router.get('/profile',(req,res)=>{
    res.render('views',{title:'my first pug',message:'hello world', users: users})
});

router.get('/', async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.render('index', { users });
});

router.get('/add', (req, res) => {
  res.render('addUser');
});

router.post('/add', async (req, res) => {
  const { name, city } = req.body;

  await User.create({ name, city });

  res.redirect('/user');
});

router.get('/:userID/edit', async (req, res) => {
  const user = await User.findById(req.params.userID);
  res.render('editUser', { user });
});
router.post('/:userID/edit', async (req, res) => {
  const { name, city } = req.body;
  await User.findByIdAndUpdate(req.params.userID, { name, city });
  res.redirect('/user');
});

router.get('/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/user');
});

module.exports = router;