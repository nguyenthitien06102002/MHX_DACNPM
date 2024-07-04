import SubHeader from '../Shared/SubHeader'
import Footer from '../Shared/Footer/Footer'
import Header from '../Shared/Header/Header'
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegThumbsUp, FaDollarSign, FaComment } from "react-icons/fa";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from "antd";
import jwtDecode from 'jwt-decode';

const ListCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();
   


    return (
        <>
            <Header />
            <SubHeader title="Campaign" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />

            <div className="container">
                <div className="row justify-content-center">
                 
                        <div className='col-10 align-selft-center text-center mt-5'>
                            <div className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
                                <div className='d-flex p-3 justify-content-between'>
                                    <div className='doc-img-fluid d-flex align-items-center'>
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s"
                                            alt="User Image" />
                                    </div>
                                    <div
                                        className="doc-info  d-flex flex-column align-items-center justify-content-center">
                                        <h5 className='mb-0'><Link
                                            to={`/campaigns/1`}>name</Link></h5>
                                        <div className="clinic-details mt-2">
                                            <p className="form-text text-secondary">
                                                <FaLocationArrow /> place</p>

                                            {/* {campaign.status === 0 ? (
                                                <p className="form-text text-secondary">
                                                    Duyệt trước: {new Date(campaign.startAt).toLocaleString()}
                                                </p>
                                            ) : (
                                                <p className="form-text text-secondary">
                                                    Kết thúc: {new Date(campaign.endAt).toLocaleString()}
                                                </p>
                                            )
                                            } */}
                                        <p className="form-text text-secondary">
                                            Duyệt trước: ngày
                                        </p>

                                            {/* <span
                                                className={`tag p-1 rounded ${campaign.status === 0
                                                        ? 'bg-warning text-white'
                                                        : campaign.status === 1
                                                            ? 'bg-success text-white'
                                                            : ''
                                                    }`}
                                            >
                                                {campaign.status === 0
                                                    ? 'Chờ duyệt'
                                                    : campaign.status === 1
                                                        ? 'Đã duyệt'
                                                        : ''}
                                            </span> */}

                                        </div>
                                    </div>
                                    <div className="doc-info-right me-3">
                                        <div
                                            className="clinic-booking d-flex flex-column justify-content-center align-items-center h-100">
                                            <div className='clinic-booking-button mb-2 w-100'>
                                                <Link to={`/campaigns/1`}
                                                    className="btn btn-primary btn-block">Chi tiết</Link>
                                            </div>


                                            {/* {campaign.status === 0 && ( */}
                                                <div className='clinic-booking-button mb-2 w-100 mt-10 mb-10'>
                                                    <Button
                                                        type="primary"
                                                        className="btn btn-success btn-block  w-100"
                                                        // onClick={() => handleApprove(campaign.id)}
                                                        >
                                                        Duyệt
                                                    </Button>
                                                </div>
                                            {/* )} */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ListCampaign;