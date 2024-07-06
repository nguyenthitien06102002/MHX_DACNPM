import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import { Button, Modal, Form, Input, Tabs } from "antd";
import SubHeader from '../Shared/SubHeader';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import './index.css';
import swal from 'sweetalert';

const { TabPane } = Tabs;

const ListCampaignStudent = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const token = localStorage.getItem('token');
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const [selectedCampaignId, setSelectedCampaignId] = useState(null);

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
            if (data.role === "student") {
                try {
                    const response = await fetch(`http://localhost:3700/students/campaigns?userId=${data.id}`, {
                        method: 'GET',
                        headers: {
                            'accept': '*/*',
                            'Content-Type': 'application/json',
                        }
                    });

                    const campaignsData = await response.json();
                    console.log(campaignsData);
                    setCampaigns(campaignsData);
                } catch (error) {
                    console.error('Error fetching campaigns:', error);
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    useEffect(() => {
        getinfo();
    }, []);

    const handleRegisterCampaign = async () => {
        try {
            const values = await form.validateFields();
            const { info } = values;
            console.log(selectedCampaignId);

            // Submit API request to register campaign
            const response = await fetch(`http://localhost:3700/students/join`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    campaignId: selectedCampaignId, // Use selectedCampaignId from state
                    userId: userId,
                    info: info,
                    status: "0" // Assuming status should be set to "pending"
                })
            });

            const result = await response.json();
            console.log('Registration result:', result);

            if (response.status == 201) {
                // Display success alert
                if (response.ok) {
                    swal({
                        title: "Success",
                        text: "Duyệt chiến dịch thành công",
                        icon: "success",
                        button: "OK",
                    }).then(() => {
                     window.location.href = "/list-campaign-student"; // This will reload the page
                    });
                }
                
            } else {
                // Display error alert
                swal({
                    title: "Error",
                    text: result.message || "Bạn đã đăng ký thất bại, hãy thử lại",
                    icon: "error",
                    button: "OK",
                });
            }

            // Close modal and reset form
            setVisible(false);
            form.resetFields();
        } catch (error) {
            console.error('Registration failed:', error);

            // Display error alert
            swal({
                title: "Error",
                text: "An error occurred during registration. Please try again later.",
                icon: "error",
                button: "OK",
            });
        }
    };

    const role = JSON.parse(localStorage.getItem('user'));
    if (role.role !== "student") {
        return <Navigate to="/login" />;
    }

    const renderCampaignCard = (campaign) => (
        <div key={campaign.id} className="col-10 align-self-center text-center mt-3">
            <div className="campaign-card">
                <div className="header d-flex p-3 justify-content-between">
                    <div className="doc-img-fluid d-flex align-items-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s" alt="User Image" />
                    </div>
                    <div className="details d-flex flex-column align-items-center justify-content-center">
                        <h5 className="mb-0"><Link to={`/campaigns/${campaign.id}`} className="text-decoration-none text-dark">{campaign.name}</Link></h5>
                        <div className="campaign-details">
                            <div className="detail-item">
                                <FaLocationArrow />
                                <strong style={{ color: 'black', fontSize: '26px' }} >Tên chiến dịch: {campaign.title.toUpperCase()}</strong>
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
                        <span className={`tag ${campaign.status2 === 0 ? 'not-registered' : 'registered'}`}>
                            {campaign.status2 === 0 ? 'Chưa đăng ký' : 'Đã đăng ký'}
                        </span>
                    </div>
                    <div className="doc-info-right me-3">
                        <div className="clinic-booking d-flex flex-column justify-content-center align-items-center h-100">
                            <div className="clinic-booking-button mb-2 w-100">
                                <Link to={`/campaigns-student/${campaign.campaignId}`} className="btn btn-primary btn-block">Chi tiết</Link>
                            </div>
                            {campaign.status2 === 0 && (
                                <div className="clinic-booking-button mb-2 w-100 mt-10 mb-10">
                                    <Button type="primary" className="btn btn-success btn-block w-100" onClick={() => {
                                        setSelectedCampaignId(campaign.campaignId);
                                        setVisible(true);
                                    }}>
                                        Đăng ký
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Header />
            <SubHeader title="Campaign" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing." />

            <div className="container">
                <Tabs defaultActiveKey="0">
                    <TabPane tab="Chưa đăng ký" key="0">
                        <div className="row justify-content-center">
                            {campaigns.filter(campaign => campaign.status2 === 0).map(renderCampaignCard)}
                        </div>
                    </TabPane>
                    <TabPane tab="Đã đăng ký" key="1">
                        <div className="row justify-content-center">
                            {campaigns.filter(campaign => campaign.status2 === 1).map(renderCampaignCard)}
                        </div>
                    </TabPane>
                </Tabs>
            </div>

            <Modal
                title="Đăng ký chiến dịch"
                visible={visible}
                onCancel={() => {
                    setVisible(false);
                    form.resetFields();
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setVisible(false);
                        form.resetFields();
                    }}>
                        Hủy bỏ
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleRegisterCampaign}>
                        Đăng ký
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="info"
                        label="Thông tin"
                        rules={[{ required: true, message: 'Vui lòng nhập thông tin chi tiết!' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>

            <Footer />
        </>
    );
}

export default ListCampaignStudent;