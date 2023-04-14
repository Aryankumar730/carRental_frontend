import React from 'react';
import dataContext from './states/DataContext';
import { useContext, useState } from 'react';
import Dataform from './Dataform';
import DataTable from './DataTable';

export default function DataEntry() {

    const context = useContext(dataContext);
    const {  } = context;

    const [dataelement, setdataelement] = useState(true);

    return (
        <div className="container-fluid  dataEntry" >
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <span href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white ">
                            <span className="fs-5 d-none d-sm-inline mt-5">
                            <i className="fa-solid fa-bars" style={{color:"white", paddingRight:"5px"}}></i>
                            Menu</span>
                        </span>
                        <hr style={{color:"white", width:"180px"}}/>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className="nav-item">
                                <span className="nav-link align-middle px-0 text-white">
                                <i className="fa-solid fa-user-plus" style={{color:"white", paddingRight:"5px"}}></i>
                                 <span className="ms-1 d-none d-sm-inline" onClick={(e) => {setdataelement(true)}}>Rental Form</span>
                                </span>
                            </li>
                            <li>
                                <span className="nav-link px-0 align-middle text-white">
                                <i className="fa-solid fa-table-list" style={{color:"white", paddingRight:"5px"}}></i> 
                                <span className="ms-1 d-none d-sm-inline" onClick={(e) => {setdataelement(false)}}>Rented Cars</span> 
                                </span>
                                
                            </li>

                        </ul>

                    </div>
                </div>

                <div className="col py-3">

                { dataelement? <Dataform/>
                : <DataTable/>}

                    
                </div>

            </div>
        </div>

    )
}
