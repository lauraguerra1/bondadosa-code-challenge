import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [purchasedOrder, setPurchasedOrder] = useState(null);

  useEffect(() => {
    setPurchasedOrder(JSON.parse(localStorage.getItem(orderId)) || null);
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? <p>loading...</p> : purchasedOrder ? 
        <h2>Thank you for your order! {purchasedOrder.orderId}</h2>
        : <p>We couldnt find that order </p>
      }
    </div>
  )
}

export default Confirmation