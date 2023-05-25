import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        
        e.preventDefault()
        const response = await fetch(`http://localhost:7080/api/v1/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password}) 
        },
        );
        const json = await response.json()
        if(json.success){
            localStorage.setItem('token',json.data.token)
            props.showAlert({msg:"Login Successful", type:"success"})
            navigate("/")
        }else{
            props.showAlert({msg:"Invalid Credentials", type:"danger"})
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    return (
        <>
            <div className="container col-lg-6 my-3">
                <h2>Login To INoteBook Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-lg-8 mb-3">
                        <label htmlFor="email" className="form-label">User Email</label>
                        <input type="email" className="form-control" id="email" name="email" value = {credentials.email}  onChange={onChange} />
                    </div>
                    <div className=" col-lg-8 mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input className="form-control" type="password" id="password" name="password" value = {credentials.password} onChange={onChange}></input>
                    </div>
                    <div className="container col-lg-6 mb-3">
                        <button type="submit" className="btn btn-primary mb-3" >Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
