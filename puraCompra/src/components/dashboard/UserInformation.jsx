import React from 'react'
import hasbulla from '../../assets/profileIcon/Hasbulla.jpg'

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
                  <option>United Arab Emirates</option>
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
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-2 text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
