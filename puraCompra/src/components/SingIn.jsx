import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { IoIosMail } from "react-icons/io";
import { BiSolidLock } from "react-icons/bi";
import { HiPhone, HiEye, HiEyeOff } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidLength = password.length >= 8;
  const containsUppercase = /[A-Z]/.test(password);
  const containsSpecialChar = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === repeatPassword;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Componente personalizado para el icono que actúa como botón
  const EyeIcon = ({ id }) => (
    <button
      type="button"
      className="absolute inset-y-0 right-0 flex items-center pr-3"
      onClick={togglePasswordVisibility}
      style={{ background: 'transparent', border: 'none' }}
    >
      {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
    </button>
  );

  return (
    <div className="flex justify-around w-full">
      <div className="flex-column items-center">
        <h1 className='text-3xl pb-3'>Password Requirements</h1>
        <div className="flex items-center gap-2">
          <FaCheckCircle className={isValidLength ? "text-green-500" : "text-gray-300"} />
          <p className={isValidLength ? "text-green-500" : "text-gray-500"}>At least 8 characters</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className={containsUppercase ? "text-green-500" : "text-gray-300"} />
          <p className={containsUppercase ? "text-green-500" : "text-gray-500"}>At least one uppercase letter</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className={containsSpecialChar ? "text-green-500" : "text-gray-300"} />
          <p className={containsSpecialChar ? "text-green-500" : "text-gray-500"}>At least one special character</p>
        </div>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className={passwordsMatch && password !== "" ? "text-green-500" : "text-gray-300"} />
          <p className={passwordsMatch && password !== "" ? "text-green-500" : "text-gray-500"}>Password must match</p>
        </div>
      </div>

      <form className="flex flex-col gap-4 shadow-xl max-w-md flex-grow">
        <div className='flex min-w-md justify-between'>
          <TextInput id="name" type="text" placeholder="Enter your name" required shadow />
          <TextInput id="lastname" type="text" placeholder="Enter your lastname" required shadow />
        </div>
        <div>
          <TextInput id="phone" type="tel" icon={HiPhone} placeholder="+(506) 89893335" required shadow />
        </div>
        <div>
          <TextInput id="email" type="email" icon={IoIosMail}  placeholder="name@gmail.com" required shadow />
        </div>
        <div className='relative'>
          <TextInput id="password" type={showPassword ? "text" : "password"} icon={BiSolidLock} placeholder='Enter your password' required shadow onChange={e => setPassword(e.target.value)} />
          <EyeIcon id="password-eye" />
        </div>
        <div className='relative'>
          <TextInput id="repeat-password" type={showPassword ? "text" : "password"} icon={BiSolidLock} placeholder='Please repeat your password' required shadow onChange={e => setRepeatPassword(e.target.value)} />
          <EyeIcon id="repeat-password-eye" />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link to='/' className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit" disabled={!isValidLength || !containsUppercase || !containsSpecialChar || !passwordsMatch}>Register new account</Button>
      </form>
    </div>
  );
}
