import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate= useNavigate();

    const host= "http://localhost:5000"
    const handleSubmit=async(e)=>{
        
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json= await response.json()
          console.log(json)
          if(json.success){
            //save the auth-token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Loggin successful", "success")
            navigate('/')
            
          }else{
            props.showAlert("Invalid Credentials", "danger")
          }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    } 

    return (
        <div className='my-4'>
            <h2>Welcome back ! Explore Your Notes</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 my-5">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control" id="email" name='email' value={credentials.email} aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control" value={credentials.password} id="password" name='password'/>
                </div>

                <button type="submit" className="btn btn-success">Submit</button>
                <div>Don't have an account ? <Link to='/signup'>signup</Link></div>
            </form>
        </div>
    )
}

export default Login