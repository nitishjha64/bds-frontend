import { useEffect, useState } from 'react'

import axios from 'axios'
import moment from 'moment';
import { useParams } from "react-router-dom";

const LandingCertificate = () => {
    const { id } = useParams();
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
                        <img src={`${process.env.REACT_APP_API_URL}/${certData.brand_image}`} />
                        <h2>{certData.brand_name}</h2>
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
                        <h2 className="product-title">{certData.name}</h2>
                        <h3>THE HEAVY-DUTY AUTOMATIC MAGNETIC DRILL</h3>
                        <div className="product-detail">
                            <h2>about this machine: </h2>
                            <p>
                            Full performance and flexibility for steel, plant and machine
                            construction. With adjustable automatic feed. An ideal machine for
                            drilling with Twist Drills with Morse Taper 3 shanks. The premium
                            made in Germany automatic magnetic drilling machine. Thanks to
                            reversible motor MAB 825V can also perform tapping (thread
                            cutting).
                            </p>
                            {/*<p>The automatic feed is at the turnstile coupled in and out and can be switched on in any position. The infinitely variable feed speed ensures for optimal use of the respective tool. When the upper or lower end position is reached. The feed is automatically deactivated. Further processing is by manual switchover anytime possible. Safety control switch-off: If the magnet loses its grip, the drill and feed motor switch off automatically. The automatic magnetic drilling machine can also be used with manual feed.</p>*/}
                            <ul>
                            <li> Variable automatic feed and automatic reverse</li>
                            <li> Manual drilling option</li>
                            <li> Variable speed &amp; torque controls</li>
                            <li> Available with Swivel Base options model number MAB 845V</li>
                            <li> 4 Speed gear and Morse taper 3</li>
                            </ul>
                        </div>
                        <h4>Check Product On Website</h4>
                        <div className="landing-btns">
                            <a target="_blank" href={`${certData.link_ger}`}>German Website</a>
                            <a target="_blank" href={`${certData.link_en}`}>English Website</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <footer>
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