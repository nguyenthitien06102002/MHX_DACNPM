import React, { useState, useEffect } from 'react';
import './index.css';
// import Header from '../Shared/Header/Header';
// import Footer from '../Shared/Footer/Footer';
import ImageHeading from '../../images/doc/doctor 5.jpg'
// import img from '../../images/logo.png'
// import SubHeader from '../Shared/SubHeader';
import { useGetAllBlogsQuery } from '../../redux/api/blogApi';
import { Empty, message, Modal } from 'antd';
// import { Link } from 'react-router-dom';
// import { truncate } from '../../utils/truncate';
// import { FaLocationArrow, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useGetDoctorsQuery } from '../../redux/api/doctorApi';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';


const Detail = ({}) => {
    const [imageError, setImageError] = useState(false);
    const {id}= useParams();
    const[strategies,setStrategies]=  useState([]);
    const [filteredStrategy,setFilteredStrategy]= useState({});

  const handleGetStrategies = async () => {
    try {
      const response = await fetch('https://project-software-z6dy.onrender.com/strategies', {
        method: 'GET',
        headers: {
          'accept': '*/*',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJxdWFuZ3RobzIzMDYyMDAyQGdtYWlsLmNvbSIsInJvbGUiOjAsInRpbWUiOjE3MTI4ODc4ODE1MTEsImlhdCI6MTcxMjg4Nzg4MX0.LC8YPbX1i_Zi4HSMoZ3pgpoq5iA8RtgxF9B8_lIEKnI'
        },
      });
  
      const data = await response.json();
  
      // Handle the response data here
      if (response.ok) {
        setStrategies(data.data);
        console.log(data.data); // Check the fetched data
        setFilteredStrategy(data.data.find(strategy => strategy.id === parseInt(id)))
      } else {
        // Handle the error response here
        console.error(data?.message);
      }
    } catch (error) {
      // Handle any errors here
      console.error(error);
    }
  }
  
useEffect(() => {
  handleGetStrategies();
},[])

    const { data, isError, isLoading } = useGetAllBlogsQuery({ limit: 4 });
    const { data: doctorData, isLoading: DoctorIsLoading, isError: doctorIsError } = useGetDoctorsQuery({ limit: 4 });

    const blogData = data?.blogs;
    const doctors = doctorData?.doctors;

    const [showSignUpPopup, setShowSignUpPopup] = useState(false); 
    const handleSignUpButtonClick = () => {
        setShowSignUpPopup(true); 
    };

    const handleSignUpPopupClose = () => {
        setShowSignUpPopup(false); 
    };

    const { register, handleSubmit, reset } = useForm({});
   

    // let doctorContent = null;
    // if (!DoctorIsLoading && doctorIsError) doctorContent = <div>Something Went Wrong !</div>
    // if (!DoctorIsLoading && !doctorIsError && doctors?.length === 0) doctorContent = <div><Empty /></div>
    // if (!DoctorIsLoading && !doctorIsError && doctors?.length > 0) doctorContent =
    //     <>
    //         {doctors && doctors.map((item, id) => (
    //             <div className="col-lg-3 col-md-6 col-sm-6" key={id + item.id}>
    //                 <div className="card shadow border-0 mb-5 mb-lg-0">
    //                     {item.img && <img src={item.img} class="img-fluid w-100" alt="" />}
    //                     <div className="p-2">
    //                         <h4 className="mt-4 mb-0" style={{ color: '#223a66' }}><a>{item?.firstName + ' ' + item?.lastName}</a></h4>
    //                         <p>{item?.designation}</p>
    //                     </div>
    //                 </div>
    //             </div>
    //         ))}
    //     </>

    return (
        <>
            {/* <Header />
            <SubHeader title="Chi Tiết"/> */}


            <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
                <div className="row p-5">
                    <div className="col-lg-6">
                        {/* <img src={filteredStrategy.image} alt="" className="img-fluid rounded shadow" /> */}
                        <img
                            src={imageError || !filteredStrategy.image ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s' : filteredStrategy.image}
                            className="img-fluid rounded shadow"
                            alt="User Image"
                            onError={() => setImageError(true)}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                    <div className="col-lg-6">
                        <div className='section-title text-center'>
                            <h2 className='text-uppercase'>{filteredStrategy.name}</h2>
                        </div>
                        <p className='mt-3'>Thời gian: {new Date(filteredStrategy.startAt).toLocaleDateString()} - {new Date(filteredStrategy.endAt).toLocaleDateString()}</p>
                        <p className='mt-3'>Địa điểm: {filteredStrategy.place}</p>
                        <p className='mt-3'>Mô tả: {filteredStrategy.description}
                        </p>
                        <div className="text-center mt-4">
                            {/* <button onClick={handleSignUpButtonClick} className="appointment-btn scrollto"><span className="d-none d-md-inline">Đăng ký tham gia</span></button> */}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Đăng ký tham gia"
                visible={showSignUpPopup}
                onCancel={handleSignUpPopupClose}
                footer={null}
            >
                <div className="container" style={{ marginTop: 30, marginBottom: 10 }}>
                    <div className="">
                        <div className="">
                                <form className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Họ và Tên</label>
                                            <input required {...register("firstName")} className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Mã số sinh viên</label>
                                            <input required {...register("firstName")} className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Email</label>
                                            <input required {...register("email")} type='email' className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group mb-2 card-label">
                                            <label>Trường</label>
                                            <input required {...register("subject")} className="form-control"/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className='form-label'>Kỹ năng của bản thân</label>
                                            <textarea required {...register("text")} className="form-control mb-3" cols="30" rows="10"/>
                                        </div>
                                    </div>

                                    <div className="text-center mt-3 mb-5">
                                        <button disabled={isLoading} type='submit' className="appointment-btn">Đăng ký</button>
                                    </div>
                                </form>
                        </div>
                    </div>
                </div>
            </Modal>
           
            {/* <Footer /> */}
        </>
    )
}

export default Detail