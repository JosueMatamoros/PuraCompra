import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import hasbulla from "../../profileIcon/hasbulla.png";
import { AuthContext } from "../../context/AuthContext";
import IconModal from "../modal/IconModal";
import axios from "axios";

export default function UserInformation() {
  const { user, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    lastname: "",
    phoneNumber: "",
    country: "",
    mail: "",
    gender: "",
    profilePicture: user.profilePicture || hasbulla,
    addresses: user.Addresses || []
  });

  useEffect(() => {
    if (user) {
      setUserInfo((prevUserInfo) => ({
        name: user.name || "",
        lastname: user.lastname || "",
        phoneNumber: user.phoneNumber || "",
        country: user.country || "",
        mail: user.mail || "",
        gender: user.gender || "",
        profilePicture: user.profilePicture || hasbulla,
        addresses: user.Addresses || prevUserInfo.addresses
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userInfo.name ||
      !userInfo.lastname ||
      !userInfo.phoneNumber ||
      !userInfo.country ||
      !userInfo.mail ||
      !userInfo.gender
    ) {
      setError("All fields are required");
      return;
    }

    try {
      if (user && user.UsersID) {
        const response = await axios.put(
          `http://localhost:3000/users/${user.UsersID}`,
          userInfo
        );

        setError("");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        updateUser(response.data);
        const updatedUser = { ...response.data, Addresses: user.Addresses };
        console.log("Updated user:", updatedUser);
        updateUser(updatedUser);
      } else {
        console.error("User ID is not defined");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  const handleUpload = (filePath) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      profilePicture: filePath,
    }));
    updateUser({ ...user, profilePicture: filePath });
  };

  const profilePicture = user?.profilePicture
    ? `http://localhost:3000${user.profilePicture}`
    : hasbulla;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md flex">
        <div className="w-1/3 p-4 flex flex-col items-center">
          <div className="w-32 h-32 mb-4">
            <img
              className="w-full h-full rounded-full object-cover cursor-pointer"
              src={profilePicture}
              alt="Profile"
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Allowed *.jpeg, *.jpg, *.png
          </p>
          <p className="text-sm text-gray-500 mb-4">max size of 3 Mb</p>
          <button className="mt-10 px-4 py-2 text-sm text-white bg-red-500 rounded-md shadow-md hover:bg-red-600 focus:outline-none">
            Delete User
          </button>
        </div>
        <div className="w-2/3 p-4">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Full Name"
                  value={userInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Last Name"
                  value={userInfo.lastname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Phone Number"
                  value={userInfo.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  name="country"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userInfo.country}
                  onChange={handleChange}
                >
                  <option value="Costa Rica">Costa Rica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Mail
                </label>
                <input
                  type="text"
                  name="mail"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Mail"
                  value={userInfo.mail}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userInfo.gender}
                  onChange={handleChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-6">
              <Button
                color="gray"
                pill
                className="flex items-center justify-center w-full border border-gray-400 hover:border-blue-300 space-x-2 mt-4"
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
      <IconModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
        userId={user.UsersID}
      />
      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Success! Address updated.
            </div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </>
  );
}
