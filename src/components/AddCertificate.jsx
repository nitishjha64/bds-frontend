import { useEffect, useRef, useState } from "react";

import Form from 'react-bootstrap/Form';
import LoaderCustom from "./LoaderCustom";
import PrintCertificate from "./PrintCertificate";
import Select from 'react-select';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import {showToastMessage} from '../utils/helper'
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const AddCertificate = () => {
    const navigate = useNavigate();
    const certDataObj = {
        brand_id : '', 
        machine_id : '', 
        checked_by : '', 
        crowd : 1, 
        motor_switch : 'OK', 
        insulation_resistance : 'OK', 
        perpendicularity : 'OK', 
        accessories : 'OK', 
        observation : '230 Volt, 50-60Hz', 
        tolerance_of_spindle : 'OK', 
        guide : 'OK', 
        resistance_to_voltage : '1500 V', 
        technical_certification : 'OK', 
        origin_germany : 'GERMANY', 
        magnet_base_switch : 'OK', 
        isolation : 'OK', 
        electronic_circuit_board : '', 
        machine_image : '', 
        brand_image : '', 
        serial_no : '',
        machine_type: ''
    }
    const animatedComponents = makeAnimated();
    const [brandData, setBrandData] = useState([])
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState();
    const [machineSelected, setMachineSelected] = useState();
    const [machineSelectData, setMachineSelectData] = useState([])
    const [machineData, setMachineData] = useState([])
    const [certData, setCertData] = useState(certDataObj)
    const [printData, setPrintData] = useState({});
    const componentRef = useRef()
    const [errors, setErrors] = useState({})
    const [btnLoader, setBtnLoader] = useState(false);
    const [isMachineDisabled, setIsMachineDisabled] = useState(true)
    const [observationData] = useState([{label: '230 Volt, 50-60Hz', id: '230 Volt, 50-60Hz'}, {label: '110 Volt, 50-60Hz', id: '110 Volt, 50-60Hz'}])
    const [observationSelected, setObservationSelected] = useState();
    const [originData] = useState([{label: 'GERMANY', id: 'GERMANY'}, {label: 'INDIA', id: 'INDIA'}, {label: 'POLAND', id: 'POLAND'}]);
    const [originSelected, setOriginSelected] = useState();
    const scrollRef = useRef(null);


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
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/brands`,{
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                });
                response.data.data.forEach(element => {
                    brandArr.push({label: element.name, id: element.id, logo: element.logo, email: element.email, brand_website: element.website_link})
                });
                setBrandData(brandArr)
            } catch (error) {
                if(error.response.status === 403 || error.response.status === 401){
                    window.localStorage.removeItem('token')
                    navigate('/login', {replace: true})
                }
            }
        } else {
            showToastMessage('error', 'Token abgelaufen, bitte melden Sie sich an', navigateToLogin)
        }
        setLoading(false);
    }

    const navigateToLogin = () => {
        navigate('/login', {replace: true});
    }

    const fetchMachines = async(brandId)  => {
        setLoading(true);
        let machineArr = []
        if(localStorage.getItem('token')){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/machinesByBrand/${brandId}`,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
            setMachineData(response.data.data)
            response.data.data.forEach(element => {
                machineArr.push({label: element.name, id: element.id})
            });
            setIsMachineDisabled(false)
            setMachineSelectData(machineArr)
            
        } else {
            showToastMessage('error', 'Token abgelaufen, bitte melden Sie sich an', navigateToLogin)
        }
        
        setLoading(false);
    };

    const onChangeSelect2 = async(
        selectedOptions
      ) => {
        setSelected(selectedOptions)
        const newDataObj = {...certData, brand_id: selectedOptions.id, brand_email: selectedOptions.email, brand_website: selectedOptions.brand_website, brand_image: selectedOptions.logo}
        setCertData(newDataObj)
        await fetchMachines(selectedOptions.id)
        // const newErrors = validateCertData(newDataObj)
        // setErrors(newErrors)
      };

      const onChangeMachineSelect2 = (
        selectedOptions
      ) => {
        setMachineSelected(selectedOptions)
        const selectedMachine = machineData.find((machine) => {return machine.id === selectedOptions.id})
        const newDataObj = {...certData, machine_id: selectedOptions.id, machine_image: selectedMachine.image, electronic_circuit_board: selectedMachine.electronic_circuit_board, machine_type: selectedMachine.name}
        setCertData(newDataObj)
        // const newErrors = validateCertData(newDataObj)
        // setErrors(newErrors)
      };

      const handleChange = (event) => {
        let dataObj = {...certData, [event.target.name] : event.target.value}
        setCertData(dataObj)
        // const newErrors = validateCertData(dataObj)
        // setErrors(newErrors)
      }

      const validateCertData = (data) => {
        const errors = {};

        if (!data.brand_id) {
            errors.brand = 'Bitte wählen';
        }

        if (!data.machine_id) {
            errors.machine = 'Bitte wählen';
        }

        if (!data.checked_by || !data.checked_by.trim()) {
            errors.checked_by = 'Bitte EINGEBEN';
        }

        if (!data.crowd || !parseInt(data.crowd)>0) {
            errors.crowd = 'Bitte EINGEBEN';
        }

        return errors;
      }

      const saveCertificate = async() => {
        try{
            const newErrors = validateCertData(certData)
            setErrors(newErrors)
            scrollRef.current?.scrollIntoView({behavior: 'smooth'});
            if (Object.keys(newErrors).length === 0) {
                setBtnLoader(true)
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/certificate`, certData, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                })
                setPrintData(response.data[0])
            }
        } catch(error){
            setBtnLoader(false)
            console.log(error)
        }
        
      }

      const onChangeSelect4 = (
        e
      ) => {
        const selectedOption = e.target.value
        setOriginSelected(selectedOption)
        certData.origin_germany = selectedOption
      };

      const onChangeSelect3 = (
        e
        ) => {
          const selectedOption = e.target.value
        setObservationSelected(selectedOption)
        certData.observation = selectedOption
      };

      useEffect(() => {
        if(printData && Object.keys(printData).length > 0){
            console.log('printData', printData)
            handlePrint(null, () => componentRef.current);
        }
      }, [printData])

      const handlePrint = useReactToPrint({
        // documentTitle: "Print This Document",
        onBeforePrint: () => {
          console.log("before printing...");
          setBtnLoader(false);
        },
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
      });

      if(!loading){
        return(
                <div className="tab-pane fade show active" id="tab1-tab-pane" role="tabpanel" aria-labelledby="tab1-tab" tabIndex="0"  ref={scrollRef}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="wizard card-like">
                                <form action="#">
                                    <div className="wizard-body">
                                        <div className="step initial active">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div className="mb-4">
                                                            <label className="form-label">MARKE</label>
                                                            <Select id="single"
                                                            className="react-select-container"
                                                            classNamePrefix="react-select"
                                                            closeMenuOnSelect={true}
                                                            isClearable
                                                            components={animatedComponents}
                                                            options={brandData} 
                                                            placeholder={<div className="select-placeholder-text">wählen...</div>} 
                                                            value={selected}
                                                            defaultValue={selected}
                                                            onChange={onChangeSelect2}
                                                            getOptionValue={option=>option.id}
                                                            name="brand"/>
                                                            {errors.brand && 
                                                                <span className="error-message">
                                                                    {errors.brand}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="form-label">GEPRüFT VON</label>
                                                        <input type="text" className="form-control" name="checked_by" onChange={handleChange} value={certData.checked_by} />
                                                        {errors.checked_by && 
                                                            <span className="error-message">
                                                                {errors.checked_by}
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div className="mb-4">
                                                            <label className="form-label">ARTIKELNUMMER</label>
                                                            <Select id="single"
                                                            className="react-select-container"
                                                            classNamePrefix="react-select"
                                                            closeMenuOnSelect={true}
                                                            isClearable
                                                            components={animatedComponents}
                                                            options={machineSelectData} 
                                                            placeholder={<div className="select-placeholder-text">wählen...</div>} 
                                                            value={machineSelected}
                                                            defaultValue={machineSelected}
                                                            onChange={onChangeMachineSelect2}
                                                            getOptionValue={option=>option.id}
                                                            isDisabled={isMachineDisabled}
                                                            name="machine"/>
                                                            {errors.machine && 
                                                                <span className="error-message">
                                                                    {errors.machine}
                                                                </span>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="form-label">MENGE</label>
                                                        <input type="number" className="form-control" name="crowd" onChange={handleChange} value={certData.crowd} />
                                                        {errors.crowd && 
                                                            <span className="error-message">
                                                                {errors.crowd}
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>WINKELIGKEIT</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="perpendicularity" onChange={handleChange} value="OK" defaultChecked='OK' />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>SCHUTZLEITER</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="tolerance_of_spindle" onChange={handleChange} value="OK" defaultChecked='OK' />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>PRÜFUNG/PRODUKTION</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"  name="magnet_base_switch" onChange={handleChange} value="OK" defaultChecked='OK' />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>AUFNAHME/RUNDLAUF</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"  name="motor_switch" onChange={handleChange} value="OK" defaultChecked='OK'  />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>ISOLATIONWIEDERSTAND</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="guide" value="OK" defaultChecked={true}  />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>PRÜFUNG/VERSAND</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"   name="isolation" onChange={handleChange} value="OK" defaultChecked='OK' />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>MOTORSCHALTER/FUNKTION</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"  name="insulation_resistance" onChange={handleChange} value="OK"defaultChecked='OK' />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Zubehör</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name= "accessories" value="OK" defaultChecked={true} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>SPANNUGSFESTIGKEIT</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"  name="resistance_to_voltage" onChange={handleChange} value="1500 V" defaultChecked={true}/>
                                                                <span>1500V</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Technische Zertifizierung</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="technical_certification" value="OK" defaultChecked={true} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Logistiksteuerung</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" value=""  defaultChecked={true}/>
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>ELEKTRISCHE REGELUNG</span>
                                                                <div className="d-flex">
                                                                    <div className="board1">
                                                                        <input className="form-check-input" type="checkbox" id="form-check-default" name="electronic_circuit_board" checked={certData.electronic_circuit_board === 1} />
                                                                        <span>Ja</span>
                                                                    </div>
                                                                    <div className="board1">
                                                                        <input className="form-check-input" type="checkbox" id="form-check-default" name="electronic_circuit_board" checked={certData.electronic_circuit_board === 0} />
                                                                        <span>NEIN</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    

                                                    {/* <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Herkunft: Deutschland</span>
                                                                <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="origin_germany" value="OK" defaultChecked={true} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <div className="d-flex checkbox-input">
                                                                    <span>BEMERKUNGEN</span>
                                                                    {/* <input type="text" className="form-control" name="observation" value={certData.observation} /> */}
                                                                    {/* <Select id="single"
                                                                    className="react-select-container"
                                                                    classNamePrefix="react-select"
                                                                    closeMenuOnSelect={true}
                                                                    isClearable
                                                                    components={animatedComponents}
                                                                    options={observationData} 
                                                                    value={observationSelected}
                                                                    getOptionValue={option=>option.id}
                                                                    onChange={onChangeSelect3}
                                                                    placeholder={<div className="select-placeholder-text">wählen...</div>} 
                                                                    name="observation"/> */}

                                                                    {/* <select name="select" onChange={onChangeSelect3}>
                                                                        {Object.keys(observationData).map(function(n, i) { 
                                                                            return (<option key={i} value={observationData[n].id} selected={observationSelected == observationData[n].id}>{observationData[n].label}</option>);
                                                                        })}
                                                                    </select> */}

                                                                    <Form.Select aria-label="observation" name="observation" onChange={onChangeSelect3}>
                                                                        {Object.keys(observationData).map(function(n, i) { 
                                                                            return (<option key={i} value={observationData[n].id} selected={observationSelected === observationData[n].id}>{observationData[n].label}</option>);
                                                                        })}
                                                                    </Form.Select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <div className="d-flex checkbox-input">
                                                                    <span>HERKUNFT</span>
                                                                    {/* <Select id="single"
                                                                    className="react-select-container"
                                                                    classNamePrefix="react-select"
                                                                    closeMenuOnSelect={true}
                                                                    isClearable
                                                                    components={animatedComponents}
                                                                    options={originData} 
                                                                    value={originSelected}
                                                                    getOptionValue={option=>option.id}
                                                                    onChange={onChangeSelect4}
                                                                    placeholder={<div className="select-placeholder-text">wählen...</div>} 
                                                                    name="origin_germany"/> */}

                                                                    <Form.Select aria-label="origin_germany" name="origin_germany" onChange={onChangeSelect4}>
                                                                        {Object.keys(originData).map(function(n, i) { 
                                                                            return (<option key={i} value={originData[n].id} selected={originSelected === originData[n].id}>{originData[n].label}</option>);
                                                                        })}
                                                                    </Form.Select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                
                                                </div>

                                                <div className="col-sm-12">
                                                    <div className="images">
                                                        <div className="img-ctn">
                                                            {machineData.length > 0 && machineSelected && Object.keys(machineSelected).length > 0 && (
                                                                <img src={`${process.env.REACT_APP_API_URL}/${machineData.find((machine) => { return machine.id === machineSelected.id}).image}`}/>
                                                            )}

                                                            {!(machineData.length > 0 && machineSelected && Object.keys(machineSelected).length > 0) && (
                                                                <>
                                                                    <img src="/static/blank-img.jpeg" />
                                                                    <h3>Ausgewählte Maschine</h3>
                                                                </>
                                                            )}
                                                            
                                                            
                                                        </div>
                                                        <div className="img-ctn">
                                                        {selected && Object.keys(selected).length > 0 && selected.logo && (
                                                                <img src={`${process.env.REACT_APP_API_URL}/${selected.logo}`}/>
                                                            )}

                                                            {!(selected && Object.keys(selected).length > 0 && selected.logo) && (
                                                                <>
                                                                    <img src="/static/blank-img.jpeg" />
                                                                    <h3>Ausgewählte Marke</h3>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="wizard-footer">
                                        <div style={{ display: "none" }}>
                                            <PrintCertificate data={printData} ref={componentRef} />
                                        </div>
                                        <button id="wizard-next" type="button" className="btn btn-irv" disabled={btnLoader ? true : false} onClick={saveCertificate}>
                                            {'WEITER'}
                                        </button>
                                        {/* <button id="wizard-subm" style={{display : "none"}} type="button" className="btn btn-irv print-button__content  js__action--print">
                                            DRUCKEN
                                        </button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        )
      } else {
        return(
            <>
                <div className="tab-pane fade show active" id="tab1-tab-pane" role="tabpanel" aria-labelledby="tab1-tab" tabIndex="0" style={{height: '100vh'}}>
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

export default AddCertificate