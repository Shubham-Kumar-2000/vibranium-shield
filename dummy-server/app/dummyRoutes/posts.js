let express = require('express');
let router = express.Router();
let Post = require('../models/post');
let auth = require('../middlewares/authenticate');
let posts = require('../dummyData/posts.json');


router.get('/', function(req, res, next) {
    return res.status(200).json(posts);
});

router.post('/add', (req, res) => {
    let data = req.body.post;
    return res.status(200).json({msg:"success", post: data});
});

router.put('/update', (req, res) => {
    let data = req.body.post;
    let email= req.body.email;
    let uid = req.body.id;
    let filter = {};

    if(email) filter = { email: email };
    if(uid) filter = { _id: uid };

    return res.status(200).json({msg: "updated", post: data});
});


router.delete('/delete', (req, res) => {
    return res.status(200).json({msg: "Deleted successfully"});
});
module.exports = router;
