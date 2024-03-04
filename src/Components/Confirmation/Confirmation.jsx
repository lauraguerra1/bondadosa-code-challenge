import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Confirmation = () => {
  const { orderId } = useParams();
  
  useEffect(() => {
    const purchasedOrder = JSON.parse(localStorage.getItem(orderId));
    console.log('purcahsed order', purchasedOrder)
  }, [])
  return (
    <div>Confirmation {orderId}</div>
  )
}

export default Confirmation