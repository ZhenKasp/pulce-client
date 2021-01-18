import React, {useEffect, useState} from 'react';
import '../App.css';
import authHeader from "../service/auth-header";
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import {Button, Dropdown} from "react-bootstrap";

const Admin = () => {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState([]);

    useEffect(() => {
        axios.get(process.env.REACT_APP_PATH_TO_SERVER + "admin/useredit",
            {headers: authHeader()})
        .then(res => setData(res.data))
        .catch(e => console.log(e));
    }, []);

    const columns = [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'username',
        text: 'Name',
      }, {
        dataField: 'roles',
        text: 'Roles',
      }];

    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
        bgColor: 'pink',
        onSelect: (row, isSelect, rowIndex, e) => {
            if (isSelect) {
                checked.push(row.id);
            } else {
                const index = checked.indexOf(row.id);
                if (index > -1) {
                    checked.splice(index, 1);
                }
            }
        },
        onSelectAll: (isSelect, rows, e) => {
            if (isSelect) {
                rows.map(row => {checked.push(row.id);})
            } else {
                rows.map(row => {
                    const index = checked.indexOf(row.id);
                    if (index > -1) {
                        checked.splice(index, 1);
                    }
                })
            }
        }
      };

    const doChange = (newrole) => {
        axios.post(process.env.REACT_APP_PATH_TO_SERVER + "admin/useredit",
            { newrole, checked }, { headers: authHeader() })
        .then(res => {
                if (res.status === 200) {
                    setData(res.data);
                } else {
                    console.log('No success, as usual. Fuck this shit?');
                }
        }).catch(e => console.log(e));
    }

    return (
        <div>
            <h1>Users Table</h1>
            <div>
                <Dropdown className="m-1">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Change selected users roles to ..
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => {doChange('USER')}}>User</Dropdown.Item>
                        <Dropdown.Item onClick={() => {doChange('ADMIN')}}>Admin</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Button variant="danger" onClick={() => {doChange('delete')}}>Delete</Button>
            </div>

            <div className="text-center center m-4">
                { data.length !== 0 ?
                <BootstrapTable
                    classes={'w-25'}
                    bordered
                    hover
                    keyField='id'
                    data={ data }
                    columns={ columns }
                    // rowEvents={ tableRowEvents }
                    selectRow={ selectRow }
                    />
                : <p className="mt-3">WTF. How is there no users?!</p> }
            </div>
        </div>
    );
}

export default Admin;
