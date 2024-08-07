import React, { useState, useEffect } from 'react';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import SubHeader from '../Shared/SubHeader';
import ProjectContent from './ProjectContent';
import { Pagination } from 'antd';
import "./index.css";

const ListProject = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3700/campaigns/getAll');
        if (!response.ok) {
          throw new Error('Failed to fetch campaigns');
        }
        const data = await response.json();
        console.log('API response:', data); // Kiểm tra dữ liệu từ API
        setCampaigns(data || []); // Lưu dữ liệu vào state, kiểm tra null hoặc undefined
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu: ", error);
      }
    };

    fetchCampaigns(); // Gọi hàm khi component được mount
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần

  console.log('State campaigns:', campaigns); // Kiểm tra dữ liệu trong state

  return (
    <div>
      <Header />
      <SubHeader title='Các chiến dịch' />
      <div className="container" style={{ marginBottom: 200, marginTop: 80 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-4 col-xl-3">
              <div className="p-3 rounded" style={{ background: '#f3f3f3' }}>
                <div className="mb-3">
                  <button onClick={() => window.location.href = '/manageSchools'}
                    style={{ marginLeft: '50px' }}
                    className="btn btn-primary mt-3"> Quản lý Trường</button>
                  <button onClick={() => window.location.href = '/createCampaigns'}
                    style={{ marginLeft: '50px' }}
                    className="btn btn-primary mt-3"> Tạo chiến dịch</button>
                </div>

                <div className="md-3">
                  <h6 style={{ color: '#05335c' }}>Mùa hè xanh</h6>
                  <div className="card shadow border-0 mb-5">
                    <img src="https://dainam.edu.vn/uploads/images/ckeqouwcp4qi5juiulff20230802101300_thump.jpg" alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                    <div className="p-2">
                      <p className="mb-4">Mùa hè xanh 2023: Chiến dịch tình nguyện đầy nhiệt huyết của tuổi trẻ DNU tại mảnh đất Cao Bằng</p>
                      <a href='https://dainam.edu.vn/vi/tin-tuc/mua-he-xanh-2023-chien-dich-tinh-nguyen-day-nhiet-huyet-cua-tuoi-tre-dnu-tai-manh-dat-cao-bang' className="apt-btn" target="_blank">Truy cập</a>
                    </div>
                  </div>

                  <div className="card shadow border-0 mb-5">
                    <img src="https://doanthanhnien.vn/Content/uploads/images/133382190131936031_356622827_670872445078522_7208570064784879038_n.jpg" alt="" className="img-fluid" style={{ maxHeight: '17rem', objectFit: 'cover' }} />
                    <div className="p-2">
                      <p className="mb-4">Mùa hè xanh - Nơi cống hiến tri thức trẻ, góp phần dựng xây quê hương, đất nước.</p>
                      <a href='https://doanthanhnien.vn/tin-tuc/mua-he-xanh/mua-he-xanh---noi-cong-hien-tri-thuc-tre-gop-phan-dung-xay-que-huong-dat-nuoc' className="apt-btn" target="_blank">Truy cập</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-8 col-xl-9">
              <div className='text-center mt-5 mb-5'>
                <ProjectContent campaigns={campaigns} />
              </div>
              <div className="pagination-container">
                <Pagination
                  current={currentPage}
                  total={campaigns.length}
                  pageSize={itemsPerPage}
                  onChange={(page) => setCurrentPage(page)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ListProject;
