const mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    hash: {
        type: String
    },
    salt: {
        type: String
    }
},{
    timestamps: true
});


userSchema.statics.findUserById = (uid) => {
    return this.find({_id: uid});
}

userSchema.statics.findUserByEmail = (email) => {
    return this.find({email: email});
}

userSchema.statics.verifyUserById = (id, done) => {
    this.findOne({_id: id}, (err, user) => {
        if(err){
            return done(err, false);
        }
        else if(user){
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}

module.exports = mongoose.model('User', userSchema);