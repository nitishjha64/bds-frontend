import {QRCodeSVG} from 'qrcode.react';
import { forwardRef } from "react";
import moment from "moment";

// eslint-disable-next-line react/display-name
const PrintCertificate = forwardRef((props, ref) => {
    const {data} = props

    return (
        <>
            <div ref={ref}>
            {props.data && data && data.length > 0 && data.map((val, i) => (
                // eslint-disable-next-line react/jsx-key
            <div
                className="pdf-doc"
                key={i}
                style={{
                padding: 20,
                width: "80%",
                height: "auto",
                border: "1px solid #000",
                margin: "20px auto 20px auto"
                }}
            >
                    <div className="doc-cnt1">
                        <div className="row">
                            <div className="col-md-8 left">
                            <h2
                                style={{
                                fontWeight: 800,
                                color: "#606060",
                                fontSize: 17,
                                textTransform: "uppercase"
                                }}
                            >
                                PRÜFBERICHT
                            </h2>
                            <p style={{ color: "#606060", lineHeight: "normal", fontSize: 13 }}>
                                QUALITY TEST CERTIFICATE | BULLETIN DE CONTRÔLLE | परीक्षण प्रमाणपत्र
                            </p>
                            <p style={{ color: "#606060", lineHeight: "normal", fontSize: 13 }}>
                            RAPPORTO DI CONTROLLO | FICHA TÉCNICA DE CONTROLLE DE QUALIDADE
                            </p>
                            </div>
                            <div className="col-md-4 right">
                            <img
                                src={`${process.env.REACT_APP_API_URL}/${val.brand_image}`}
                                style={{ float: "right", width: "40%" }}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="doc-cnt2">
                        <div className="row">
                            <div className="col-md-6 left2">
                            <table style={{ width: "100%" }}>
                                <tbody>
                                <tr style={{ display: "flex", minHeight: "auto" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    Geprüft von / Checked by
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.checked_by}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Datum</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Date</span>
                                        <span style={{ fontWeight: 500 }}>Date</span>
                                        <span style={{ fontWeight: 500 }}>Fecha</span>
                                        <span style={{ fontWeight: 500 }}>Data</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {moment(val.created_at).format('DD.MM.YYYY')}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Maschinentyp</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Type of machine</span>
                                        <span style={{ fontWeight: 500 }}>Modèle  de la machine</span>
                                        <span style={{ fontWeight: 500 }}>Modelo</span>
                                        <span style={{ fontWeight: 500 }}>Modello</span>
                                        <span style={{ fontWeight: 500 }}>Modelo</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.machine_type}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Seriennummer</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Serialnumber</span>
                                        <span style={{ fontWeight: 500 }}>No. de  Série</span>
                                        <span style={{ fontWeight: 500 }}>No. Serie</span>
                                        <span style={{ fontWeight: 500 }}>Série No.</span>
                                        <span style={{ fontWeight: 500 }}>No. Di Serie</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.serialNo}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Winkeligkeit</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Perpendicularity</span>
                                        <span style={{ fontWeight: 500 }}>Perpendicularité</span>
                                        <span style={{ fontWeight: 500 }}>Perpandicularidad</span>
                                        <span style={{ fontWeight: 500 }}>Perpandicularitá</span>
                                        <span style={{ fontWeight: 500 }}>Geometria da Máquina</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.perpendicularity}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Aufnahme / Rundlauf</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Tolerance of spindle</span>
                                        <span style={{ fontWeight: 500 }}>Tolérance axial</span>
                                        <span style={{ fontWeight: 500 }}>Tolerancia husillo</span>
                                        <span style={{ fontWeight: 500 }}>Tolleranza del mandrino</span>
                                        <span style={{ fontWeight: 500 }}>Tolenrȃcia radial do encaixe</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.tolerance_of_spindle}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Magnetschalter/Funktion</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Magnet base switch
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Interrupter base
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Interruptor iman
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Funzionalità interruttore magnete
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Chave do magnético
                                        </span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.magnet_base_switch}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Motorschalter/Funktion</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Motor switch</span>
                                        <span style={{ fontWeight: 500 }}>Interrupter moteur</span>
                                        <span style={{ fontWeight: 500 }}>Interruptor motor</span>
                                        <span style={{ fontWeight: 500 }}>Funzionalità interruttore motore</span>
                                        <span style={{ fontWeight: 500 }}>Chave liga/Desl motor</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.motor_switch}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Führung/Funktion</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Guide</span>
                                        <span style={{ fontWeight: 500 }}>Tolerance guide glissière</span>
                                        <span style={{ fontWeight: 500 }}>Control escobillas</span>
                                        <span style={{ fontWeight: 500 }}>Adjustedas guias</span>
                                        <span style={{ fontWeight: 500 }}>Tolleranza guide scorrimento</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.guide}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex", minHeight: "auto" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>QR Code</b>
                                        </span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <QRCodeSVG value={`${process.env.REACT_APP_WEB_URL}/landing/${val.serialNo}`} style={{ width: 100, height: 100 }}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <a
                                href={`mailto:${val?.brand_email}`}
                                style={{
                                margin: "5px 0 !important",
                                color: "#000",
                                float: "inline-start",
                                fontSize: "mailto:14px",
                                textTransform: "lowercase"
                                }}
                            >
                                {val?.brand_email}
                            </a>
                            </div>
                            <div className="col-md-6 right2">
                            <table style={{ width: "100%" }}>
                                <tbody>
                                <tr style={{ display: "flex", minHeight: "auto" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    Urspung / Origin
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    Germany
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Schutzleiter</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Isolation</span>
                                        <span style={{ fontWeight: 500 }}>Protection</span>
                                        <span style={{ fontWeight: 500 }}>Cable aislante</span>
                                        <span style={{ fontWeight: 500 }}>Messa a terra</span>
                                        <span style={{ fontWeight: 500 }}>Aterramento</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.isolation}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}><b>Isolationswiderstand</b></span>
                                        <span style={{ fontWeight: 500 }}> Insulation resistance</span>
                                        <span style={{ fontWeight: 500 }}>La resistance d'isolement</span>
                                        <span style={{ fontWeight: 500 }}>La resistencia de aislamiento</span>
                                        <span style={{ fontWeight: 500 }}>La resistenza d'isolement</span>
                                        <span style={{ fontWeight: 500 }}>La Resistence d'isolement</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.insulation_resistance}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Spannungsfestigkeit</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Resistance to Voltage</span>
                                        <span style={{ fontWeight: 500 }}>Resistance Voltage</span>
                                        <span style={{ fontWeight: 500 }}>Resistencia altas tensiones</span>
                                        <span style={{ fontWeight: 500 }}>Tensão admissível</span>
                                        <span style={{ fontWeight: 500 }}>Resistenza electrica</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.resistance_to_voltage}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                            <b>Elektronische Regelung</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Electronic circuit board
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Functionnement Platine
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Contro plaqueta eléctronica
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Regolazione elletronica
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                            Comando electrònico
                                        </span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.electronic_circuit_board == 1 ? 'YES' : 'NO'}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Zubehör</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Accessories</span>
                                        <span style={{ fontWeight: 500 }}>Contròle accessoires</span>
                                        <span style={{ fontWeight: 500 }}>Control accesrios</span>
                                        <span style={{ fontWeight: 500 }}>Accessori</span>
                                        <span style={{ fontWeight: 500 }}>Accessoriós</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.accessories}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Prüfung/Produktion</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>
                                        Technical certification
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Controle production</span>
                                        <span style={{ fontWeight: 500 }}>Responsable Control</span>
                                        <span style={{ fontWeight: 500 }}>Controllo produzione</span>
                                        <span style={{ fontWeight: 500 }}>Controle de produção</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.technical_certification}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}><b>Prüfung/Versand</b></span>
                                        <span style={{ fontWeight: 500 }}>Logistics control</span>
                                        <span style={{ fontWeight: 500 }}>Controle expéditions</span>
                                        <span style={{ fontWeight: 500 }}>Responsable despacho</span>
                                        <span style={{ fontWeight: 500 }}>Controlle spedizione</span>
                                        <span style={{ fontWeight: 500 }}>Controle de expédição</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    />
                                </tr>
                                <tr style={{ display: "flex" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                        <span style={{ fontWeight: "bolder" }}>
                                        <b>Bemerkungen</b>
                                        </span>
                                        <span style={{ fontWeight: 500 }}>Observation</span>
                                        <span style={{ fontWeight: 500 }}>Observations</span>
                                        <span style={{ fontWeight: 500 }}>Observaciones</span>
                                        <span style={{ fontWeight: 500 }}>Osservazioni</span>
                                        <span style={{ fontWeight: 500 }}>Observaçoes</span>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10,
                                        color: "green"
                                    }}
                                    >
                                    {val.observation}
                                    </td>
                                </tr>
                                <tr style={{ display: "flex", minHeight: "auto" }}>
                                    <th
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <div className="data" style={{ display: "grid" }}>
                                    </div>
                                    </th>
                                    <td
                                    style={{
                                        borderCollapse: "separate",
                                        border: "1px solid #000",
                                        width: "100%",
                                        padding: 10
                                    }}
                                    >
                                    <QRCodeSVG value={`${process.env.REACT_APP_WEB_URL}/landing/${val.serialNo}`} style={{ width: 100, height: 100, visibility: 'hidden' }}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <a
                                href={`${val.brand_website}`}
                                style={{
                                margin: "5px 0 !important",
                                color: "#000",
                                textAlign: "right",
                                float: "right",
                                fontSize: 14,
                                textTransform: "lowercase"
                                }}
                            >
                                {val?.brand_website}
                            </a>
                            </div>
                        </div>
                    </div>
            </div>
            ))}
            </div>
       </>
    );
        })

export default PrintCertificate
