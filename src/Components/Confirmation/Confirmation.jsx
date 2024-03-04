import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './Confirmation.css'

const Confirmation = () => {
  const { orderId } = useParams();
  const [loading, setLoading] = useState(true);
  const [purchasedOrder, setPurchasedOrder] = useState(null);

  useEffect(() => {
    setPurchasedOrder(JSON.parse(localStorage.getItem(orderId)) || null);
    console.log('purchased order',JSON.parse(localStorage.getItem(orderId)) )
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? <p>loading...</p> : purchasedOrder ? 
        <div className='confirmation'>
          <h2 className='semi-bold'>Thank you for your order!</h2>
          <div className='order-details'>
            <p>Order Number:</p>
            <p className='info'>{purchasedOrder.orderId}</p>
            <p>Order Total:</p>
            <p className='info'>{purchasedOrder.total}</p>
            <p>Shipping To:</p>
            <div className='info'>
              <p className='semi-bold'>{purchasedOrder.name}</p>
              <p>{purchasedOrder.address}, {purchasedOrder.city}, {purchasedOrder.state} {purchasedOrder.zipCode}</p>
            </div>
            <p>Payment Method:</p>
            <p className='info'>{purchasedOrder.payment.toUpperCase()}</p>
          </div>
        </div>
        : <p>We couldnt find that order </p>
      }
    </div>
  )
}

export default Confirmation