const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    location: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        unique: false,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        match: [/.+@.+\..+/, "Must match an email address!"],
    },
    password: {
        type: String,
        required: false,
        unique: false,
        minlength: 5,
    }
})

// Set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
    if (this.isNew || this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  });
  
// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

const Pet = model('User', userSchema);

module.exports = User;