import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Button } from 'react-bootstrap';

const Confirmed = ({ id }) => {
    const [applicant, setApplicant] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CustomButton = ({ idStudent }) => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                {/* <Button style={{ backgroundColor: 'red', margin: '6px' }}>Xóa</Button> */}
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
            selector: row => row.skill,
            sortable: true,
        },
        {
            name: ' ',
            cell: row => <CustomButton idStudent={row.id} />,
            sortable: true,
        },
    ];
    useEffect(() => {
        handleGetApplicant();
    }, [id]);

    const handleGetApplicant = async () => {
        try {
            const response = await fetch(`http://localhost:3700/students/approved-users/${id}`);
            const data = await response.json();

            console.log("campaignId:", id);
            console.log("API response:", data);

            if (response.ok) {
                setApplicant(data);
            } else {
                console.error(data?.message);
                setError(data?.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="location-list">
            <div className='text-end'></div>
            <DataTable
                columns={columns}
                data={applicant}
                fixedHeader
                selectableRows
                pagination
            />
        </div>
    );
}

export default Confirmed;
