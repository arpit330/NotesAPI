const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model('Users', UserSchema);

async function isMailUsed(emailInput) {
    const userFetched = await User.findOne({ email: emailInput });
    return (userFetched != null);
}


module.exports = {
    User,
    isMailUsed
};


