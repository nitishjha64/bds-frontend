import { useEffect, useState } from 'react'

import axios from 'axios'
import moment from 'moment';
import { useParams } from "react-router-dom";

const LandingCertificate = () => {
    const { id, serialNo } = useParams();
    const [certData, setCertData] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        if(id){
            (async () => {
                const {data} = await axios.get(`${process.env.REACT_APP_API_URL}/brandMachineById/${id}`,{
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                })
                setCertData(data)
                console.log(data)
                setLoading(false)
            })();
        }

        return () => {
            // this now gets called when the component unmounts
          };
          
    }, [id])

    if(!loading){
        return (

            <div className="landing-page">
                <header>
                    <div className="header">
                    <div className="header-inner">
                        {/* <img src={`${process.env.REACT_APP_API_URL}/${certData.brand_image}`} /> */}
                        <img src='/static/bds-logo.png' />
                        {/* <h2>{certData.name}</h2> */}
                    </div>
                    </div>
                </header>
                
                <div className="main-content">
                    <div className="card-wrapper">
                    <div className="card">
                        {/* card left */}
                        <div className="product-imgs">
                            <div className="img-display">
                                <div className="img-showcase">
                                <img src={`${process.env.REACT_APP_API_URL}/${certData.image}`} />
                                </div>
                            </div>
                        </div>
                        
                        {/* card right */}
                        <div className="product-content">
                            <div className="blue-btn">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="content model-content">
                                            <div className="txt">
                                                <h3>MODEL</h3>
                                                <h3 className="mb-0">MODEL</h3>          
                                            </div>
                                    
                                    <div className="number">
                                    <h2><b>{certData.name}</b></h2>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="content">
                                    <div className="txt">
                                        <h3>SERIAL NUMBER</h3>
                                        <h3 className="mb-0">SERIENNUMMER</h3>
                                    </div>
                                    <div className="number">
                                    <h2>{serialNo}</h2>
                                    </div>
                                    </div>
                                </div>
                                
                                </div>
                            </div>
                        <h2 className="product-title"><b>{certData.name}</b></h2>
                        <div className="product-detail">
                            <p>
                                Dear Customer,<br/><br/>
                                Congratulations on your recent purchase of <b>{certData.name}</b> from BDS Machines, Germany.<br/><hr className='halfLineBreak'/>
                                Should you have any questions or need assistance, please feel free to reach out to us. Our team is here to ensure you have the best possible experience with your new <b>{certData.name}</b>.<br/><hr className='halfLineBreak'/>
                                Please click on the below button for Product Specifications, Video, Spare Part List, Technical Drawing, User Manual, Data Sheet or to Contact  Us for support.<br/><hr className='halfLineBreak'/>
                                <div className="landing-btns">
                                    <a target="_blank" href={`${certData.link_en}`}>PRODUCT PAGE</a>
                                </div><br/>
                            </p><hr className='halfLineBreak'/>
                            <p>
                                Sehr geehrter Kunde,<br/><br/>
                                Herzlichen Glückwunsch zu Ihrem kürzlichen Kauf einer <b>{certData.name}</b> von BDS Maschinen GmbH.<br/><hr className='halfLineBreak'/>
                                Sollten Sie Fragen haben oder Hilfe benötigen, können Sie sich jederzeit an uns wenden. Unser Team ist hier, um sicherzustellen, dass Sie mit Ihrer neuen <b>{certData.name}</b> die bestmögliche Erfahrung machen.<br/><hr className='halfLineBreak'/>
                                Bitte klicken Sie auf die Schaltfläche unten, um Produktspezifikationen, Video, Ersatzteilliste, technische Zeichnungen, Bedienungsanleitung, Datenblatt anzuzeigen oder um unseren Support zu kontaktieren.<br/><hr className='halfLineBreak'/>
                                <div className="landing-btns">
                                    <a target="_blank" href={`${certData.link_ger}`}>PRODUKTSEITE</a>
                                </div>
                            </p>
                        </div>

                        
                        
                        
                        </div>
                    </div>
                    </div>
                </div>

                <footer>
                    <img src='/static/brand_banner.jpg' style={{marginBottom: "15px"}} />
                    <p>
                    Copyright © {moment().format('YYYY')} BDS Maschinen GmbH, Martinstrasse 108, 41063 –
                    Moenchengladbach, Germany
                    </p>
                </footer>
            </div>

        )
    } else {
        return(
            <>
                <div className="landing-page">
                    <div className="main-content">
                        Data loading ...
                    </div>
                </div>
                
            </>
        )
    }

}

export default LandingCertificate