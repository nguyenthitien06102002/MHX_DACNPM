import React from 'react'
import img from '../../images/chair.png'
// import DataTable from 'react-data-table-component';
import DataTable from 'react-data-table-component';
import { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';



const Confirmed = () => {
    const { id } = useParams();
    const [applicant, setApplicant] = useState([]);
//     const CustomButton = ({ onClick }) => (
//         <div style={{display: 'flex', justifyContent: 'space-around'}}>
//             {/* <div>
//    <Button style={{backgroundColor: 'green', margin: '6px'}}>Xác nhận</Button>
//             </div> */}
   
//             <div>

// <Button style={{backgroundColor: 'red', margin: '6px'}}>Xóa</Button>
//          </div>
//     </div>
     
//       );
const handleDeleteStudent = async (studentId, strategyId) => {
    try {
        const response = await fetch(`https://project-software-z6dy.onrender.com/applicant/${studentId}/${strategyId}`, {
            method: 'DELETE',
            headers: {
                'accept': '*/*',
                'Authorization': 'Bearer ' + token
            }
        });

        const data = await response.json();

       
        if (response.ok) {
            console.log('Student deleted successfully:', data);
            // handleDeleteStudent(studentId, strategyId);
            handleGetApplicant();
         
        } else {
          
            console.error('Failed to delete student:', data?.message);
        }
    } catch (error) {
       
        console.error('Error deleting student:', error);
    }
}
const CustomButton = ({ index }) => {
    const handleCancelClick = async () => {
        try {
            if (applicant.length > index) {
                const studentId = applicant[index].id;
                await handleDeleteStudent(studentId, id);
                console.log('Student deleted successfully:', studentId);
            } else {
                console.error('Invalid index or no applicant found at this index.');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
                <Button onClick={handleCancelClick} style={{ backgroundColor: 'red', margin: '6px' }}>Hủy</Button>
            </div>
        </div>
    );
};
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
            selector: (row, index) => <CustomButton index={index} />,
            sortable: true,
        }
        // {
        //     name: 'Xác nhận',
        //     cell: row => <CustomButton onClick={() => console.log("Xác nhận", row.id)} />,
        //     // ignoreRowClick: true,
        //     // allowOverflow: true,
        //     button: true,
        //   },
    ];

    const data = [
        {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            school: 'Đại Học Nông Lâm TP.Hồ Chí Minh',
            skill: 'Bơi lội'
        },

        {
            id: 2,
            name: 'John',
            email: 'john@example.com',
            school: '30',
            skill: 'Bơi lội'
        },
        {
            id: 3,
            name: 'John',
            email: 'john@example.com',
            school: '30',
            skill: 'Bơi lội'
        },
        {
            id: 1,
            name: 'John',
            email: 'john@example.com',
            school: '30',
            skill: 'Bơi lội'
        },

      
    ];
    const token = JSON.parse(localStorage.getItem('token'));
    const apiUrl = `https://project-software-z6dy.onrender.com/applicant?strategy=${id}&status=1`;

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

    useEffect(() => {
        handleGetApplicant();
    }, [id]);
    const [records, setRecords] = useState(data);
    const handleFilter = (event) => {
        const newData = data.filter(row => {
            return row.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setRecords(newData);
    };



    return (
        <div className="location-list ">
          
            <div className='text-end'>

            </div>
            <DataTable
            columns={columns}
            data={applicant}
            fixedHeader
            selectableRows
            pagination>

            </DataTable>


        </div>


    )
}

export default Confirmed