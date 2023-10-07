import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="submit" value="LogIn" />

      <p>Don't have an Account? <Link to="/register">SignUp</Link> here.</p>
    </div>
  )
}
