import React from 'react'
import Footer from '../Shared/Footer/Footer'
import './index.css';
import { Navigate, useParams } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { useGetDoctorQuery } from '../../redux/api/doctorApi';
import { Empty, message } from 'antd';
import SearchContent from '../Doctor/SearchDoctor/SearchContent';
import { Tabs } from 'antd';
import Detail from './Detail';
import RegisteredStudents from './RegisteredStudents';
import Confirmed from './Confirmed';


const StudentList = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetDoctorQuery(id);
    let content = null;
    // if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />
    if (!isLoading && !isError && data?.id) content = <SearchContent data={data} />

    
    const items = [
        {
            key: '1',
            label: 'Chi tiết',
            children: <Detail id={id} />,
        },
        {
            key: '2',
            label: 'Danh sách sinh viên đăng ký',
            children: <RegisteredStudents id={id} />,
        },
        {
            key: '3',
            label: 'Sinh viên đã xét duyệt',
            children: <Confirmed id={id} />,
        },
    ];

    const user = JSON.parse(localStorage.getItem('user'));

    if ((user.role !== 'admin')) {
        return <Navigate to="/login" />;
    }


    return (
        <>
            <Header />
            <SubHeader title='Chi tiết chiến dịch'/>
            <div className="container" style={{ marginBottom: '4rem', marginTop: '6rem' }}>
                {content}
                <div className='p-4 rounded' style={{ marginBottom: '7rem', backgroundColor: '#f3f3f3' }}>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
            
        </>
    )
}

export default StudentList;