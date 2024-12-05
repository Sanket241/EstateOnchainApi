# Estate Onchain API

A RESTful API for managing real estate users with blockchain integration, KYC verification, and role-based access control.

## Features

- User registration and authentication
- JWT-based authorization
- Role-based access control (Admin/User)
- KYC verification system
- Ethereum address integration
- Advanced user search with filtering and sorting
- API key protection for specific endpoints
- MongoDB integration
- Error handling and input validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd estate-onchain-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
API_KEY=1234
```

4. Seed the database with sample data:
```bash
npm run seed -- -i
```

## API Endpoints

### Public Endpoints

#### Register User
- **POST** `/api/users/register`
- **Headers**: Content-Type: application/json
- **Body**:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "ethAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "country": "Test Country",
  "state": "Test State",
  "address": "Test Address",
  "kycType": "passport",
  "kycId": "TEST123",
  "realEstateInfo": "Sample real estate info"
}
```

#### Login
- **POST** `/api/users/login`
- **Headers**: Content-Type: application/json
- **Body**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

### Protected Endpoints (Requires JWT Token)

#### Search Users
- **GET** `/api/users/search`
- **Headers**: 
  - Authorization: Bearer {token}
- **Query Parameters**:
  - search: Search term
  - country: Filter by country
  - state: Filter by state
  - kycType: Filter by KYC type
  - isVerified: Filter by verification status
  - sortBy: Field to sort by
  - order: asc/desc
  - page: Page number
  - limit: Results per page

#### Update User
- **PUT** `/api/users/:id`
- **Headers**: 
  - Authorization: Bearer {token}
  - Content-Type: application/json

#### Logout
- **POST** `/api/users/logout`
- **Headers**: Authorization: Bearer {token}

### Admin Endpoints

#### Verify User
- **PATCH** `/api/users/:userId/verify`
- **Headers**: 
  - Authorization: Bearer {token} (admin token)
  - Content-Type: application/json
- **Body**:
```json
{
  "isVerified": true
}
```

### API Key Protected Endpoints

#### Find User by ETH Address
- **GET** `/api/users/eth/:ethAddress`
- **Headers**: X-API-Key: 1234

## Testing

### Admin Account
- Email: malinda.murazik@yahoo.com
- Password: password123

### Sample cURL Commands

1. Register:
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\",\"ethAddress\":\"0x742d35Cc6634C0532925a3b844Bc454e4438f44e\",\"country\":\"Test Country\",\"state\":\"Test State\",\"address\":\"Test Address\",\"kycType\":\"passport\",\"kycId\":\"TEST123\",\"realEstateInfo\":\"Sample real estate info\"}"
```

2. Login:
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error

## Development

1. Start the server in development mode:
```bash
npm run dev
```

2. To reset the database with sample data:
```bash
# Import data
npm run seed -- -i

# Delete all data
npm run seed -- -d
```

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- API key protection
- Input validation
- Role-based access control
- KYC verification system

## Project Structure

```
estate-onchain-api/
├── config/
│   ├── database.js
├── controllers/
│   ├── userController.js
├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   ├── validators.js
├── models/
│   ├── User.js
├── routes/
│   ├── userRoutes.js
├── .env
├── package.json
├── README.md
├── seeder.js
└── server.js
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
