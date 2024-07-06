import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import SocialSignUp from './SocialSignUp';
import { useForm } from "react-hook-form";
import Spinner from 'react-bootstrap/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import { useResetPasswordMutation, useUserLoginMutation } from '../../redux/api/authApi';
import { message } from 'antd';
import { useMessageEffect } from '../../utils/messageSideEffect';
import jwtDecode from 'jwt-decode';


const SignIn = ({ handleResponse }) => {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [infoError, setInfoError] = useState('');
    const [show, setShow] = useState(true);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userLogin, { isError, isLoading, isSuccess, error }] = useUserLoginMutation();
    const [forgotEmail, setForgotEmail] = useState('');
    const [resetPassword, { isError: resetIsError, isSuccess: resetIsSuccess, error: resetError, isLoading: resetIsLoading }] = useResetPasswordMutation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    setTimeout(() => {
        setShow(false);
    }, 10000);

    const onSubmit = async (event) => {
        userLogin({ ...event })
    }

    const onHandleForgotPassword = async (e) => {
        e.preventDefault();
        resetPassword({ email: forgotEmail })
        setForgotEmail("");
        setShowForgotPassword(false);
    }
    useMessageEffect(resetIsLoading, resetIsSuccess, resetIsError, resetError, "Successfully Reset Password, Please check your Email!!")
    useEffect(() => {
        if (isError) {
            message.error(error?.data?.message)
            setInfoError(error?.data?.message)
        }
        if (isSuccess) {
            message.success('Successfully Logged in');
            navigate('/')
        }
    }, [isError, error, isSuccess, navigate])

    const handleShowForgotPassword = () => {
        setShowForgotPassword(!showForgotPassword);
    }

    const decodeToken = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken;
        } catch (error) {
            console.error(error);
        }
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePassWordChange = (e) => {
        setPassword(e.target.value);
    }


    const handleLogin = async (email, password) => {
        try {
            const response = await fetch('http://localhost:3700/users/login', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {       
                localStorage.setItem('token', data.token);         
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user.role === 'student') {
                    window.location.href = '/list-campaign-student';
                }else if (data.user.role === 'admin') {
                    window.location.href = '/listProjectAdmin';
                } else {
                    window.location.href = '/list-campaign';   
                }
            

              
            } else {
             
                console.error('Đăng nhập thất bại:', data.message);
            }
            
            // Handle the response data here
            // if (response.ok) {
            //     console.log(data.data.token);
            //     localStorage.setItem("token", JSON.stringify(data.data.token));
            //     const token = data?.data?.token;
            //     // Decode the token here
            //     const decodedToken = decodeToken(token);
            //     // Access the user information from the decoded token
            //     const userId = decodedToken?.id;
            //     const userEmail = decodedToken?.email;
            //     const userRole = decodedToken?.role;
            //     const timestamp = decodedToken?.timestamp;
            //     // Do something with the user information
                
            //     console.log("User ID:", userId);
            //     console.log("User Email:", userEmail);
            //     console.log("User Role:", userRole);
            //     console.log("Timestamp:", timestamp);
            //     localStorage.setItem("role", JSON.stringify(userRole));

            //     if (userRole === 0) {
            //         window.location.href = '/listProjectAdmin';
            //     } else if (userRole === 1) {
            //         window.location.href = '/list-campaign';
            //     }


            // } else {
            //     // Handle the error response here
            //     console.error(data?.message);
                
            // }
        } catch (error) {
            // Handle any errors here
            console.error(error);
           
        }
    }

    return (
        <>
            {
                showForgotPassword
                    ?
                    <form className="sign-in-form" onSubmit={onHandleForgotPassword}>

                    </form>
                    :
                    <><form className="sign-in-form">
                        <h2 className="title">Đăng nhập</h2>
                        <div className="input-field">
                            <span className="fIcon"><FaEnvelope /></span>
                            <input onChange={(e) => setEmail(e.target.value)} placeholder="Nhập email" type="email" />
                        </div>
                        {errors.email && <span className="text-danger">This field is required</span>}
                        <div className="input-field">
                            <span className="fIcon"><FaLock /></span>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Nhập mật khẩu" />
                        </div>
                        {errors.password && <span className="text-danger">This field is required</span>}
                        {infoError && <p className="text-danger">{infoError}</p>}
                      
                    </form>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <button className="iBtn" value="sign In" onClick={() => handleLogin(email, password)}>
                                {isLoading ? <Spinner animation="border" variant="info" /> : "Đăng nhập"}
                            </button>
                            <p>Chưa có tài khoản? <span><Link to="/signUp">Đăng ký</Link></span></p>
                        </div>
                    </>

            }
        </>
    );
};

export default SignIn;