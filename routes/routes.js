const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// router.get('/yes', async(req, res, next) => {
//     let result = await client.db("blockchain").collection('newcollection').insertOne({ goodboy: "badboy" });
//     console.log(result.insertedId);
//     res.send("yes");
// });

// router.get('/create', async (req, res, next) => {
//     res.send("create");  
// })
router.post('/signup', async (req, res, next) => {

    try {
        let data = req.body;
        console.log(data);
        const present = await User.find({ email: data.email });
        if (present.length)
        {
            res.send('already present');
        }
        else {
            
            let password = data.password; let encryptedpassword="";
            delete data[password];
            await bcrypt.hash(password, saltRounds, function(err, hash) {
                encryptedpassword = hash;
                data[password] = encryptedpassword;
            const newuser = new User(data);
            newuser.save();
        });
        res.send("got it");
        }
        
    }
    catch (err)
    {
        res.send(err);
    }
    
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (!user)
        {
            res.send('user not present');  
        }
        else {
           bcrypt.compare(req.body.password, user.password, function(err, result) {
               if (result)
               {
                   res.send({ auth: true });
               }    
               else {
                   res.send('incorrect password');
               }
            });
        }
    }
    catch (err) {
        
    }
    
});

router.get('/',async function (req, res) {
    if (req.session.view)
    {
        req.session.view++;
        res.send('Hello ' + req.session.view);
    }
    else {
        req.session.view = 1;
        res.send('Hello initialised');
    }
})

module.exports = router;