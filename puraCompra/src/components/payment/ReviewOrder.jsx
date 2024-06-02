import React from 'react';

const ReviewOrder = ( { cartItems, shippingInfo, paymentInfo } ) => {

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2);

  return (
    <div className="p-6 bg-white shadow rounded-md w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Products</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between my-2">
            <div>
              <p className="text-sm text-gray-500">{item.product.name} x {item.quantity}</p>
            </div>
            <p className="text-sm text-gray-500">${(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
     
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Shipping</h2>
        <p className="text-sm text-gray-500">Plus taxes</p>
        <p className="text-lg font-medium">$9.99</p> {/* Assuming a static shipping cost */}
      </div>
     
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Total</h2>
        <p className="text-xl font-bold">${(parseFloat(totalAmount) + 9.99).toFixed(2)}</p>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Shipment details</h2>
        <p className="text-sm text-gray-500">{shippingInfo.name} {shippingInfo.lastName}</p>
        <p className="text-sm text-gray-500">{shippingInfo.address}</p>
      </div>
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-xl font-semibold">Payment details</h2>
        <p className="text-sm text-gray-500">Card type: <span className="text-gray-900">Visa</span></p>
        <p className="text-sm text-gray-500">Card holder: <span className="text-gray-900">{paymentInfo.cardName}</span></p>
        <p className="text-sm text-gray-500">Card number: <span className="text-gray-900">xxxx-xxxx-xxxx-{paymentInfo.cardNumber.slice(-4)}</span></p>
        <p className="text-sm text-gray-500">Expiry date: <span className="text-gray-900">{paymentInfo.expiryDate}</span></p>
      </div>
    </div>
  );
}


export default ReviewOrder;
