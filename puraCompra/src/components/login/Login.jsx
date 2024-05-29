import React, { useState, useContext } from 'react';
import { Button, TextInput, Toast } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { IoIosMail } from "react-icons/io";
import { BiLock } from "react-icons/bi"; 
import { HiEye, HiEyeOff, HiX } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with email:", email, "and password:", password); // Verificar datos enviados
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const isFormFilled = email.length > 0 && password.length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen flex-grow">
      {showToast && (
        <div className="fixed top-4 right-4 transform transition-transform duration-300 ease-in-out">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">The mail or password is incorrect! Please try again.</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
      <form className="flex flex-col gap-4 max-w-md flex-grow" onSubmit={handleSubmit}>
        <div className="flex space-x-4 justify-center items-center">
          <FontAwesomeIcon icon={faGoogle} size='2xl' />
          <FontAwesomeIcon icon={faFacebook} size='2xl' />
          <FontAwesomeIcon icon={faGithub} size='2xl' />
          <FontAwesomeIcon icon={faLinkedin} size='2xl' />
        </div>

        <TextInput 
          id="email"
          name="email"
          type="email"
          icon={IoIosMail}
          placeholder="name@gmail.com"
          required
          value={email}
          onChange={handleEmailChange}
        />

        <div className='relative'>
          <TextInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            icon={BiLock}
            placeholder='Enter your password'
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={togglePasswordVisibility}
            style={{ background: 'transparent', border: 'none' }}
          >
            {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
          </button>
        </div>

        <Link to="/forgot-password" className="text-center text-blue-500 text-sm">Forgot your password?</Link>

        <Button type="submit" disabled={!isFormFilled}>
          Login
        </Button>
      </form>
    </div>
  );
}
