import React, { useEffect, useState } from 'react';
import Footer from '../Shared/Footer/Footer';
import { Empty, Modal } from 'antd';
import { Pagination } from 'antd';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ManageSchools = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [selectedSchoolId, setSelectedSchoolId] = useState(null);
    const [university, setUniversity] = useState([]);
    const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
    const [showSignUpPopup, setShowSignUpPopup] = useState(false);

    const imageUrl = "https://png.pngtree.com/png-vector/20190628/ourlarge/pngtree-school-icon-for-your-project-png-image_1520454.jpg";

    useEffect(() => {
        handleGetListUniversities();
    }, []);

    const handleGetListUniversities = async () => {
        try {
            const response = await fetch('http://localhost:3700/universities/getAll');
            if (!response.ok) {
                throw new Error('Failed to fetch universities');
            }
            const data = await response.json();
            console.log('API response:', data); 
            setUniversity(data || []);
        } catch (error) {
            console.error("Error fetching universities: ", error);
        }
    };

    const handleDeleteSchool = async (schoolId) => {
        try {
            const response = await axios.delete(`https://project-software-z6dy.onrender.com/university/${schoolId}`);
            if (response.status === 200) {
                const updatedUniversities = university.filter(item => item.id !== schoolId);
                setUniversity(updatedUniversities);
            } else {
                console.error('Error deleting school:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting school:', error);
        }
    };

    const { handleSubmit, register, reset } = useForm();

    const handleAddSchool = async (formData) => {
        try {
            const response = await axios.post('http://localhost:3700/universities/register', {
                name: formData.name,
                uniCode: formData.code,
                image: formData.image,
                email: formData.email,
                password: 'password123' // Placeholder password
            });

            if (response.status === 201) {
                const newUniversity = {
                    id: response.data.user.id,
                    name: response.data.user.uniName,
                    image: formData.image,
                };
                setUniversity([...university, newUniversity]);
                setShowSignUpPopup(false); // Close modal after successful addition
                reset(); // Reset form fields after submission
            } else {
                console.error('Error adding school:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding new school:', error);
        }
    };

    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = university.slice(indexOfFirstItem, indexOfLastItem);

    const handleConfirmDelete = () => {
        handleDeleteSchool(selectedSchoolId);
        setDeleteConfirmationVisible(false); // Close delete confirmation modal
    };

    const handleSignUpButtonClick = () => {
        setShowSignUpPopup(true);
    };

    const handleSignUpPopupClose = () => {
        setShowSignUpPopup(false);
    };

    return (
        <div>
            <Header />
            <SubHeader title='Universities' subtitle='Quản lý các trường.' />
            <div className="container" style={{ marginBottom: 80, marginTop: 50, marginLeft: 200, marginRight: 200 }}>
                <div className="container-fluid">
                    <div className='mb-4 section-title text-center' style={{ marginLeft: -250 }}>
                        <button onClick={handleSignUpButtonClick} className="btn btn-primary mt-3">Thêm trường mới</button>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            {university.length === 0 ? <Empty /> :
                                currentItems.map((item) => (
                                    <div key={item.id} className="mb-4 rounded" style={{ background: '#f3f3f3', alignContent: 'center' }}>
                                        <div className='d-flex p-3 justify-content-between'>
                                            <div className='d-flex gap-3'>
                                                <div className='doc-img-fluid d-flex align-items-center'>
                                                    <img src={item.image || imageUrl} alt={item.name} className="" style={{ width: 80, height: 80, marginRight: 10 }} />
                                                </div>
                                                <div className="doc-info">
                                                    <h5 className='mb-0'>{item.name}</h5>
                                                    <p className="doc-department m-0">University</p>
                                                </div>
                                            </div>
                                            {/* <button onClick={() => {
                                                setSelectedSchoolId(item.id);
                                                setDeleteConfirmationVisible(true);
                                            }} className="btn btn-danger">Xóa</button> */}
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="pagination-container">
                                <Pagination
                                    current={currentPage}
                                    total={university.length}
                                    pageSize={itemsPerPage}
                                    onChange={(page) => setCurrentPage(page)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Thêm trường mới"
                visible={showSignUpPopup}
                onCancel={handleSignUpPopupClose}
                footer={null}
            >
                <div className="container" style={{ marginTop: 30, marginBottom: 10 }}>
                    <div className="">
                        <div className="">
                            <form className="row form-row" onSubmit={handleSubmit(handleAddSchool)}>
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Tên Trường</label>
                                        <input className="form-control" {...register("name")} placeholder='Tên trường' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group mb-2 card-label">
                                        <label>Mã trường</label>
                                        <input className="form-control" {...register("code")} placeholder='Mã trường' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-2 card-label">
                                        <label>Logo trường</label>
                                        <input className="form-control" {...register("image")} placeholder='URL hình ảnh' />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group mb-2 card-label">
                                        <label>Email</label>
                                        <input className="form-control" {...register("email")} placeholder='Email' />
                                    </div>
                                </div>
                                <div className="text-center mt-3 mb-5">
                                    <button type="submit" className="appointment-btn">Thêm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                title="Xác nhận xóa"
                visible={deleteConfirmationVisible}
                onCancel={() => setDeleteConfirmationVisible(false)}
                onOk={handleConfirmDelete}
            >
                <p>Bạn có chắc muốn xóa trường này không?</p>
            </Modal>
            <Footer />
        </div>
    );
};

export default ManageSchools;
