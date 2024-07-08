import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Confirmed from './Confirmed'; 

const RegisteredStudents = ({ id }) => {
    const [applicant, setApplicant] = useState([]);
    
    const CustomButton = ({ idStudent }) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <Button style={{ backgroundColor: 'green', margin: '6px' }} onClick={() => handlePutApplicant(idStudent)}>Xác nhận</Button>
            </div>
            <div>
                <Button style={{ backgroundColor: 'red', margin: '6px' }} onClick={() => handleDeleteApplicant(idStudent)}>Hủy</Button>
            </div>
        </div>
    );

    const columns = [
        {
            name: 'Họ và Tên',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Kỹ năng',
            selector: row => row.info,
            sortable: true,
        },
        {
            name: ' ',
            cell: row => <CustomButton idStudent={row.id} />, 
            sortable: true,
        },
    ];

    const handleGetApplicant = async () => {
        try {
            const response = await fetch(`http://localhost:3700/students/unapprove-users/${id}`);
            const data = await response.json();

            if (response.ok) {
                setApplicant(data);
            } else {
                console.error(data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handlePutApplicant = async (idStudent) => {
        try {
            const response = await fetch(`http://localhost:3700/students/approve`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    userId: idStudent,
                    campaignId: id
                })
            });

            const data = await response.json();

            if (response.ok) {
                handleGetApplicant(); // Cập nhật lại danh sách sinh viên
            } else {
                console.error(data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteApplicant = async (idStudent) => {
        try {
            const response = await fetch(`http://localhost:3700/students/delete/${idStudent}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
    
            if (response.ok) {
                handleGetApplicant(); // Cập nhật lại danh sách sinh viên
            } else {
                const data = await response.json();
                console.error(data?.error || 'Something went wrong');
            }
        } catch (error) {
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
