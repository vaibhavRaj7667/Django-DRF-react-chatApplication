# Django-DRF-React Chat Application

## Overview
This is a real-time chat application built using Django REST Framework (DRF) for the backend and React for the frontend. The application allows users to register, log in, and participate in private. Messages are sent and received in real time using WebSockets.

## Features
- User registration and authentication
- Real-time messaging using Django Channels
- One-to-one and group chat support
- Chat history and message persistence
- Responsive and clean UI built with React
- RESTful APIs for managing users, messages, and chats
- Token-based authentication (JWT)

## Technologies Used
- **Backend:** Django, Django REST Framework, Django Channels
- **Frontend:** React.js, Axios
- **WebSockets:** Django Channels, Redis
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** PostgreSQL / SQLite (configurable)

## Screenshots
![Screenshot 2025-04-12 184008](https://github.com/user-attachments/assets/27dacd99-26fa-4906-ae19-4a6dff8d459d)

![Screenshot 2025-04-12 184018](https://github.com/user-attachments/assets/da911543-762a-4118-8eca-ac371323e230)


## Installation Guide

### Prerequisites
- Python 3.x
- Node.js and npm
- Redis (for WebSocket support)

### Backend Setup (Django-DRF)
1. Clone the repository:
   ```bash
   git clone https://github.com/vaibhavRaj7667/Django-DRF-react-chatApplication
   cd django-drf-react-chat/backend
   ```
2. Create and activate virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # Windows: env\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations and create a superuser:
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```
5. Start Redis server (must be installed beforehand):
   ```bash
   redis-server
   ```
6. Run Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React)
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install React dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```

### Access the App
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/api/`

## Folder Structure
```
project-root/
├── backend/       # Django backend
│   └── chat/      # Chat app and routing
├── frontend/      # React frontend
```

## Future Enhancements
- Add notifications for new messages
- Typing indicators
- Message reactions and read receipts
- Support for media messages (images, files)

## License
This project is licensed under the MIT License.

## Contact
For questions or contributions, reach out:
- Email: zivaibhav1@gmail.com
- GitHub: https://github.com/vaibhavRaj7667

