import { useEffect, useState } from 'react'

import DataTable from 'react-data-table-component';
import axios from 'axios';
import moment from "moment";
import { useNavigate } from "react-router-dom";

const ListMachines = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const columns = [
        {
            name: 'pos',
            selector: row => row.pos,
            sortable: true,
        },
        {
            name: 'ITEM NUMBER',
            selector: row => row.serial_no,
            sortable: true,
        },
        {
            name: 'BRAND',
            selector: row => row.brand_name,
            sortable: true,
        },
        {
            name: 'Resistance to Voltage',
            selector: row => row.voltage_resistance,
            sortable: true,
        },
        {
            name: 'Observation',
            selector: row => row.observation,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => moment(row.created_at).format('M/D/YYYY'),
            sortable: true,
        },
        {
            name: 'Action',
            button: true,
            cell: row => (
                <a className="edit-btn" href={`machines/${row.id}`}>
                    <font style={{verticalAlign: "inherit"}}>
                        <font style={{verticalAlign: "inherit"}}>EDIT</font>
                    </font>
                </a>
            ),
        },
    ];

    const fetchMachines = async page => {
        setLoading(true);
        if(localStorage.getItem('token')){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/machines?page=${page}&per_page=${perPage}`,{
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

    const handlePageChange = page => {
        fetchMachines(page);
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/machines?page=${page}&per_page=${newPerPage}`,{
                headers: {
                    'Authorization': localStorage.getItem('token'),
                }
            });
        setData(response.data.data);
        setPerPage(newPerPage);
        setLoading(false);
      };

      useEffect(() => {
        fetchMachines(1); // fetch page 1 of users
        return () => console.log("Cleanup..");
      }, []);

      const onClickAdd = () => {
        navigate('machines')
      }
if(!loading){
    return (
        <>
            <div className='float-right mb-3'>
                <button className="btns">
                    <div className="col-md-4">
                        <a className="border-btn add-btn mt-0" onClick={onClickAdd}>
                            <font style={{verticalAlign: 'inherit'}}>
                                <font style={{verticalAlign: 'inherit'}}>+ ADD
                                </font>
                            </font>
                        </a>
                    </div>
                </button>
            </div>
            <DataTable columns={columns} data={data} progressPending={loading} pagination paginationServer paginationTotalRows={totalRows} paginationDefaultPage={currentPage} onChangeRowsPerPage={handlePerRowsChange} onChangePage={handlePageChange} />
        </>
    )
} else {
    return (
        <>
            Loading...
        </>
    )
}
}

export default ListMachines