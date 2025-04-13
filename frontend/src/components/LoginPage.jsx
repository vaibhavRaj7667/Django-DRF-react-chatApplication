import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { LoginState, SignupState } from "../features/loginState/LoginSlice"
import "../stylesheet/LoginPage.css"
import image1 from '../static/image1.png'


const LoginPage = () => {
  const login_ = useSelector((state) => state.login.mode)
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [register, setRegister] = useState({ username: "", email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!loginData.username || !loginData.password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: loginData.username,
        password: loginData.password,
      })

      localStorage.setItem("access_token", response.data.access)
      localStorage.setItem("refresh_token", response.data.refresh)
      setLoginData({ username: "", password: "" })
      navigate("/chat")
    } catch (error) {
      setError("Invalid username or password")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async () => {
    if (!register.username || !register.email || !register.password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Replace with your actual registration endpoint
      await axios.post("http://127.0.0.1:8000/register/", register)
      setRegister({ username: "", email: "", password: "" })
      dispatch(LoginState())
    } catch (error) {
      setError("Registration failed. Please try again.")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-image">
          <img src={image1} alt="Login" />
        </div>

        <div className="login-form-container">
          <div className="form-header">
            <h1>{login_ === "login" ? "Welcome Back" : "Create Account"}</h1>
            <p className="form-subtitle">
              {login_ === "login" ? "Please enter your credentials to continue" : "Fill in your details to get started"}
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          {login_ === "login" ? (
            <div className="login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>

              <button
                className={`submit-button ${isLoading ? "loading" : ""}`}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>

              <div className="form-footer">
                <p>Don't have an account?</p>
                <button className="switch-form-button" onClick={() => dispatch(SignupState())}>
                  Register Now
                </button>
              </div>
            </div>
          ) : (
            <div className="register-form">
              <div className="form-group">
                <label htmlFor="reg-username">Username</label>
                <input
                  type="text"
                  id="reg-username"
                  placeholder="Choose a username"
                  value={register.username}
                  onChange={(e) => setRegister({ ...register, username: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={register.email}
                  onChange={(e) => setRegister({ ...register, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <input
                  type="password"
                  id="reg-password"
                  placeholder="Create a password"
                  value={register.password}
                  onChange={(e) => setRegister({ ...register, password: e.target.value })}
                />
              </div>

              <button
                className={`submit-button ${isLoading ? "loading" : ""}`}
                onClick={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>

              <div className="form-footer">
                <p>Already have an account?</p>
                <button className="switch-form-button" onClick={() => dispatch(LoginState())}>
                  Login here
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
