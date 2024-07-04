import { DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const CreateCampaigns = () => {

    const [selectTime, setSelectTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(null);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    // const token = JSON.parse(localStorage.getItem('token'));
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [startAt, setStartAt] = useState('');
    const [endAt, setEndAt] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const handleSelectDate = (date) => {
        const formattedDate = date.toISOString();
        setSelectedDate(formattedDate);
        console.log(formattedDate);

    };
    const handleSelectDateEnd = (date) => {
        const formattedDate = date.toISOString();
        setSelectedDateEnd(formattedDate);
        console.log(formattedDate);

    };

    const imageUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjv7qym6O2B15zWBDSrDWsCoPxWmKeodxEz-nWXaCE01nHoi5dsAYkgKMzDocWCMLCcf-7hkpMpAHXdhBA4EO9XF-ndTur4U9BV3_DOud1oF8oVtIt2e-koqsIjWGe1Qb4SdDYcq8Zng6YBwsN96jSQY0EQ8w_-YasrFzmOYE9BBfrx3RSJbews7_WY/s800/doan%20-26-3-%20thuviencuatui%20(34)%20(Custom).jpgf";


    const banners = [
        "https://doanthanhnien.vn/Content/uploads/images/133382190609839060_z4573951607144_50fe7867ab1cf1e790230a6144c8ed44.jpg",
        "https://doanthanhnien.vn/Content/uploads/images/133382190131936031_356622827_670872445078522_7208570064784879038_n.jpg",
        "https://doanthanhnien.vn/Content/uploads/images/133382190985955334_z4571757960181_c093253fe568264f29cb9ba828112478.jpg"
    ];

    const bannerTexts = [
        "Có thể khởi đầu của hành trình, các đoàn viên, thanh niên cảm thấy tận hưởng niềm vui giúp đỡ những người có hoàn cảnh khó khăn và được hiểu biết hơn về những giá trị văn hóa dân tộc khắp mọi miền của Tổ quốc hay mong muốn được trưởng thành qua những chuyến đi. Nhưng tựu trung, mục tiêu chung của những tình nguyện viên là đem sức trẻ, lòng quyết tâm và tinh thần tình nguyện đến giúp đồng bào vùng sâu vùng xa. ",
        "Với 02 đội hình cấp tỉnh được phát động từ năm 2022, bao gồm đội hình “Gia sư áo xanh” và đội hình “Bảo vệ mầm xanh” đã tạo được nhiều dấu ấn về hình ảnh “đem trí tuệ vào hoạt động tình nguyện”. Năm 2023, đội hình “Gia sư áo xanh” đã tổ chứ giảng dạy cho hơn 500 em học sinh với 11 lớp dạy tiếng Anh, 02 lớp Toán và 01 lớp tiếng Việt ở trên địa bàn thành phố Biên Hòa, huyện Thống Nhất và huyện Tân Phú; đội hình “Bảo vệ mầm xanh” ra quân ở địa điểm chùa Pháp Tuyền và Lữ đoàn Công binh 25 đã tổ chức các buổi về giáo dục giới tính và phòng chống xâm hại tình dục cho hơn 200 em học sinh.",
        "Sau 3 tháng triển khai chiến dịch, nhiều bạn sinh viên chia sẻ: “Mùa hè xanh là đi để cảm nhận, để được xa nhà và cùng ăn, cùng ở với bạn bè, Nhân dân, để bước chân đến nơi xa lạ, đem những kiến thức đã học được tại giảng đường để ứng dụng vào thực tiễn cuộc sống. Đó không chỉ mong ước, khát vọng của riêng bất kỳ một chiến sĩ tình nguyện nào, mà đó chính là mong ước khát vọng chung của tất cả những người làm công tác tình nguyện”."
    ];
  
    //lấy danh sách trường
    const [universities, setUniversities] = useState([]);
    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await fetch('http://localhost:3700/universities/getAll');
                if (!response.ok) {
                    throw new Error('Failed to fetch universities');
                }
                const data = await response.json();
                setUniversities(data);
                console.log(data);

            } catch (error) {
                console.error('Error fetching universities:', error);

            }
        };

        fetchUniversities();
    }, []);

    const [universityId, setUniversityId] = useState();

    const handleUniversityChange = (e) => {
        const selectedUniversityId = e.target.value;
        console.log('Selected University ID:', selectedUniversityId);
        setUniversityId(selectedUniversityId);
    };


    const handleSubmit = async () => {
        // e.preventDefault();
        try {

            const response = await axios.post('http://localhost:3700/campaigns/campaign', {
                image: image,
                title: name, 
                description: description,
                startAt: selectedDate,
                endAt: selectedDateEnd, 
                status: 0, 
                universityId : universityId
            });
          
            alert('Tạo chiến dịch thành công');
            window.location.href = '/listProjectAdmin';
         
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error');
        }
    };


    return (
        <div style={{ marginTop: '0', backgroundColor: "#1977cc", height: "fit-content", padding: "10px", textAlign: "center" }}>
            <label style={{ backgroundColor: "#1977cc", color: "white", fontWeight: "500", fontSize: "24px", padding: "5px 10px", borderRadius: "5px" }}>TẠO CÁC CHIẾN DỊCH MÙA HÈ XANH</label>
            <div className="p-4" style={{ background: '#f8f9fa' }}>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="mb-5 p-2 rounded" style={{ background: '#f8f9fa' }}>
                            {/* <img src={imageUrl} alt="Ảnh mô tả" style={{ width: '100%', marginBottom: '2rem' }} /> */}
                            <form className="row form-row">
                                <div className="col-md-12 mb-2">
                                    <label className="form-label">Tên chiến dịch:</label>
                                    <input className="form-control" onChange={(e) => setName(e.target.value)} placeholder='Tên chiến dịch' />
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label className="form-label">Trường:</label>
                                    <select className="form-control" onChange={handleUniversityChange}>
                                        <option value="">Select a University</option>
                                        {universities.map(university => (
                                            <option key={university.id} value={university.id}>
                                                {university.name}
                                            </option>
                                        ))}
                                    </select>
                                    {/* <select className="form-control" onChange={(e) => setUniversities(parseInt(e.target.value))}></select> */}
                                </div>
                                <div className="row">
                                    {/* <div className="col-md-4 mb-2">
                                        <label className="form-label">Địa điểm:</label>
                                        <input className="form-control" onChange={(e) => setPlace(e.target.value)} placeholder='Địa điểm' />
                                    </div> */}
                                    <div className="col-md-4 mb-2">
                                        <label className="form-label">Thời gian bắt đầu:</label>
                                        <DatePicker
                                            className="form-control"
                                            picker="date"
                                            format="YYYY-MM-DD"
                                            onChange={handleSelectDate}
                                        />
                                    </div>
                                    <div className="col-md-4 mb-2">
                                        <label className="form-label">Thời gian kết thúc:</label>
                                        <DatePicker
                                            className="form-control"
                                            picker="date"
                                            format="YYYY-MM-DD"
                                            onChange={handleSelectDateEnd}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12 mb-2">
                                    <label className="form-label">Poster:</label>
                                    <input className="form-control" onChange={(e) => setImage(e.target.value)} placeholder='Đường dẫn ảnh' />
                                </div>
                                <div className="col-md-12">
                                    <label className="form-label">Mô tả về chiến dịch:</label>
                                    <textarea required className="form-control mb-3" onChange={(e) => setDescription(e.target.value)} cols="30" rows="10" placeholder="Mô tả về chiến dịch" />
                                </div>

                            </form>
                            <div className="text-center mt-3 mb-5 col-md-12 ">
                                <button style={{ backgroundColor: "#1977cc" }} className="form-control" background="blue" onClick={handleSubmit}>Tạo</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-5 p-2 rounded" style={{ background: '#f8f9fa' }}>
                            <h4 className="text-center mb-4">Các chiến dịch mùa hè</h4>
                            <img src={banners[currentBannerIndex]} alt={`Banner ${currentBannerIndex}`} className="img-fluid mb-3" style={{ width: '100%' }} />
                            <p className="text-center">{bannerTexts[currentBannerIndex]}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCampaigns;
