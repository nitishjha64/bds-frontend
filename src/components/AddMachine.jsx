import { useEffect, useState } from "react";

import Form from 'react-bootstrap/Form';
import Header from "./Header";
import LoaderCustom from "./LoaderCustom";
import Select from 'react-select';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import {showToastMessage} from '../utils/helper'
import { useNavigate } from "react-router-dom";

const AddMachine = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({name: '', voltage_resistance : '', link_en : '', link_ger : '', brand_id : '', observation : '', image : '', electronic_circuit_board: 0})
    const [loading, setLoading] = useState(true);
    const [brandData, setBrandData] = useState([])
    const animatedComponents = makeAnimated();
    const [selected, setSelected] = useState();
    const [btnLoader, setBtnLoader] = useState(false);

    useEffect(() => {
        (async() => {
            await fetchBrand()
        })()
        return () => console.log("Cleanup..");
    }, [])

    

    const fetchBrand = async () => {
        let brandArr = []
        setLoading(true)
        if(localStorage.getItem('token')){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/brands`,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
            response.data.data.forEach(element => {
                brandArr.push({label: element.name, id: element.id})
            });
            setBrandData(brandArr)
        } else {
            showToastMessage('error', 'Token expired please login', navigateToLogin)
        }
        setLoading(false);
    }

    const handleFileChange = async(e) => {
        let uploadedFile = e.target.files[0]
        const form = new FormData();
        form.append('file', uploadedFile);
        const fileData = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, form, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
        setData({...data, image : fileData.data.path})
    }

    const saveData = async(event) => {
        try {
            event.preventDefault()
            setBtnLoader(true)
            const responseData = await axios.post(`${process.env.REACT_APP_API_URL}/machine`, data, {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            })
            if(responseData.status === 201){
                showToastMessage('success', 'Machine added successfully!', navigateToHome)
                // navigate('/')
            }
            if(responseData.status === 401){
                showToastMessage('error', 'Token expired please login', navigateToLogin)
                // navigate('/')
            }
            else {
                setBtnLoader(false)
                showToastMessage('error', 'Machine could not be added please try again!')
            }
        } catch (error) {
            setBtnLoader(false)
            console.error(error)
            showToastMessage('error', 'Machine could not be added please try again!')
        }
    }

    const navigateToHome = () => {
        navigate('/')
    }

    const navigateToLogin = () => {
        navigate('/login', {replace: true});
    }

    const handleChange = (event) => {
        let value = event.target.value
        if(event.target.name === 'electronic_circuit_board')
        {
            value = parseInt(value)
        }
        let dataObj = {...data, [event.target.name] : value}
        setData(dataObj)
    }
    const onChangeSelect2 = (
        selectedOptions
      ) => {
        setSelected(selectedOptions)
        setData({...data, brand_id: selectedOptions.id})
      };

    const onBackClick = (event) => {
        event.preventDefault()
        navigate('/')
    }

    if(!loading){
        return (
            <>
                <Header />
                <div className="main-container" id="container">
                    <div className="overlay"></div>
                    <div className="search-overlay"></div>
                    <div id="content" className="main-content">
                        <div className="layout-px-spacing">
                            <div className="middle-content container-xxl p-0">
                                <div className="row layout-top-spacing ">
                                    <div className="top-tabel">
                                        <div className="row">
                                            <div className="col-md-4 left">
                                            </div>
                                            <div className="col-md-8 float-right" onClick={onBackClick}>
                                                <a className="extra-btn">
                                                    <img className="back-btn" src="/static/left-arrow.svg" />
                                                    Back
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-10 col-lg-10 col-sm-10  layout-spacing">
                                        <div className="br-8 position-btn">
                                            <div className="view-details">
                                                <div className="simple-tab">
                                                    <h3 className="inner-title">MASCHINE HINZUFÜGEN</h3>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="mb-4">
                                                                <label className="form-label">MASCHINENTYP</label>
                                                                <input type="text" className="form-control" value={data.name} name="name" onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-4">
                                                                <label className="form-label">VOLT</label>
                                                                <input type="text" className="form-control" value={data.voltage_resistance}  name="voltage_resistance" onChange={handleChange} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-4">
                                                                <label className="form-label">Beobachtungen</label>
                                                                <input type="text" className="form-control" value={data.observation} name="observation" onChange={handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-4">
                                                                <label className="form-label">MARKE</label>
                                                                <Select id="single"
                                                                className="react-select-container"
                                                                classNamePrefix="react-select"
                                                                closeMenuOnSelect={true}
                                                                isClearable
                                                                components={animatedComponents}
                                                                options={brandData} 
                                                                value={selected}
                                                                onChange={onChangeSelect2}
                                                                name="brand"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-4">
                                                                <label className="form-label">ENGLISCHER WEBSITE-LINK</label>
                                                                <input type="url" className="form-control" value={data.link_en} name="link_en" onChange={handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-4">
                                                                <label className="form-label">DEUTSCHER WEBSITE-LINK</label>
                                                                <input type="url" className="form-control" value={data.link_ger} name="link_ger" onChange={handleChange}/>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="">
                                                                <label className="form-label">PRODUKTFOTO</label>
                                                                <div className="profile-image">
                                                                    <div className="img-uploader-content">
                                                                        {/* <input type="file" onChange={handleFileChange} name="file" accept="image/png, image/jpeg, image/gif" value={form.file}/> */}
                                                                        <Form.Control type="file" onChange={handleFileChange} name="file" accept="image/png, image/jpeg, image/gif" />
                                                                    </div>
                                                                    {data.image && (
                                                                        <img src={`${process.env.REACT_APP_API_URL}/${data.image}`} width={200} height={200} style={{objectFit: 'contain'}}/>
                                                                    )}
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <div className="machine_radio">
                                                                <label className="form-label">ELEKTRONISCHE LEITERPLATTE</label>
                                                                <Form.Check type="radio" name="electronic_circuit_board" id={`electronic_circuit_board`} label="Yes" value={1} onChange={handleChange} checked={data.electronic_circuit_board === 1} />
                                                                <Form.Check type="radio" name="electronic_circuit_board" id={`electronic_circuit_board`} label="No" value={0} onChange={handleChange} checked={data.electronic_circuit_board === 0} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <button onClick={saveData} type="button" className="submit-btn" disabled={btnLoader ? true: false}>Save</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <>
                <Header />
                <div className="main-container" id="container">
                    <div className="row vertical-center">
                        <div className="col-md-6 offset-md-3">
                            <LoaderCustom class="text-center" active={true} text="" />   
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default AddMachine