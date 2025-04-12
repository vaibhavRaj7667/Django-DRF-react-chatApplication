import { useState } from 'react'
import LoginPage from './components/LoginPage'
import ChatPage from './components/ChatPage'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path='/land' element={<LandingPage/>}/>
      </Routes>
        
    </>
  )
}

export default App
