import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
        <ul className="flex justify-center">
            <li className='mx-2'>
                <Link to="/" className='hover:text-blue-300'>Home</Link>
            </li> 
            <li className='mx-2'>
                <Link to="/login" className='hover:text-blue-300'>Login</Link>
            </li>
            <li className='mx-2'>
                <Link to="/sign" className='hover:text-blue-300'>Sign</Link>
            </li>
            
        </ul>
    </nav>

  )
}
