import { useEffect, useRef, useState } from "react";

import PrintCertificate from "./PrintCertificate";
import Select from 'react-select';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const AddCertificate = () => {
    const navigate = useNavigate();
    const certDataObj = {
        brand_id : '', 
        machine_id : '', 
        checked_by : '', 
        crowd : '', 
        motor_switch : '', 
        insulation_resistance : '', 
        perpendicularity : '', 
        accessories : 'OK', 
        observation : '', 
        tolerance_of_spindle : '', 
        guide : 'OK', 
        resistance_to_voltage : '', 
        technical_certification : 'OK', 
        origin_germany : 'OK', 
        magnet_base_switch : '', 
        isolation : '', 
        electronic_circuit_board : '', 
        machine_image : '', 
        brand_image : '', 
        serial_no : '',
        machine_type: ''
    }
    const animatedComponents = makeAnimated();
    const [brandData, setBrandData] = useState([])
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState();
    const [machineSelected, setMachineSelected] = useState();
    const [machineSelectData, setMachineSelectData] = useState([])
    const [machineData, setMachineData] = useState([])
    const [certData, setCertData] = useState(certDataObj)
    const [printData, setPrintData] = useState({});
    const componentRef = useRef()

    useEffect(() => {
        (async() => {
            await fetchBrand()
            await fetchMachines()
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
                brandArr.push({label: element.name, id: element.id, logo: element.logo, email: element.email, brand_website: element.website_link})
            });
            setBrandData(brandArr)
        } else {
            navigate('/login', {replace: true});
        }
        setLoading(false);
    }

    const fetchMachines = async()  => {
        setLoading(true);
        let machineArr = []
        if(localStorage.getItem('token')){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/machines?fetchAll=true`,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
            setMachineData(response.data.data)
            response.data.data.forEach(element => {
                machineArr.push({label: element.name, id: element.id})
            });
            setMachineSelectData(machineArr)
            
        } else {
            navigate('/login', {replace: true});
        }
        
        setLoading(false);
    };

    const onChangeSelect2 = (
        selectedOptions
      ) => {
        setSelected(selectedOptions)
        console.log('selected', selectedOptions)
        setCertData({...certData, brand_id: selectedOptions.id, brand_email: selectedOptions.email, brand_website: selectedOptions.brand_website})
      };

      const onChangeMachineSelect2 = (
        selectedOptions
      ) => {
        setMachineSelected(selectedOptions)
        const selectedMachine = machineData.find((machine) => {return machine.id === selectedOptions.id})
        setCertData({...certData, machine_id: selectedOptions.id, machine_image: selectedMachine.image, resistance_to_voltage: selectedMachine.voltage_resistance, observation: selectedMachine.observation, electronic_circuit_board: selectedMachine.electronic_circuit_board, brand_image: selectedMachine.image, machine_type: selectedMachine.name})
      };

      const handleChange = (event) => {
        let dataObj = {...certData, [event.target.name] : event.target.value}
        setCertData(dataObj)
      }

      const saveCertificate = async() => {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/certificate`, certData, {
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
        })
        setPrintData(response.data)
        
      }

      useEffect(() => {
        if(printData && Object.keys(printData).length > 0){
            handlePrint(null, () => componentRef.current);
        }
      }, [printData])

      const handlePrint = useReactToPrint({
        // documentTitle: "Print This Document",
        onBeforePrint: () => {
          console.log("before printing...");
          setLoading(false);
        },
        onAfterPrint: () => console.log("after printing..."),
        removeAfterPrint: true,
      });

      if(!loading){
        return(
                <div className="tab-pane fade show active" id="tab1-tab-pane" role="tabpanel" aria-labelledby="tab1-tab" tabIndex="0">
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
                                                            value={selected}
                                                            defaultValue={selected}
                                                            onChange={onChangeSelect2}
                                                            name="brand"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="form-label">GEPRüFT VON</label>
                                                        <input type="text" className="form-control" name="checked_by" onChange={handleChange} value={certData.checked_by} />
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <div className="mb-4">
                                                            <label className="form-label">ARTIKEL NUMMER</label>
                                                            <Select id="single"
                                                            className="react-select-container"
                                                            classNamePrefix="react-select"
                                                            closeMenuOnSelect={true}
                                                            isClearable
                                                            components={animatedComponents}
                                                            options={machineSelectData} 
                                                            value={machineSelected}
                                                            defaultValue={machineSelected}
                                                            onChange={onChangeMachineSelect2}
                                                            name="brand"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6">
                                                    <div className="form-group">
                                                        <label className="form-label">MENGE</label>
                                                        <input type="number" className="form-control" name="crowd" onChange={handleChange} value={certData.crowd} />
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Rechtwinkligkeit</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="perpendicularity" onChange={handleChange} value="OK" defaultChecked={certData.perpendicularity === 'OK'} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Tolerance of Spindle</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="tolerance_of_spindle" onChange={handleChange} value="OK" defaultChecked={certData.tolerance_of_spindle === 'OK'} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Magnet Base Switch</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"  name="magnet_base_switch" onChange={handleChange} value="OK" defaultChecked={certData.magnet_base_switch === 'OK'} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Motor Switch</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"  name="motor_switch" onChange={handleChange} value="OK" defaultChecked={certData.motor_switch === 'OK'}  />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Guide</span>
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
                                                                <span>Isolation</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"   name="isolation" onChange={handleChange} value="OK" defaultChecked={certData.isolation === 'OK'} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Insulation Resistance</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default"  name="insulation_resistance" onChange={handleChange} value="OK" defaultChecked={certData.insulation_resistance === 'OK'} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                    <div className="d-flex">
                                                                <span>Resistance to Voltage</span>
                                                                <input type="text" className="form-control" name="resistance_to_voltage" value={certData.resistance_to_voltage} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Electronic Circuit Board</span>
                                                                <div className="d-flex">
                                                                    <div className="board1">
                                                                        <input className="form-check-input" type="checkbox" id="form-check-default" name="electronic_circuit_board" checked={certData.electronic_circuit_board === 1} />
                                                                        <span>Yes</span>
                                                                    </div>
                                                                    <div className="board1">
                                                                        <input className="form-check-input" type="checkbox" id="form-check-default" name="electronic_circuit_board" checked={certData.electronic_circuit_board === 0} />
                                                                        <span>No</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Accessories</span>
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
                                                                <span>Technical Certification</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="technical_certification" value="OK" defaultChecked={true} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Logistics Control</span>
                                                                    <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" value=""  defaultChecked={false}/>
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                
                                                                <span>Observation</span>
                                                                <div className="d-flex">
                                                                    <input type="text" className="form-control" name="observation" value={certData.observation} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="check-form form-group">
                                                            <div className="form-check form-check-primary form-check-inline volt-checkbox">
                                                                <span>Origin: Germany</span>
                                                                <div className="d-flex">
                                                                <input className="form-check-input" type="checkbox" id="form-check-default" name="origin_germany" value="OK" defaultChecked={true} />
                                                                <span>OK</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        
                                                    </div>

                                                
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
                                                                    <h3>Selected Machine</h3>
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
                                                                    <h3>Selected Brand</h3>
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
                                        <button id="wizard-next" type="button" className="btn btn-irv" onClick={saveCertificate}>
                                            WEITER
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
                <div className="main-container" id="container">
                    <div className="overlay"></div>
                    <div className="search-overlay"></div>
                    <div id="content" className="main-content">
                        Data loading ...
                    </div>
                </div>
            </>
        )
      }

}

export default AddCertificate