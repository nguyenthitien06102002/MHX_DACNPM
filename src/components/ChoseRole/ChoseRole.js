import React from 'react';


import { FaCheckDouble } from "react-icons/fa";
import './index.css';

const Choserole = () => {
	return (
		<section className="section section-specialities position-relative">
			<div className="container-fluid">
				<div className='mb-5 section-title text-center'>
					<h2>Who are you ?
                    </h2>
					<p className='m-0'>Chọn vai trò để tham gia vào hệ thống.</p>
				</div>

				<div className="row justify-content-center">
					<div className="col-md-9">
						<div className="specialities-slider d-flex justify-content-center align-items-center gap-5">
							<div 
							onClick={() => {
								window.location.href = '/login';
								}}
							 className="speicality-item text-center">
								<div className="speicality-img">
									<img 
                                    style={{borderRadius: '50%'}}
                                    src={'data:image/png;base64,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'} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Lãnh đạo địa phương</p>
							</div>
							<div onClick={() => {
								window.location.href = '/login';
								}} 
								className="speicality-item text-center">
								<div className="speicality-img">
									<img style={{borderRadius: '50%'}} src={'data:image/png;base64,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'} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Nhà Trường</p>
							</div>
							<div
							onClick={() => {
								window.location.href = '/login';
								}} 
							className="speicality-item text-center">
								<div className="speicality-img">
									<img style={{borderRadius: '50%'}} src={'data:image/png;base64,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'} className="img-fluid" alt="" />
									<span><i><FaCheckDouble/></i></span>
								</div>
								<p>Sinh Viên</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Choserole;