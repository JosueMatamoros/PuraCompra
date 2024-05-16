import React, { useState } from 'react';
import { Button, TextInput} from "flowbite-react";
import { IoIosMail } from "react-icons/io";
import { BiLock } from "react-icons/bi"; 
import { HiEye, HiEyeOff } from "react-icons/hi";





import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';



export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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

      <form className="flex flex-col gap-4 max-w-md flex-grow">
        <div className="flex space-x-4 justify-center items-center">
            <FontAwesomeIcon icon={faGoogle} size='2xl'/>
            <FontAwesomeIcon icon={faFacebook} size='2xl' />
            <FontAwesomeIcon icon={faGithub}  size='2xl'/>
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
        {/*Forgot yor pasword link  */}
        <Link to="/forgot-password" className="text-center text-blue-500 text-sm">Forgot your password?</Link>


        <Button type="submit" disabled={!isFormFilled}>
          Login
        </Button>
      </form>
    </div>
  );
}
