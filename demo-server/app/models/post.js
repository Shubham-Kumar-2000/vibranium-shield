const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true
   },
    desc: {
       type: String
    },
    createdBy: {
       type: String
    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post