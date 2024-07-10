import React, { useEffect, useState } from 'react';
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SubHeader from '../Shared/SubHeader';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from 'antd';

const CampaignDetails = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`http://localhost:3700/campaigns/campaign/info/${id}`);
                const data = await response.json();
                setCampaign(data);
            } catch (error) {
                console.error('Error fetching campaign:', error);
            }
        };

        fetchCampaign();
    }, [id]);

    const handleApprove = async () => {
        try {
            const response = await fetch(`http://localhost:3700/campaigns/campaign/update-status/${id}`, {
                method: 'PUT',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
            });

            const updatedCampaign = await response.json();
            if (response.ok) {
                window.location.href = '/list-campaign';
                alert('Duyệt chiến dịch thành công');
            }

        } catch (error) {
            console.error('Error updating campaign status:', error);
        }
    };



    return (
        <>
            <Header />
            <SubHeader title="Chi tiết chiến dịch"  />
            <div className="container campaign-details-container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">
                        {campaign && (
                            <div className="campaign-details card">
                                <div className="row no-gutters">
                                    <div className="col-md-6">
                                        <img
                                            src="https://th.bing.com/th/id/OIP.J_vAP0PSzrYKIYJ78es-mgHaFO?rs=1&pid=ImgDetMain"
                                            alt={campaign.title}
                                            className="img-fluid rounded-start campaign-image w-100"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <strong style={{ fontSize: '20px' }} className="card-text text-uppercase text-description">{campaign.title}</strong>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <strong>Mô tả:</strong> {campaign.description}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Thời gian:</strong> {new Date(campaign.startAt).toLocaleDateString()} - {new Date(campaign.endAt).toLocaleDateString()}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Số lượng sinh viên cần:</strong> 213
                                                </li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CampaignDetails;
