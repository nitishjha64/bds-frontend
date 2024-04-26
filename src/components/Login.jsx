import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import { ToastContainer } from "react-toastify";
import axios from "axios"
import {showToastMessage} from '../utils/helper'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({username: '', password: ''});
  const [inputParams, setInputparams] = useState({username: '', password: ''})
  const [btnLoader, setBtnLoader] = useState(false)


  const handleChange = (e) =>{
    const value = e.target.value
    const name = e.target.name
    setInputparams({...inputParams, [name]: value})
    const newErrors = validateForm(inputParams);
    setErrors(newErrors);

    
    
  }

  const validateForm = (data) => {
    const errors = {};

    if (!data.username.trim()) {
        errors.username = 'E-Mail ist erforderlich';
    } else if (!/\S+@\S+\.\S+/.test(data.username)) {
        errors.username = 'Email is invalid';
    }

    if (!data.password) {
        errors.password = 'Passwort ist erforderlich';
    }

    return errors;
};

  const handleLoginClick = async() => {
    try{
        setBtnLoader(true)
        const data = await axios.post(process.env.REACT_APP_API_URL + '/login', inputParams)
        if(data.status === 200){
            localStorage.setItem('token', data.data.token)
            // showToastMessage('success', "Logged In successfully", navigateToHome, 500)
            navigateToHome()
        }
    } catch(error){
        setBtnLoader(false)
        console.error(error)
        if (axios.isAxiosError(error)) {
            // const response = error?.response
            setErrors({username : 'E-Mail ist ungültig', password: 'Passwort ist ungültig'});
        } else{
            showToastMessage('error', "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.")
        }
    }
  }

    const navigateToHome = () => {
        navigate('/')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateForm(inputParams);
        setErrors(newErrors);
 
        if (Object.keys(newErrors).length === 0) {
            // Form submission logic here
            await handleLoginClick()
        }
    };

  return (
    <>
  
        <div className="auth-container d-flex signup">
            <div className="container mx-auto align-self-center row">
                <Form noValidate onSubmit={handleSubmit}  className='col-md-12'>
                    <div className="card col-md-6 m-auto">
                        <div className="row">
                            <div className="col-md-12 mb-3 logo">
                                <img src={`/static/bds-logo.png`} />
                            </div>
                            <div className="col-md-12 mb-3">
                                <h2>einloggen</h2>
                            </div>
                            {/* <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input name="username" value={inputParams.username} required={true} type="email" className="form-control" onChange={handleChange} />
                                </div>
                            </div> */}
                            <Form.Group as={Col} md="12" className='mb-3' controlId="validationCustom01">
                                <Form.Label>E-Mail</Form.Label>
                                <Form.Control name="username" value={inputParams.username} type="email" required onChange={handleChange} />
                                {errors.username && 
                                    <span className="error-message">
                                        {errors.username}
                                    </span>
                                }
                            </Form.Group>
                            <Form.Group as={Col} md="12" className='mb-3' controlId="validationCustom02">
                                <Form.Label>Passwort</Form.Label>
                                <Form.Control name="password" value={inputParams.password} type="password" required onChange={handleChange} />
                                {errors.password && 
                                    <span className="error-message">
                                        {errors.password}
                                    </span>
                                }
                            </Form.Group>
                            <div className="col-md-12">
                                <div className="mb-4">
                                    <button type="submit" disabled={btnLoader ? true : false} className='download-btn w-100'>einloggen</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        <ToastContainer />
    </>
  )
}

export default Login