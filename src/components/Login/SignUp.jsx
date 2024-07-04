import React, { useEffect, useState } from 'react';
import { FaCheck, FaEnvelope, FaLock, FaTimes, FaUser } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import Spinner from 'react-bootstrap/Spinner'
import swal from 'sweetalert';
import { useDoctorSignUpMutation, usePatientSignUpMutation } from '../../redux/api/authApi';
import { message } from 'antd';
import axios from 'axios';

const SignUp = ({ setSignUp }) => {
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

 const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [universityId, setUniversityId] = useState();
    const [name, setName] = useState('');
    const [studentId, setStudentId] = useState('');


    const handleUniversityChange = (e) => {
        const selectedUniversityId = e.target.value;
        // console.log('Selected University ID:', selectedUniversityId);
        setUniversityId(selectedUniversityId);
    };
   


    const handleEmailChange = (e) => {
        const { value } = e.target;
        setEmail(value);

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Email không đúng định dạng');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);

        // Kiểm tra điều kiện password
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError('Password phải có ít nhất 8 ký tự và 1 ký tự đặc biệt');
        } else {
            setPasswordError('');
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            const response = await axios.post('http://localhost:3700/users/register', {
                name: name,
                studentId: studentId,
                email: email,
                password: password,
                role: "student",
                universityId: universityId
            
            });
            // console.log('User registered successfully:', response.data);
            alert('User registered successfully');
            window.location.href = '/login'; 
            // Optionally handle success, e.g., redirect to another page
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="sign-up-form" onSubmit={handleSubmit} style={{ width: '400px' }}>
                <h2 className="title">Đăng ký</h2>
                <div className="input-field">
                    <span className="fIcon"><FaUser /></span>
                    <input placeholder="Họ và Tên" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-field">
                    <span className="fIcon"><FaUser /></span>
                    <input placeholder="Mã số sinh viên" name="studentId" type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
                </div>
                <div>
                    <div className="input-field">
                        <span className="fIcon"><FaEnvelope /></span>
                        <input placeholder="Email" name="email" type="email" value={email} onChange={handleEmailChange}  />
                    </div>
                    {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>
                <div>
                    <div className="input-field">
                        <span className="fIcon"><FaLock /></span>
                        <input type="password" name="password" placeholder="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <div className='input-field d-flex align-items-center gap-2 justify-content-center'>
                    <div className='text-nowrap'>Trường</div>
                    <select
                        className="form-select w-50"
                        aria-label="select"
                        onChange={handleUniversityChange}
                        defaultValue=''
                    >
                        <option value='' disabled>Select a University</option>
                        {universities.map(university => (
                            <option key={university.id} value={university.id}>
                                {university.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    className="btn btn-primary btn-block mt-2 iBtn"
                >
                    Đăng ký
                </button>
                <p className="social-text">Or Sign up with a social account</p>
                <SocialSignUp />
            </form>
        </div>
    );
};

export default SignUp;
