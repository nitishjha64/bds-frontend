import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import LoaderCustom from "./LoaderCustom";
import axios from 'axios';
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ListCertificates = () => {

    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const columns = [
        {
            name: 'POS.',
            selector: row => row.pos,
            sortable: true,
        },
        {
            name: 'ARTIKELNUMMER',
            selector: row => row.machine_type,
            sortable: true,
        },
        {
            name: 'START SERIENNUMMER',
            selector: row => row?.serial_no,
            sortable: true,
        },
        {
            name: 'END SERIENNUMMER',
            selector: row => row?.endSerialNo,
            sortable: true,
        },
        {
            name: 'GEPRÜFT VON',
            selector: row => row.checked_by,
            sortable: true,
        },
        {
            name: 'MENGE',
            selector: row => row.crowd,
            sortable: true,
        },
        {
            name: 'DATUM',
            selector: row => moment(row.created_at).format('DD.MM.YYYY'),
            sortable: true,
        }
    ];

    const downloadExcel = (event) => {
        event.preventDefault()
        
    };

    const getEndSerialNumber = (serialNoPart1, recordsCount, certCount) => {
        serialNoPart1 + String(parseInt(recordsCount + certCount)).padStart(3, '0')
    }

    

    const fetchCertificates = async page => {
        setLoading(true);
        if(localStorage.getItem('token')){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/certificates?page=${page}&per_page=${perPage}`,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
            setData(response.data.data)
            setTotalRows(response.data.total);
        } else {
            navigate('/login', {replace: true});
        }
        
        setLoading(false);
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'ZEILEN PRO SEITE',
        rangeSeparatorText: 'VON',
    };

    const handlePageChange = page => {
        fetchCertificates(page);
        setCurrentPage(page);
    };
    

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/certificates?page=${page}&per_page=${newPerPage}`,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
      };

      useEffect(() => {
        fetchCertificates(1); // fetch page 1 of users
        return () => console.log("Cleanup..");
      }, []);

      if(!loading){
        return (
            <>
                <div className="dt--top-section">
                    <div className="row">
                        <div className="col-12 offset-sm-6 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3">
                            <div id="zero-config1_filter" className="dataTables_filter">
                                <label>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
                                        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                    <input type="search" className="form-control" placeholder="SUCHEN..." aria-controls="zero-config1" />
                                </label>
                                {/* <button className="btns">
                                    <div className="col-md-4">
                                        <a className="border-btn add-btn mt-0" onClick={downloadExcel}>ALS EXCEL UNTERLADEN</a>
                                    </div>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={data} progressPending={loading} pagination paginationServer paginationTotalRows={totalRows} paginationDefaultPage={currentPage} onChangeRowsPerPage={handlePerRowsChange} onChangePage={handlePageChange} paginationComponentOptions={paginationComponentOptions}/>
               
            </>
        )
    } else {
        return (
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

export default ListCertificates