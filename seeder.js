const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample user data
const users = [
  {
    name: 'Admin User',
    email: 'malinda.murazik@yahoo.com',
    password: 'password123',
    ethAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    country: 'United States',
    state: 'California',
    address: '123 Tech Street, Silicon Valley',
    kycType: 'passport',
    kycId: 'PASS123',
    realEstateInfo: 'Admin user with multiple properties',
    isVerified: true,
    role: 'admin'
  },
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    ethAddress: '0x9876543210fedcba9876543210fedcba98765432',
    country: 'United States',
    state: 'New York',
    address: '456 Broadway Ave',
    kycType: 'passport',
    kycId: 'PASS456',
    realEstateInfo: 'Owns residential properties',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password123',
    ethAddress: '0x1234567890abcdef1234567890abcdef12345678',
    country: 'Canada',
    state: 'Ontario',
    address: '789 Maple Street',
    kycType: 'passport',
    kycId: 'PASS789',
    realEstateInfo: 'Commercial property investor',
    isVerified: false,
    role: 'user'
  },
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'password123',
    ethAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    country: 'United Kingdom',
    state: 'London',
    address: '321 Oxford Street',
    kycType: 'passport',
    kycId: 'PASS321',
    realEstateInfo: 'International real estate developer',
    isVerified: true,
    role: 'user'
  },
  {
    name: 'Bob Wilson',
    email: 'bob.wilson@example.com',
    password: 'password123',
    ethAddress: '0x5432109876fedcba5432109876fedcba54321098',
    country: 'Australia',
    state: 'New South Wales',
    address: '654 Sydney Road',
    kycType: 'passport',
    kycId: 'PASS654',
    realEstateInfo: 'Residential property manager',
    isVerified: false,
    role: 'user'
  }
];

// Import data into database
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    console.log('Existing data cleared...');

    // Hash passwords for all users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return user;
      })
    );

    // Insert new data
    await User.insertMany(hashedUsers);
    console.log('Sample data imported successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete all data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('All data deleted successfully!');
    process.exit();
  } catch (error) {
    console.error('Error deleting data:', error);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use correct command:');
  console.log('npm run seed -- -i  (to import data)');
  console.log('npm run seed -- -d  (to delete data)');
  process.exit();
}
