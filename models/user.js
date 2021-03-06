const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        date: { type: Date, default: Date.now },
        role:{ type: String, required: true },
        nameFirst:{ type: String, required: false },
        nameLast:{ type: String, required: false },
        vesselName:{ type: String, required: false },
        vesselEmail:{ type: String, required: false },
        position:{ type: String, required: false },
        phoneNumber: {type: Number, required: false},
        profilePicture:{type: String, required: false }
    }  
);

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compareSync(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;