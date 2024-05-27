import React from 'react';

const ReviewOrder = () => {
  return (
    <div className="p-6 bg-white shadow rounded-md w-full ">
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-sm text-gray-500">4 selected</p>
        </div>
        <p className="text-lg font-medium">$134.98</p>
      </div>
     
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Shipping</h2>
          <p className="text-sm text-gray-500">Plus taxes</p>
        </div>
        <p className="text-lg font-medium">$9.99</p>
      </div>
     
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Total</h2>
        <p className="text-xl font-bold">$144.97</p>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Shipment details</h2>
        <p className="text-sm text-gray-500">John Smith</p>
        <p className="text-sm text-gray-500">1 MUI Drive, Reactville, Anytown, 99999, USA</p>
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-xl font-semibold">Payment details</h2>
        <p className="text-sm text-gray-500">Card type: <span className="text-gray-900">Visa</span></p>
        <p className="text-sm text-gray-500">Card holder: <span className="text-gray-900">Mr. John Smith</span></p>
        <p className="text-sm text-gray-500">Card number: <span className="text-gray-900">xxxx-xxxx-xxxx-1234</span></p>
        <p className="text-sm text-gray-500">Expiry date: <span className="text-gray-900">04/2024</span></p>
      </div>
    </div>
  );
}


export default ReviewOrder;
