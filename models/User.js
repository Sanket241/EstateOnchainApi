const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  ethAddress: {
    type: String,
    required: [true, 'Ethereum address is required'],
    unique: true
  },
  country: {
    type: String,
    required: [true, 'Country is required']
  },
  state: {
    type: String,
    required: [true, 'State is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  kycType: {
    type: String,
    required: [true, 'KYC type is required'],
    enum: ['pancard', 'passport', 'aadhar card']
  },
  kycId: {
    type: String,
    required: [true, 'KYC ID is required']
  },
  realEstateInfo: String,
  estateCost: {
    type: Number,
    required: [true, 'Estate cost is required']
  },
  percentageToTokenize: {
    type: Number,
    required: [true, 'Percentage to tokenize is required']
  },
  verifierEthAddress: {
    type: String,
    required: [true, 'Verifier Ethereum address is required']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Add indexes for searching
userSchema.index({ name: 'text', country: 'text', state: 'text' });

const User = mongoose.model('User', userSchema);

module.exports = User;
