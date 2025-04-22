import React,{useState} from 'react'
import {Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: "" })
  const navigate = useNavigate();

  const host = "http://localhost:5000"
  const handleSubmit = async (e) => {

    e.preventDefault()
    if(credentials.password !== credentials.cpassword){
      return props.showAlert("passwords do not match","danger")
    }
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      //save the auth-token and redirect
      localStorage.setItem('token', json.authtoken)
      props.showAlert("Signup successful", "success")
      navigate('/')
    } else {
      props.showAlert("Invalid Credentials", "Danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className='my-4'>
      <h2>Welcome to NoteGalaxy !</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="name" className="form-label">Name</label>
          <input onChange={onChange} type="text" className="form-control" id="name" name='name' aria-describedby="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input onChange={onChange} type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input onChange={onChange} type="password" className="form-control" id="password" name="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input onChange={onChange} type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <div>Already have an account ? <Link to='/login'>Login</Link></div>
      </form>
    </div>
  )
}

export default Signup