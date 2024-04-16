import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import style from './SignUp.module.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase'
import { UserContext } from '../main';
import { useOutletContext } from "react-router-dom"

export default function LogIn( { data }) {
    const [formData, setFormData] = useState({email:"", password:""});
    const [ submit, setSubmit ] = useState(true);
    const navigate = useNavigate();

    const msg = useOutletContext()

    const [userL, setUserL] = useContext(UserContext);
    
 
    function handleChange(e){
      setFormData((pre) => ({
        ...pre,
        [e.target.id]: e.target.value
      }))
    }

    const email = formData.email;
    const password = formData.password;

    const handleSubmit = (e) => {
        e.preventDefault()
        async function logInData(){
            setSubmit(false)
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
            const user = userCredential.user;
            setSubmit(true)
            setUserL(user.uid)
            navigate("/recipes")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode,errorMessage);
            });
        }
        logInData();
    }


  return (
    <div className={style.logInForm}>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" 
                    className="form-control" 
                    id="email" 
                    aria-describedby="emailHelp"
                    value={formData.email} 
                    placeholder='Enter your email Id'
                    onChange={handleChange}
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" 
                    className="form-control" 
                    id="password" 
                    value={formData.password} 
                    placeholder='Enter password'
                    onChange={handleChange}
            />
        </div>
    
        <button type="submit" 
                className="btn btn-primary" 
                disabled={!submit}
        >
          {submit ? "Submit" : "submitting"}
        </button>
    </form>
    </div>
  )
}
