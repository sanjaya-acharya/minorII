import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div>
      <h1>SignUp</h1>
      <input type="email" name="email" />
      <input type="password" name="password" />
      <input type="submit" value="signup" />

      <p>Already have an Account? <Link to="/login">LogIn</Link> here.</p>
    </div>
  )
}
