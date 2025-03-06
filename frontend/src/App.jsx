import { useState } from 'react'
import LoginPage from './components/LoginPage'
import ChatPage from './components/ChatPage'
import { Routes, Route } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        
      </Routes>
        
    </>
  )
}

export default App
