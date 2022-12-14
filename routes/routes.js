const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Paymentmodel = require('../models/Payment')
// router.get('/yes', async(req, res, next) => {
//     let result = await client.db("blockchain").collection('newcollection').insertOne({ goodboy: "badboy" });
//     console.log(result.insertedId);
//     res.send("yes");
// });

// router.get('/create', async (req, res, next) => {
//     res.send("create");  
// })
router.
post('/signup', async (req, res, next) => {

    try {
        let data = req.body;
        console.log(data);
        const present = await User.find({ email: data.email });
        if (present.length)
        {
            res.send('already present');
        }
        else {
            
            let password = data.password; 
            delete data['password'];
            let hash = await bcrypt.hashSync(password, saltRounds);

                data['password'] = hash;
            const newuser = await new User(data);
            await newuser.save();
            req.session.user = newuser;
            const d = new Date();
            d.setMonth(d.getMonth() - 1);
            const newpay = await Paymentmodel({
                 lastpayment: d,
                lastchanged: d,
                userId: req.session.user._id,
                timeslot:1
            })
            newpay.save();
        res.send({auth:true});
        }
        
    }
    catch (err)
    {
        res.send(err);
    }
    
});

router.post('/login', async (req, res, next) => {
    try {
        const user = await User.find({email:req.body.email});
        if (!user.length)
        {
            res.send('user not present');  
        }
        else {
          let result = await bcrypt.compareSync( req.body.password , user[0]._doc.password );
               if (result)
               {
                   req.session.user = user[0]._doc;
                   res.send({ auth: true });
               }    
               else {
                   res.send('incorrect password');
               }
          
        }
    }
    catch (err) {
        res.send(err);
    }
    
});
router.delete('/logout', async (req, res, next) => {
    console.log(req.session);
    delete req.session.user;
    console.log(req.session);
    res.send({ auth: false });
})

router.get('/getdetail', async (req, res, next) => {
    console.log(req.session.user);
    if (req.session.user === undefined)
        res.send({ auth: false });
    else {
        const user = await Paymentmodel.findOne({ userId: req.session.user._id });
        if (user === null || user.length === 0)
        {
            res.send({ exist:false });
    }
    else {
        res.send({exist:true,data:user._doc});
    }
}
})

router.post('/changeslot', async (req, res, next) => {
    console.log(req.session.user)
    await Paymentmodel.findOneAndUpdate({ userId: req.session.user._id },{lastchanged:new Date(),timeslot:req.body.timeslot});
    res.send('changed')
})
router.post('/payment', async (req, res, next) => {
   
    console.log(req.session.user)
    const d = new Date();
   
        await Paymentmodel.findOneAndUpdate({ userId: req.session.user._id }, {    
            lastpayment : d
        });

   
    res.send({ auth: true }).sendStatus(200);
})

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