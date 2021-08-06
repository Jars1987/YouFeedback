const mongoose = require('mongoose');
const {Schema} = mongoose;

//module I combined to obtain all the user passport strategys in one record 
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  google : {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    }
  }

});





/* Model obtained from a course that gives you one reccord for each strategy
const UserSchema = new Schema({
  method: {
    type: String,
    required: true,
    enum: ['google', 'facebook']
  },
  google : {
    googleId: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    facebookId: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true
    }
  }

});
*/


module.exports = mongoose.model('User', UserSchema);


