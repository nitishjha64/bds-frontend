import { useState } from "react";
import AddCertificate from './AddCertificate';
import Header from "./Header"
import ListCertificates from './ListCertificates';
import ListMachines from './ListMachines';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Homepage = () => {

    const [activeTab, setActiveTab] = useState("certificate_create");

    const handleTabSelect = (tabKey) => {
        setActiveTab(tabKey);
    };

    return (
        <>
            <Header activeTab={activeTab}></Header>
            <div className="main-container" id="container">
                <div id="content" className="main-content">
                    <div className="layout-px-spacing">
                        <div className="middle-content container-xxl">
                            <div className="row layout-top-spacing ">
                                <div className="col-xl-12 col-lg-12 col-sm-12 layout-spacing">
                                    <div className="widget-content widget-content-area br-8 position-bt cstm_tab">
                                        <div className="simple-tab cms-tab">
                                            <Tabs className="nav nav-tabs" id="myTab" defaultActiveKey="certificate_create" as="ul" onSelect={handleTabSelect}>
                                                <Tab eventKey="certificate_create" className="nav-item" title="Prüfbericht erstellen">
                                                    <AddCertificate />
                                                </Tab>
                                                <Tab eventKey="certificate_list" className="nav-item" title="Daten">
                                                    <ListCertificates />
                                                </Tab>
                                                <Tab eventKey="machine_list" className="nav-item" title="Bearbeiten">
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