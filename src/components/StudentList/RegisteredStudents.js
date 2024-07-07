import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { useParams,useHistory  } from 'react-router-dom';
import Confirmed from './Confirmed'; 

const RegisteredStudents = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState([]);
    
    const CustomButton = ({idStudent }) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <Button style={{ backgroundColor: 'green', margin: '6px' }} onClick={() => handlePutApplicant(idStudent)}>Xác nhận</Button>
            </div>
            <div>
                <Button style={{ backgroundColor: 'red', margin: '6px' }}>Hủy</Button>
            </div>
        </div>
    );

    const columns = [
        {
            name: 'Họ và Tên',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
       
        {
            name: 'Kỹ năng',
            selector: row => row.skill,
            sortable: true,
        },
        {
            name: ' ',
            cell: row => <CustomButton idStudent={row.id} />, 
            sortable: true,
        },
    ];

    const token = JSON.parse(localStorage.getItem('token'));
    const apiUrl = `https://project-software-z6dy.onrender.com/applicant?strategy=${id}&status=0`;


    const handleGetApplicant = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token
                },
            });

            const data = await response.json();

            // Handle the response data here
            if (response.ok) {
                setApplicant(data.data);
            } else {
                // Handle the error response here
                console.error(data?.message);
            }
        } catch (error) {
            // Handle any errors here
            console.error(error);
        }
    };
    
    const apiUrlPut = `https://project-software-z6dy.onrender.com/applicant/accept`;

    const handlePutApplicant = async (idStudent) => {
        try {
            console.log(idStudent)
            const response = await fetch(apiUrlPut, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({ // Chuyển đổi đối tượng thành chuỗi JSON
                    id: parseInt(idStudent),
                    strategy: parseInt(id)
                })
            });

            const data = await response.json();

            // Handle the response data here
            if (response.ok) {
                // window.location.href =`/detail/studentList/${id}`;
                handleGetApplicant();
            } else {
                // Handle the error response here
                console.error(data?.message);
            }
        } catch (error) {
            // Handle any errors here
            console.error(error);
        }
    };
    useEffect(() => {
        handleGetApplicant();
    }, [id]);

   

    return (
        <div className="location-list">
            <div className='text-end'>
           
            </div>
            <DataTable
                columns={columns}
                data={applicant}
                fixedHeader
                selectableRows
                pagination
            />
        </div>
    );
};

export default RegisteredStudents;
