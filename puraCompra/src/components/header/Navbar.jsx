import React from 'react'
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
        <ul className="flex justify-center">
            <li className='mx-2'>
                <Link to="/" className='hover:text-blue-300  md:text-2xl font-medium'>Home</Link>
            </li>
            
        </ul>
    </nav>

  )
}
