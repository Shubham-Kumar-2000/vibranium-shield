let express = require('express');
let router = express.Router();
let Post = require('../models/post');
let auth = require('../middlewares/authenticate');


router.get('/', auth.verifyUser, function(req, res, next) {
    Post.find().then((posts) => {
        return res.status(200).json(posts);
    }).catch((err) => {
        return res.status(500).json(err);
    })
});

router.post('/add', auth.verifyUser, (req, res) => {
    let data = req.body.post;
    Post.create(data).then((post) => {
        return res.status(200).json({msg:"success", post: post});
    }).catch((err) => {
        return res.status(500).json(err);
    });
});

router.put('/update', auth.verifyUser, (req, res) => {
    let data = req.body.post;
    let email= req.body.email;
    let uid = req.body.id;
    let filter = {};

    if(email) filter = { email: email };
    if(uid) filter = { _id: uid };

    Post.findOneAndUpdate(filter, data).then((post) => {
        return res.status(200).json({msg: "updated", post: post});
    }).catch((err) => {
        return res.status(500).json(err);
    });
});


router.delete('/delete', auth.verifyUser, (req, res) => {
    let filter = {_id: req.body.id};

    Post.findOneAndDelete(filter).then((post) => {
        return res.status(200).json({msg: "Deleted successfully"});
    }).catch((err) => {
        return res.status(500).json(err);
    });
});
module.exports = router;
