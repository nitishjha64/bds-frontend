import {QRCodeSVG} from 'qrcode.react';
import { forwardRef } from "react";
import moment from "moment";

// eslint-disable-next-line react/display-name
const PrintCertificate = forwardRef((props, ref) => {
    const {data} = props
    console.log('DATA', data)

    return (
        <>
            <div ref={ref}>
            {data && data.map((val, i) => (
                // eslint-disable-next-line react/jsx-key
                <div
                className="pdf-doc"
                key={i}
                style={{
                padding: 20,
                width: "80%",
                height: "auto",
                border: "1px solid #000",
                margin: "20px auto"
                }}
            >
                <div className="doc-cnt1">
                <div className="row">
                    <div className="col-md-6 left">
                    <h2
                        style={{
                        fontWeight: 800,
                        color: "#606060",
                        fontSize: 17,
                        textTransform: "uppercase"
                        }}
                    >
                        Pr�fbericht
                    </h2>
                    <p style={{ color: "#606060", lineHeight: "normal", fontSize: 13 }}>
                        RAPPORTO DI CONTROLLO
                        <br />
                        HOJA TECHNICA
                        <br />
                        BULLETIN DE CONTROLE
                        <br /> FICHA TECNICA DE CONTROLE DE QUALIDADE
                    </p>
                    </div>
                    <div className="col-md-6 right">
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
                            Gepruft von / Checked by
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
                                <b>Datum:</b>
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
                                <b>Maschinentyp:</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>Type of machine</span>
                                <span style={{ fontWeight: 500 }}>Modele de la machine</span>
                                <span style={{ fontWeight: 500 }}>Modelo</span>
                                <span style={{ fontWeight: 500 }}>Typo di macchina</span>
                                <span style={{ fontWeight: 500 }}>Modelo da maquina</span>
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
                                <b>Seriennummer:</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>Serial No.:</span>
                                <span style={{ fontWeight: 500 }}>Series No.</span>
                                <span style={{ fontWeight: 500 }}>No serie</span>
                                <span style={{ fontWeight: 500 }}>No. di Serie</span>
                                <span style={{ fontWeight: 500 }}>N. de Serie</span>
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
                                <b>Winkeligkeit(+/-0,15):</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>Perpendicularity</span>
                                <span style={{ fontWeight: 500 }}>Perpendicularite</span>
                                <span style={{ fontWeight: 500 }}>Perpendicularidad</span>
                                <span style={{ fontWeight: 500 }}>Perpendicolarita</span>
                                <span style={{ fontWeight: 500 }}>Peralelidade</span>
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
                                <b>Anfnahme/Rundlauf (0,05):</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>Tolerance of Spindle</span>
                                <span style={{ fontWeight: 500 }}>Tolerance Axiale</span>
                                <span style={{ fontWeight: 500 }}>Tolerance husillo</span>
                                <span style={{ fontWeight: 500 }}>
                                Recettazione/Corsa circolare
                                </span>
                                <span style={{ fontWeight: 500 }}>Tolerancia axial</span>
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
                                Switch for Magnetics Base
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Interrupteur base magnetico
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Funzione/Commutat. magnetico
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Interruptor para base magnetica
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
                                <span style={{ fontWeight: 500 }}>Motorswitsch</span>
                                <span style={{ fontWeight: 500 }}>Interrupteur moteur</span>
                                <span style={{ fontWeight: 500 }}>Interruptor motor</span>
                                <span style={{ fontWeight: 500 }}>
                                Funzione/Commutatore motore
                                </span>
                                <span style={{ fontWeight: 500 }}>Interruptor do motor</span>
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
                                <b>Fuhrung/Funktion</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>Guide</span>
                                <span style={{ fontWeight: 500 }}>
                                Tolerance guide glissiere
                                </span>
                                <span style={{ fontWeight: 500 }}>Control escobillas</span>
                                <span style={{ fontWeight: 500 }}>Funzione/Guida</span>
                                <span style={{ fontWeight: 500 }}>Guias/Funcionamento</span>
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
                        href={`mailto:${val.brand_email}`}
                        style={{
                        margin: "5px 0 !important",
                        color: "#000",
                        float: "inline-start",
                        fontSize: "mailto:14px"
                        }}
                    >
                        {val.brand_email}
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
                                <span style={{ fontWeight: 500 }}>Guida Protettive</span>
                                <span style={{ fontWeight: 500 }}>Cabo de Terra</span>
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
                                <span style={{ fontWeight: "bolder" }}>
                                <b>Isolationswiderstand</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Resistance of Isolation
                                </span>
                                <span style={{ fontWeight: 500 }}>Resistance Isolation</span>
                                <span style={{ fontWeight: 500 }}>
                                Resistancia aislante alta
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Resistanza di isolamento
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Resistancia a isloacao
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
                                <b>Spannungsfestigkelt</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>Resistance of Voltage</span>
                                <span style={{ fontWeight: 500 }}>Resistance Voltage</span>
                                <span style={{ fontWeight: 500 }}>
                                Resistancia altas tensiones
                                </span>
                                <span style={{ fontWeight: 500 }}>Stabilita tensione</span>
                                <span style={{ fontWeight: 500 }}>
                                Resistancia contra Tencao Eletrica
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
                                Electronic circuit boards
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Fontctionnement Platine
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Control plaqueta electronica
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Regolazione elettronica
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Controle do comando electronio
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
                                <b>Zubehor</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>Accessories</span>
                                <span style={{ fontWeight: 500 }}>Control accessories</span>
                                <span style={{ fontWeight: 500 }}>Control accessories</span>
                                <span style={{ fontWeight: 500 }}>Accessori</span>
                                <span style={{ fontWeight: 500 }}>Acessorious</span>
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
                                <b>Prufung/Produktion</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Technical Certification
                                </span>
                                <span style={{ fontWeight: 500 }}>Controle production</span>
                                <span style={{ fontWeight: 500 }}>Responsable Control</span>
                                <span style={{ fontWeight: 500 }}>Prova di produzione</span>
                                <span style={{ fontWeight: 500 }}>Certificao teecnia</span>
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
                                <span style={{ fontWeight: "bolder" }}>
                                <b>Prufung/Versand</b>
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                Control logistic/packing
                                </span>
                                <span style={{ fontWeight: 500 }}>Controle expedition</span>
                                <span style={{ fontWeight: 500 }}>Responsable despacho</span>
                                <span style={{ fontWeight: 500 }}>Prova spedizione</span>
                                <span style={{ fontWeight: 500 }}>Controle de expedicao</span>
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
                                <span style={{ fontWeight: 500 }}>Observations</span>
                                <span style={{ fontWeight: 500 }}>Observations</span>
                                <span style={{ fontWeight: 500 }}>Observaciones</span>
                                <span style={{ fontWeight: 500 }}>Osservazione</span>
                                <span style={{ fontWeight: 500 }}>Observacoes</span>
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
                        href={`${val.brand_website}`}
                        style={{
                        margin: "5px 0 !important",
                        color: "#000",
                        textAlign: "right",
                        float: "right",
                        fontSize: 14
                        }}
                    >
                        {val.brand_website}
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
