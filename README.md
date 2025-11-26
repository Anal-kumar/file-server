# Secure File Server

A full-stack secure file server application with user authentication, file management, and network access capabilities. Built with React, Node.js, and Material-UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.0-blue.svg)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 📁 **File Management** - Upload, download, rename, and delete files
- 🌐 **Network Access** - Access from any device on your local network
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Modern UI** - Beautiful Material-UI interface with gradient themes
- 🔒 **Security** - CORS, rate limiting, Helmet security headers
- ⚡ **Fast** - Built with Vite for lightning-fast development and builds

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/secure-file-server.git
cd secure-file-server
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
cd ..
```

4. **Configure environment variables**

Create `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Create `server/.env` file:
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
```

5. **Start the application**

In one terminal (backend):
```bash
cd server
npm start
```

In another terminal (frontend):
```bash
npm run dev
```

6. **Access the application**
- Local: `http://localhost:5173`
- Network: `http://YOUR_IP:5173`

## 📁 Project Structure

```
secure-file-server/
├── server/                 # Backend (Node.js + Express)
│   ├── config/            # Database configuration
│   ├── middleware/        # Authentication middleware
│   ├── routes/            # API routes
│   ├── uploads/           # Uploaded files (auto-created)
│   ├── .env              # Backend environment variables
│   └── server.js         # Main server file
│
├── src/                   # Frontend (React + Material-UI)
│   ├── components/       # Reusable components
│   ├── context/          # React context (Auth)
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
│
├── public/               # Static assets
├── .env                  # Frontend environment variables
├── package.json          # Frontend dependencies
└── README.md            # This file
```


## 🌐 Network Access

To access the file server from other devices on your network:

1. The backend will display your network IP when it starts
2. Access from any device: `http://YOUR_IP:5173`
3. Make sure both devices are on the same Wi-Fi network

### Firewall Configuration (Windows)

If other devices can't connect, allow the ports through Windows Firewall:

```powershell
# Run PowerShell as Administrator
New-NetFirewallRule -DisplayName "File Server Backend" -Direction Inbound -LocalPort 5000 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "File Server Frontend" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow
```

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with 10 salt rounds
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **CORS Protection** - Configurable origin restrictions
- **Helmet Security** - HTTP security headers
- **File Validation** - Size limits and type checking
- **User Isolation** - Users can only access their own files

## 📱 Mobile Responsive

The application is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

Features on mobile:
- Simplified navigation
- Touch-friendly buttons
- Optimized file list view
- Responsive forms

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Dropzone** - File upload
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **SQLite** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **Helmet** - Security headers

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Files
- `POST /api/files/upload` - Upload files (authenticated)
- `GET /api/files` - List user's files (authenticated)
- `GET /api/files/download/:id` - Download file (authenticated)
- `DELETE /api/files/:id` - Delete file (authenticated)
- `PUT /api/files/rename/:id` - Rename file (authenticated)

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**
   - Change `JWT_SECRET` to a strong random string
   - Set `NODE_ENV=production`
   - Update CORS origins

2. **HTTPS**
   - Use SSL/TLS certificates (Let's Encrypt)
   - Configure reverse proxy (nginx/Apache)

3. **Database**
   - Consider PostgreSQL or MySQL for production
   - Implement regular backups

4. **File Storage**
   - Use cloud storage (AWS S3, Google Cloud Storage)
   - Implement CDN for static assets

5. **Monitoring**
   - Add logging (Winston, Morgan)
   - Set up health checks
   - Monitor server metrics

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

If you have any questions or issues, please open an issue on GitHub.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- UI components from [Material-UI](https://mui.com/)

---

Made with ❤️ using React and Node.js
# file-server
# file-server
# file-server
# file-server
# file-server
# file-server
# file-server
# file-server
# file-server
# file-server
# file-server
# file-server
