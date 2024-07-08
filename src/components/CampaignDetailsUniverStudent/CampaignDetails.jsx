import React, { useEffect, useState } from 'react';
import './index.css';
import Header from '../Shared/Header/Header';
import Footer from '../Shared/Footer/Footer';
import SubHeader from '../Shared/SubHeader';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { format } from 'date-fns';
const CompaignDetailStudent = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await fetch(`http://localhost:3700/campaigns/campaign/info/${id}`);
                const data = await response.json();
                setCampaign(data);
                console.log('Campaign:', data);
            } catch (error) {
                console.error('Error fetching campaign:', error);
            }
        };

        fetchCampaign();
    }, [id]);

    


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
                                            alt={campaign.name}
                                            className="img-fluid rounded-start campaign-image w-100"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <h2 className="card-title text-uppercase">{campaign.name}</h2>
                                            <strong style={{ fontSize: '20px' }} className="card-text text-uppercase text-description">{campaign.title.toUpperCase()}</strong>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <strong>Mô tả:</strong> {campaign.description}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Thời gian:</strong> {new Date(campaign.startAt).toLocaleDateString()} - {new Date(campaign.endAt).toLocaleDateString()}
                                                </li>
                                                <li className="list-group-item">
                                                    <strong>Thời gian tham gia:</strong> {campaign.joinedAt ? new Date(campaign.joinedAt).toLocaleDateString() : "N/A"}
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

export default CompaignDetailStudent;
