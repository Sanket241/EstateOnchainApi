const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const dummyUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    ethAddress: "0x1234567890123456789012345678901234567890",
    country: "United States",
    state: "California",
    address: "123 Main St, San Francisco, CA 94105",
    kycType: "passport",
    kycId: "P123456789",
    realEstateInfo: "Luxury Apartment in Downtown",
    isVerified: true,
    estateCost: 500000,
    percentageToTokenize: 60,
    verifierEthAddress: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef",
    role: "user"
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    password: "password123",
    ethAddress: "0x2345678901234567890123456789012345678901",
    country: "United Kingdom",
    state: "London",
    address: "456 High Street, London, UK",
    kycType: "passport",
    kycId: "P987654321",
    realEstateInfo: "Commercial Property",
    isVerified: true,
    estateCost: 750000,
    percentageToTokenize: 45,
    verifierEthAddress: "0x1234567890123456789012345678901234567890",
    role: "user"
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    password: "password123",
    ethAddress: "0x3456789012345678901234567890123456789012",
    country: "Canada",
    state: "Ontario",
    address: "789 Maple Ave, Toronto, ON",
    kycType: "pancard",
    kycId: "ABCDE1234F",
    realEstateInfo: "Residential Complex",
    isVerified: false,
    estateCost: 300000,
    percentageToTokenize: 30,
    verifierEthAddress: "0x9876543210987654321098765432109876543210",
    role: "user"
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    password: "password123",
    ethAddress: "0x4567890123456789012345678901234567890123",
    country: "Australia",
    state: "New South Wales",
    address: "321 Beach Road, Sydney",
    kycType: "aadhar card",
    kycId: "1234-5678-9012",
    realEstateInfo: "Beach House Property",
    isVerified: true,
    estateCost: 900000,
    percentageToTokenize: 75,
    verifierEthAddress: "0x1111111111111111111111111111111111111111",
    role: "user"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('Cleared existing users');

    // Hash passwords before inserting
    const bcrypt = require('bcryptjs');
    const hashedUsers = await Promise.all(
      dummyUsers.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      })
    );

    // Insert dummy users
    await User.insertMany(hashedUsers);
    console.log('Successfully added dummy users');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
