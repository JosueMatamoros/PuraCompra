import React, {useContext, useEffect} from 'react'
import { Label, TextInput, Select } from 'flowbite-react'
import { AuthContext } from "../../context/AuthContext";

export default function ShippingAddresses( { shippingInfo, setShippingInfo } ) {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.Addresses && user.Addresses.length > 0 && !shippingInfo.address) {
      setShippingInfo((prevInfo) => ({
        ...prevInfo,
        name: user.name || "",
        lastName: user.lastname || "",
        address: user.Addresses[0].address,
      }));
    }
  }, [user, shippingInfo.address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className='w-1/2 flex flex-col items-center p-8'>
      <div className='flex w-full'>
        <div className='w-full pr-2'>
          <Label>Name</Label>
          <TextInput
            type='text'
            placeholder='Name'
            name='name'
            value={shippingInfo.name}
            onChange={handleChange}
          />
        </div>
        <div className='w-full'>
          <Label>LastName</Label>
          <TextInput
            type='text'
            placeholder='LastName'
            name='lastName'
            value={shippingInfo.lastName}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='w-full mt-4'>
        <Label>Address</Label>
        <Select
          className='w-full'
          name='address'
          value={shippingInfo.address}
          onChange={handleChange}
        >
          {user && user.Addresses ? (
            user.Addresses.map((addressObj) => (
              <option key={addressObj.AddressID} value={addressObj.address}>
                {addressObj.address}
              </option>
            ))
          ) : (
            <option value=''>No addresses available</option>
          )}
        </Select>
      </div>
    </div>
  );
}
