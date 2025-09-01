# 🍕 FoodExpress - Full Stack Food Ordering Application

A modern, responsive food ordering platform built with React.js frontend and Node.js backend. Features include user authentication, admin panel, food management, and order processing.

![FoodExpress Logo](https://via.placeholder.com/800x200/FF6B6B/FFFFFF?text=FoodExpress+-+Delicious+Food+Delivered)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Admin Features](#admin-features)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔥 Core Features
- **User Authentication** - Firebase Auth with Google Sign-in
- **Food Browsing** - Browse and view detailed food items
- **Order Management** - Place and track orders
- **Admin Panel** - Complete admin dashboard for food management
- **Responsive Design** - Mobile-first responsive UI
- **Real-time Notifications** - Toast notifications for user feedback

### 👤 User Features
- Browse food menu with categories
- View detailed food information
- Add items to cart and place orders
- User profile management
- Order history tracking

### 🔐 Admin Features
- Admin dashboard with statistics
- Add new food items
- Manage existing food items (Edit/Delete)
- View and manage orders
- User management capabilities

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI Library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Firebase** - Authentication & Database
- **React Toastify** - Notifications
- **Axios** - HTTP Client

### Backend
- **Node.js** - Runtime Environment
- **Express.js** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment Variables

### Tools & Services
- **Firebase Auth** - User Authentication
- **Firestore** - User Data Storage
- **MongoDB Atlas** - Cloud Database
- **Vite** - Build Tool

## 📁 Project Structure

```
FoodExpress/
├── FrontEnd/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navber.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AddFood.jsx
│   │   │   ├── ManageFoods.jsx
│   │   │   ├── Order_Fixed.jsx
│   │   │   └── firebase.js
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Food.jsx
│   │   │   ├── Fooddetails.jsx
│   │   │   ├── About.jsx
│   │   │   └── Contact.jsx
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── BackEnd/
│   ├── Controllers/
│   │   └── resControl.js
│   ├── Models/
│   │   └── foodSchema.js
│   ├── Routes/
│   │   └── foodRoute.js
│   ├── connection.js
│   ├── index.js
│   ├── package.json
│   └── .env
└── README.md
```

## ⚙️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Firebase account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/foodexpress.git
cd foodexpress
```

### 2. Backend Setup
```bash
cd BackEnd
npm install
```

Create a `.env` file in the BackEnd directory:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```

### 3. Frontend Setup
```bash
cd ../FrontEnd
npm install
```

### 4. Firebase Configuration
Create a `firebase.js` file in `src/components/`:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
```

## 🚀 Usage

### Starting the Application

1. **Start Backend Server**
```bash
cd BackEnd
npm start
# Server runs on http://localhost:4000
```

2. **Start Frontend Development Server**
```bash
cd FrontEnd
npm run dev
# Frontend runs on http://localhost:5173
```

### Default Admin Setup
To create an admin account:
1. Go to signup page
2. Select "Admin" account type
3. Use secret code: `ADMIN2024`
4. Complete registration

## 📡 API Endpoints

### Food Endpoints
```
GET    /foods          - Get all foods
GET    /foods/:id      - Get food by ID
POST   /foods          - Create single food
POST   /foods/add      - Create multiple foods
DELETE /foods/:id      - Delete food by ID
```

### Request Examples

**Get All Foods**
```bash
GET http://localhost:4000/foods
```

**Create Food**
```bash
POST http://localhost:4000/foods/add
Content-Type: application/json

{
  "name": "Margherita Pizza",
  "price": 12.99,
  "category": "Pizza",
  "image": "https://example.com/pizza.jpg",
  "description": "Fresh tomatoes, mozzarella, and basil"
}
```

**Delete Food**
```bash
DELETE http://localhost:4000/foods/60f7b8b8b8b8b8b8b8b8b8b8
```

## 👑 Admin Features

### Dashboard
- View total foods, orders, and users
- Quick action buttons
- System status monitoring

### Food Management
- **Add Food**: Create new food items with image, price, category
- **Manage Foods**: View all foods in a table format
- **Edit Food**: Update existing food information (coming soon)
- **Delete Food**: Remove foods with confirmation modal

### Access Control
- Role-based authentication
- Admin-only routes protection
- Visual admin indicators in navbar

## 🎨 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400/4ECDC4/FFFFFF?text=Home+Page+-+Hero+Section)

### Food Menu
![Food Menu](https://via.placeholder.com/800x400/45B7D1/FFFFFF?text=Food+Menu+-+Grid+Layout)

### Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/800x400/F7DC6F/000000?text=Admin+Dashboard+-+Statistics)

### Order Page
![Order Page](https://via.placeholder.com/800x400/BB8FCE/FFFFFF?text=Order+Page+-+Food+Details)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use Tailwind CSS for styling
- Add proper error handling
- Include loading states
- Write meaningful commit messages

## 🐛 Troubleshooting

### Common Issues

**Backend Connection Issues**
```bash
# Check if MongoDB is running
# Verify .env variables
# Ensure port 4000 is available
```

**Frontend Build Issues**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Firebase Authentication Issues**
```bash
# Verify Firebase configuration
# Check Firebase console settings
# Ensure proper domain configuration
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/foodexpress
# or MongoDB Atlas URI
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/foodexpress
```

### Frontend Environment Variables
Create `.env` in FrontEnd directory if needed:
```env
VITE_API_BASE_URL=http://localhost:4000
```

## 🔮 Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] Food reviews and ratings
- [ ] Advanced search and filters
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Inventory management
- [ ] Delivery tracking

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Firebase for authentication services
- MongoDB for database solutions
- Tailwind CSS for styling framework
- React community for excellent documentation
- All contributors who helped improve this project

---

## 📞 Support

If you have any questions or need help with setup, please:

1. Check the [Issues](https://github.com/yourusername/foodexpress/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

**Made with ❤️ by [Your Name]**

---

### 🎯 Quick Start Commands

```bash
# Clone and setup
git clone https://github.com/yourusername/foodexpress.git
cd foodexpress

# Backend
cd BackEnd && npm install && npm start

# Frontend (new terminal)
cd FrontEnd && npm install && npm run dev

# Visit: http://localhost:5173
```

**Happy Coding! 🚀**
