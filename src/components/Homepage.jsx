import { useEffect, useState } from 'react'

import AddCertificate from './AddCertificate';
import Header from "./Header"
import ListCertificates from './ListCertificates';
import ListMachines from './ListMachines';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Homepage = () => {

    return (
        <>
            <Header></Header>
            <div className="main-container" id="container">
                <div id="content" className="main-content">
                    <div className="layout-px-spacing">
                        <div className="middle-content container-xxl">
                            <div className="row layout-top-spacing ">
                                <div className="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                                    <div className="widget-content widget-content-area br-8 position-bt cstm_tab">
                                        <div className="simple-tab cms-tab">
                                            <Tabs className="nav nav-tabs" id="myTab" defaultActiveKey="test_report" as="ul">
                                                <Tab eventKey="test_report" className="nav-item" title="Pr端fberichte erstellen">
                                                    <AddCertificate />
                                                </Tab>
                                                <Tab eventKey="data" className="nav-item" title="Daten">
                                                    <ListCertificates />
                                                </Tab>
                                                <Tab eventKey="edit" className="nav-item" title="Bearbeiten">
                                                    <ListMachines />
                                                </Tab>
                                            </Tabs>
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
}

export default Homepage