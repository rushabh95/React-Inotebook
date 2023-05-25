import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [details, setDetails] = useState({ name: "", email: "", password: "",confirmPassword:"" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault()
        const response = await fetch(`http://localhost:7080/api/v1/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: details.name, email: details.email, password: details.password })
        },
        );
        const json = await response.json()
        if (json.success) {
            navigate("/login")
            props.showAlert({msg:"SignUp successful", type:"success"})
        } else {
            props.showAlert({msg:"Invalid Credentials", type:"danger"})
        }
    }

    const onChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }
    return (
        <div className="container col-lg-6 my-3">
            <h2>Create INoteBook Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" onChange={onChange} aria-describedby="emailHelp" name="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name = "email" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={onChange} name="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmPassword" onChange={onChange} name="confirmPassword" />
                </div>
                <div className="container col-lg-3">
                    <button  type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp
