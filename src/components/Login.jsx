import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

function Login() {
  const navigate = useNavigate();
  const [inputParams, setInputparams] = useState({username: '', password: ''})

  const handleChange = (e) =>{
    setInputparams({...inputParams, [e.target.name]: e.target.value})
  }

  const handleLoginClick = async() => {
    try{
        let isValidLogin = true
        Object.keys(inputParams).map((key) => {
            if(!inputParams[key]){
                isValidLogin = false
            }
        })
        if(!isValidLogin) {
            alert("Invalid login details")
            return false
        }
        const data = await axios.post(process.env.REACT_APP_API_URL + '/login', inputParams)
        if(data.status === 200){
            localStorage.setItem('token', data.data.token)
            navigate('/');
        }
    } catch(err){
        console.error(err)
    }
  }

  return (
    <>
      <div className="auth-container d-flex signup">
    <div className="container mx-auto align-self-center row">
        <div className="card col-md-6 m-auto">
            <div className="row">
                <div className="col-md-12 mb-3 logo">
                    <img src={`/static/bds-logo.png`} />
                </div>
                <div className="col-md-12 mb-3">
                    <h2>LOGIN</h2>
                </div>
                <div className="col-md-12">
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input name="username" value={inputParams.username} required={true} type="email" className="form-control" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="mb-3">
                        <label className="form-label">Passwort</label>
                        <input name="password" value={inputParams.password} type="password" className="form-control" onChange={handleChange} />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="mb-4">
                        <button onClick={handleLoginClick} className='download-btn w-100'>Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
  )
}

export default Login