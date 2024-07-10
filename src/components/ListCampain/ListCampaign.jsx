import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { Button, Tabs } from "antd";
import SubHeader from '../Shared/SubHeader';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';

import swal from 'sweetalert';
import './index.css';
const { TabPane } = Tabs;

const ListCampaign = () => {
    const [campaigns, setCampaigns] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:3700/campaigns/campaign/update-status/${id}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
            });
            console.log('Id campaign:', id);
            const updatedCampaign = await response.json();
            if (response.ok) {
               
                swal({
                    title: "Success",
                    text: "Duyệt chiến dịch thành công",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    window.location.href = '/list-campaign';
                });
            }
        } catch (error) {
            console.error('Error updating campaign status:', error);
            swal({
                title: "Error",
                text: "An error occurred while approving the campaign",
                icon: "error",
                button: "OK",
            });
        }
    };

    const getinfo = async () => {
        try {
            const response = await fetch(`http://localhost:3700/users/profile`, {
                method: 'GET',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            const data = await response.json();
            if (data.role === "university") {
                const univer = data.id;

                try {
                    const response = await fetch(`http://localhost:3700/campaigns/campaign/byuserId/${univer}`, {
                        method: 'GET',
                        headers: {
                            'accept': '*/*',
                            'Content-Type': 'application/json',
                        }
                    });

                    const data = await response.json();
                    console.log('Data:', data);
                    setCampaigns(data);
                } catch (error) {
                    console.error('Error fetching campaigns:', error);
                }
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        }
    };

    useEffect(() => {
        getinfo();
    }, []);

    const role = JSON.parse(localStorage.getItem('user'));
    if (role.role !== "university") {
        return <Navigate to="/login" />;
    }

    const renderCampaignCard = (campaign) => (
        <div key={campaign.id} className="campaign-card">
            <div className="header">
                <div className="doc-img-fluid d-flex align-items-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s" alt="User Image" />
                </div>
                <div className="details d-flex flex-column align-items-center justify-content-center">
                    <h5><Link to={`/campaigns/${campaign.id}`}></Link></h5>
                    <div className="campaign-details">
                            <div className="detail-item">
                                <FaLocationArrow />
                                <strong style={{ color: 'black', fontSize: '26px' }} >Tên chiến dịch: {campaign.title}</strong>
                            </div>
                            <div className="detail-item">
                                <FaCalendarAlt />
                                <strong style={{ fontSize: '20px' }}>
                                    {campaign.status2 === 0
                                        ? `Đăng ký trước: ${new Date(campaign.startAt).toLocaleString()}`
                                        : `Kết thúc: ${new Date(campaign.endAt).toLocaleString()}`}
                                </strong>
                            </div>

                        </div>
                    <span className={`tag ${campaign.status === 0 ? 'not-registered' : 'registered'}`}>
                        {campaign.status === 0 ? 'Chờ duyệt' : 'Đã duyệt'}
                    </span>
                </div>
                <div className="doc-info-right me-3">
                    <div className="clinic-booking d-flex flex-column justify-content-center align-items-center h-100">
                        <Link to={`/campaigns/${campaign.id}`} className="clinic-booking-button mb-2 w-100">Chi tiết</Link>
                    </div>
                    {campaign.status === 0 && (
                        <div className="clinic-booking-button mb-2 w-100 mt-10 mb-10">
                            <Button type="button" className="ant-btn css-dev-only-do-not-override-f7vrd6 ant-btn-primary btn btn-success btn-block w-100" onClick={() => handleApprove(campaign.id)}>
                                Duyệt
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Header />
            <SubHeader title="Các chiến dịch"  />

            <div className="container">
                <Tabs defaultActiveKey="0">
                    <TabPane tab="Chờ duyệt" key="0">
                        <div className="campaign-list">
                            {campaigns.filter(campaign => campaign.status === 0).map(renderCampaignCard)}
                        </div>
                    </TabPane>
                    <TabPane tab="Đã duyệt" key="1">
                        <div className="campaign-list">
                            {campaigns.filter(campaign => campaign.status === 1).map(renderCampaignCard)}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            <Footer />
        </>
    );
}
const styles = `
.campaign-card {
    background-color: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.campaign-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.campaign-card .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid #f0f0f0;
}

.campaign-card .details {
    flex: 1;
    padding: 0 1.5rem;
}

.campaign-card h5 {
    font-size: 1.25rem;
    color: #333;
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.campaign-card h5 a {
    color: #1a73e8;
    text-decoration: none;
    transition: color 0.3s ease;
}

.campaign-card h5 a:hover {
    color: #174ea6;
}

 .campaign-details {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #666;
    font-size: 0.9rem;
}

.detail-item svg {
    color: #1a73e8;
}

.tag {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 50px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.tag.not-registered {
    background-color: #fff0f0;
    color: #ff4d4f;
    border: 1px solid #ffccc7;
}

.tag.registered {
    background-color: #f6ffed;
    color: #52c41a;
    border: 1px solid #b7eb8f;
}

.clinic-booking {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.clinic-booking-button {
    width: 100%;
}

.btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.btn-primary {
    background-color: #1a73e8;
    color: #fff;
}

.btn-primary:hover {
    background-color: #174ea6;
}

.btn-success {
    background-color: #34a853;
    color: #fff;
}

.btn-success:hover {
    background-color: #2d8e47;
}

.campaign-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.container {
    padding: 20px;
}
`;
// Inject styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
export default ListCampaign;