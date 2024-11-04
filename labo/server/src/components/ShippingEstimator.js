import React, { useState } from 'react';

const ShippingEstimator = ({ calculateShipping }) => {
  const [address, setAddress] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  const handleEstimate = () => {
    const cost = calculateShipping(address);
    setShippingCost(cost);
  };

  return (
    <div>
      <h2>Estimate Shipping Cost</h2>
      <input
        type="text"
        placeholder="Enter your address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleEstimate}>Estimate</button>
      {shippingCost > 0 && <p>Estimated Shipping Cost: ${shippingCost.toFixed(2)}</p>}
    </div>
  );
};

export default ShippingEstimator;
