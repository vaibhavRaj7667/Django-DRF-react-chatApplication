import React, { useState } from 'react'
import '../stylesheet/LoginPage.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {

  const [login_, setlogin] = useState(true)
  const [loginData, setloginData] = useState({username: '', password:'' })
  const [Register, setRegister]= useState({username:'', email:'', password:''})
  const navigate = useNavigate()

  const handelLogin= async()=>{
    
    try {
      let response = await axios.post('http://127.0.0.1:8000/api/token/',{
        username:loginData.username,
        password:loginData.password
      })
      
      localStorage.setItem("access_token", response.data.access)
      localStorage.setItem("refresh_token", response.data.refresh)
      console.log("Login successful:", response.data);
      setloginData({username:'',password:''})
      navigate('/chat')
    } catch (error) {
      console.log(error)
    }
    
  }


  const register = async()=>{
    console.log(Register)
  }

  const handleClick = (e) => {
    e.preventDefault(); // Prevents page reload
    setlogin(!login_);
  };

  return (
    <div className='main'>

        <div className='picture'>

            <img src="https://i.pinimg.com/736x/37/33/fb/3733fbff6774ea8ad337d196d9d76a76.jpg" alt="" />

        </div>

        <div className='login-creditions'>
            {login_
            
            ? (
            <div className='login'>

              <h1>Login</h1>                
                <input type="text" placeholder='Username' id='text' value={loginData.username} onChange={(e)=> setloginData({...loginData, username: e.target.value})} />
                <input type="password" placeholder='Password' id='password' onChange={(e)=>setloginData({...loginData, password: e.target.value})}/>

                <button className='login-button' onClick={handelLogin}>Login</button>

                <p>Don't have an account</p>
                <button className='ternary-button' onClick={handleClick}>Register Now</button>
            </div>
            )

             :
              (
            <div className='register'>
              <h1>Sign up</h1>
              <input type="text" placeholder='Username' value={Register.username} onChange={(e)=>setRegister({...Register, username:e.target.value})}/>
              <input type="email" placeholder='Email' value={Register.email} onChange={(e)=>setRegister({...Register, email:e.target.value})}/>
              <input type="password"  placeholder='Password' value={Register.password} onChange={(e)=>setRegister({...Register, password:e.target.value})}/>
              <button className='Register_button' onClick={register}>Register</button>

             
              <p>Already have an account</p>
              <button className='link-like' onClick={handleClick}>Login here</button>
              
            </div>
              )
             
             }

        </div>
        
    </div>
  )
}

export default LoginPage
