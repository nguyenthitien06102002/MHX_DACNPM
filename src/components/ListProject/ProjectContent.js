import React from 'react';
import { Link } from 'react-router-dom';
import { FaLocationArrow, FaRegThumbsUp, FaComment, FaClock } from "react-icons/fa";
import {useHistory} from 'react-router-dom';
import "./index.css";

const ProjectContent = ({ campaigns }) => {
  const handleImageError = (e) => {
    e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s';
  };

  if (!campaigns || campaigns.length === 0) {
    return <div>No campaigns available</div>;
  }

  return (
    <div>
      {campaigns.map((campaign, index) => (
        <div key={index} className="mb-4 rounded" style={{ background: '#f3f3f3' }}>
          <div className='d-flex p-3 justify-content-between align-items-center'>
            <div className='doc-img-fluid d-flex align-items-center'>
              <img
                src={campaign.image ? campaign.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFl4LFohrLy-RNdC7vp_c8M6PR0FFm55OxxjlmsIxow&s'} // Sử dụng placeholder image
                alt="Campaign Image"
                onError={handleImageError}
                className=""
              />
            </div>
            <div className="doc-info">
              <h5 className='mb-0'>{campaign.title}</h5>
              <p className='m-0 form-text'>{campaign.description}</p>
              <div className="clinic-details mt-2">
                {/* <p className="form-text text-secondary"><FaLocationArrow /> Địa điểm</p> */}
                <p className="form-text text-secondary"><FaClock /> Thời gian diễn ra:
                  {(() => {
                    try {
                      return new Date(campaign.startAt).toLocaleString() + ' – ' + new Date(campaign.endAt).toLocaleString();
                    } catch (error) {
                      return 'N/A';
                    }
                  })()}
                </p>
              </div>
            </div>
            <div className="doc-info-right me-3">
              <div className="clini-infos">
                <ul>
                  <li><FaRegThumbsUp /> 97%</li>
                  <li><FaComment /> 4 Feedback</li>
                </ul>
              </div>
              <div className="clinic-booking">
                <div className='clinic-booking-button'>
                  <Link to={`/detail/studentList/${campaign.id}`} className="pro-btn">Chi tiết</Link>
                </div>
                <div className='clinic-booking-button mt-2'>
                  <Link className="apt-btn">Xóa</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectContent;
