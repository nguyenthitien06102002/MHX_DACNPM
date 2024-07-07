import React, { useState, useEffect } from 'react';
import './index.css';
import { useParams } from 'react-router-dom';

const Detail = ({id}) => {
  const [imageError, setImageError] = useState(false);
  const [filteredStrategy, setFilteredStrategy] = useState({});

  const handleGetStrategies = async (id) => {
    try {
      const response = await fetch(`http://localhost:3700/campaigns/campaign/info/${id}`);
      const data = await response.json();

      if (response.ok) {
        console.log('API response:', data);
        setFilteredStrategy(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      handleGetStrategies(id);
    }
  }, [id]);

  return (
    <div className="container" style={{ marginBottom: 100, marginTop: 100 }}>
      <div className="row p-5">
        <div className="col-lg-6">
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
            <h2 className='text-uppercase'>{filteredStrategy.title}</h2>
          </div>
          <p className='mt-3'>Thời gian: {new Date(filteredStrategy.startAt).toLocaleDateString()} - {new Date(filteredStrategy.endAt).toLocaleDateString()}</p>
          {/* <p className='mt-3'>Địa điểm: {filteredStrategy.place}</p> */}
          <p className='mt-3'>Mô tả: {filteredStrategy.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
