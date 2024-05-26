import React from 'react'
import hasbulla from '../../assets/profileIcon/Hasbulla.jpg'
import { Button } from 'flowbite-react';

export default function UserInformation() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md flex">
        <div className="w-1/3 p-4 flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            <img
              className="w-full h-full rounded-full object-cover"
              src={hasbulla}
              alt="Profile"
            />
          </div>
          <p className="text-sm text-gray-500 mb-2">Allowed *.jpeg, *.jpg, *.png</p>
          <p className="text-sm text-gray-500 mb-4">max size of 3 Mb</p>
          <button className="mt-10 px-4 py-2 text-sm text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 focus:outline-none">
            Delete User
          </button>
        </div>
        <div className="w-2/3 p-4">
          <form>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Costa Rica</option>
                  {/* Add more options here */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mail</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Mail"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <Button
                color="gray"
                pill
                className="flex items-center justify-center w-full border border-gray-400 hover:border-blue-300 space-x-2 mt-4"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}