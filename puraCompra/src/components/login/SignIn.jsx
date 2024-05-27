import React, { useState, useContext } from 'react';
import { Button, Checkbox, Label, TextInput, Toast, Select } from "flowbite-react";
import { IoIosMail } from "react-icons/io";
import { BiSolidLock } from "react-icons/bi";
import { BsGenderAmbiguous } from "react-icons/bs";
import { TiWorld } from "react-icons/ti";
import { HiPhone, HiEye, HiEyeOff,HiCheck } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { PiUserCircle } from "react-icons/pi";
import { AuthContext } from '../../context/AuthContext';


export default function SignIn({ setActiveForm }) {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    phone: '',
    email: '',
    gender: '',
    country: '',
    password: '',
    repeatPassword: '',
    termsAgreed: false
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorStyle, setErrorStyle] = useState({
    name: false,
    lastname: false,
    phone: false
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "name" || name === "lastname") {
      if (/^[A-Za-z]*$/.test(value) || value === "") {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        setErrorStyle(prev => ({ ...prev, [name]: false }));
      } else {
        setErrorStyle(prev => ({ ...prev, [name]: true }));
      }
    } else if (name === "phone") {
      if (/^[0-9]*$/.test(value) || value === "") {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
        setErrorStyle(prev => ({ ...prev, [name]: false }));
      } else {
        setErrorStyle(prev => ({ ...prev, [name]: true }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.country) {
      console.log('Country cannot be empty');
      return;
    }
    if (formData.termsAgreed && formData.password.length >= 8 && /[A-Z]/.test(formData.password) && /[^A-Za-z0-9]/.test(formData.password) && formData.password === formData.repeatPassword && /^[A-Za-z]+$/.test(formData.name) && /^[A-Za-z]+$/.test(formData.lastname)) {
      console.log('Form Data', formData);
      const success = await register(formData.name, formData.lastname, formData.phone, formData.email, formData.password, formData.gender, formData.country);
      if (success) {
        setActiveForm('login');  // Cambiar a login después del registro exitoso
        console.log('Form Data:', formData);
      }
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <div className="flex justify-around w-full items-center">
      <div className="flex-column items-center">
        <h1 className='text-3xl pb-3'>Password Requirements</h1>
        <div className="flex items-center gap-2">
          <FaCheckCircle className={formData.password.length >= 8 ? "text-green-500" : "text-gray-300"} />
          <p className={formData.password.length >= 8 ? "text-green-500" : "text-gray-500"}>At least 8 characters</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className={/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-300"} />
          <p className={/[A-Z]/.test(formData.password) ? "text-green-500" : "text-gray-500"}>At least one uppercase letter</p>
        </div>
        <div className="flex items-center gap-2">
          <FaCheckCircle className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : "text-gray-300"} />
          <p className={/[^A-Za-z0-9]/.test(formData.password) ? "text-green-500" : "text-gray-500"}>At least one special character</p>
        </div>
        <div className='flex items-center gap-2'>
          <FaCheckCircle className={formData.password === formData.repeatPassword && formData.password !== "" ? "text-green-500" : "text-gray-300"} />
          <p className={formData.password === formData.repeatPassword && formData.password !== "" ? "text-green-500" : "text-gray-500"}>Password must match</p>
        </div>
      </div>

      <form className="flex flex-col gap-4 max-w-md flex-grow" onSubmit={handleSubmit}>
        <PiUserCircle className="text-6xl text-slate-400 mx-auto" />
        
        <div className='flex justify-between'>
          <TextInput
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            shadow
            value={formData.name}
            onChange={handleChange}
            className={errorStyle.name ? "border-red-500" : ""}
          />
          <TextInput
            id="lastname"
            name="lastname"
            type="text"
            placeholder="Enter your lastname"
            required
            shadow
            value={formData.lastname}
            onChange={handleChange}
            className={errorStyle.lastname ? "border-red-500" : ""}
          />
        </div>
        <TextInput
            id="phone"
            name="phone"
            type="tel"
            icon={HiPhone}
            placeholder="+(506) 89893335"
            required
            shadow
            value={formData.phone}
            onChange={handleChange}
            className={errorStyle.phone ? "border-red-500" : ""}
          />
        <TextInput
            id="email"
            name="email"
            type="email"
            icon={IoIosMail}
            placeholder="name@gmail.com"
            required
            shadow
            value={formData.email}
            onChange={handleChange}
          />
        <Select
            id="gender"
            name="gender"
            icon={BsGenderAmbiguous}
            placeholder="Gender"
            required
            shadow
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="" disabled>Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
        </Select>
        <TextInput
            id="country"
            name="country"
            type="text"
            icon={TiWorld}
            placeholder="Country"
            required
            shadow
            value={formData.country}
            onChange={handleChange}
          />

        <div className='relative'>
          <TextInput
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            icon={BiSolidLock}
            placeholder='Enter your password'
            required
            shadow
            value={formData.password}
            onChange={handleChange}
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
        <div className='relative'>
          <TextInput
            id="repeat-password"
            name="repeatPassword"
            type={showPassword ? "text" : "password"}
            icon={BiSolidLock}
            placeholder='Please repeat your password'
            required
            shadow
            value={formData.repeatPassword}
            onChange={handleChange}
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
        <div className="flex items-center gap-2">
          <Checkbox
            id="agree"
            name="termsAgreed"
            checked={formData.termsAgreed}
            onChange={handleChange}
          />
          <Label htmlFor="agree" className="flex">
            I agree with the&nbsp;
            <Link to='/' className="text-cyan-600 hover:underline dark:text-cyan-500">
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit" disabled={!formData.termsAgreed || formData.password.length < 8 || !/[A-Z]/.test(formData.password) || !/[^A-Za-z0-9]/.test(formData.password) || formData.password !== formData.repeatPassword || !/^[A-Za-z]+$/.test(formData.name) || !/^[A-Za-z]+$/.test(formData.lastname)}>Register new account</Button>
      </form>
    </div>
  );
}
