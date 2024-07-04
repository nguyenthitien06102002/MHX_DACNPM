import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import showImg from '../../images/specialities/specialities-01.png'
import StarRatings from 'react-star-ratings';
import { Tag } from 'antd';
import './index.css';
import { FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment } from "react-icons/fa";
import { truncate } from '../../utils/truncate';
import { FaClock } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

const ProjectContent = ({ strategiesItem, updateStrategiesList }) => {
    const [imageError, setImageError] = useState(false);
  
   


  
    return (
        <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
            <div className='d-flex p-3 justify-content-between align-items-center'>
                    <div className='doc-img-fluid d-flex align-items-center'>
                        {/* { data?.img && <img src={data?.img} className="" alt="User Image" />} */}
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s'
                            className=""
                            alt="User Image"
                          
                        />
                    </div>
                    <div className="doc-info">
                        <h5 className='mb-0'><Link to={`/detail/studentList/1`}>Tên chiến dịch</Link></h5>
                        {/* <p className='m-0 form-text'>{strategiesItem.description}</p> */}
                        {/* <p className="doc-department m-0"><img src={showImg} className="img-fluid" alt="Speciality" />Urology</p> */}


                        <div className="clinic-details mt-2">
                            <p className="form-text text-secondary"><FaLocationArrow /> Địa điểm</p>
                            <p className="form-text text-secondary"><FaClock />Thời gian diễn ra: 2023-01-01 – 2024-01-01</p>
                            <p className="form-text text-secondary">Đăng ký trước: 16/06/2023</p>
                            {/* <ul className="clinic-gallery mt-3">
                                <li>
                                    <FcLike />
                                </li>
                                <li>
                                    <FcLike />
                                </li>
                                <li>
                                    <FcLike />
                                </li>
                                <li>
                                    <FcLike />
                                </li>
                            </ul> */}
                        </div>

                    </div>
                <div className="doc-info-right me-3">
                    <div className="clini-infos">
                        <ul>
                            <li><FaRegThumbsUp />  97%</li>
                            <li><FaComment /> 4 Feedback</li>
                            {/* <li>Thời gian đăng ký trước 17/06/2023 </li> */}
                            {/* <li><FaDollarSign />  (Per Hour)</li> */}
                        </ul>
                    </div>
                    <div className="clinic-booking">
                        <div  className='clinic-booking-button'>
                            <Link to={`/detail/studentList/1`} className="pro-btn" >   chi tiết   </Link>
                        </div>

                        <div className='clinic-booking-button mt-2'>
                            <Link  className="apt-btn">Xóa</Link>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ProjectContent