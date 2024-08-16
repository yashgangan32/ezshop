import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import moment from 'moment'
import displayINRCurrency from '../helpers/displayCurrency'
const OrderPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(SummaryApi.getOrder.url, {
        method: SummaryApi.getOrder.method,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setData(responseData.data);
      //console.log(responseData);
    } catch (err) {
      //console.error('Fetch error:', err);
      setError(err.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {
        !data[0] && (
          <p>No Order Available</p>
        )

      }
      <div className='p-5'>
        {
          data.map((item, index) => {
            return (
              <div key={item.userId + index} className='border '>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LL')}</p>
                <div className='border rounded-md'>
                  <div className='flex justify-between flex-col lg:flex-row'>

                    <div className='grid gap-1'>
                      {
                        item.productDetails.map((product, index) => {
                          return (
                            <div key={product.productId + index} className='flex gap-3 p-3'>
                              <img src={product.image[0]} className='w-28 h-28 object-scale-down p-2 bg-white'>
                              </img>
                              <div>
                                <div className='font-medium text-lg text-ellipsis line-clamp-1'>
                                  {product.name}
                                </div>
                                <div className='flex items-center gap-5 mt-4'>
                                  <div className='text-lg font-bold'>{displayINRCurrency(product.price)}</div>
                                  <p>Quantity : {product.quantity}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>
                    <div className='flex flex-col lg:items-center gap-4 p-2 min-w-[300px]'>
                      <div className='mr-3'>
                        <div className='font-medium text-lg'>Payment Details:</div>
                        <p className='ml-2'>Payment Method : {item.paymentDetails.payment_method_types[0]}</p>
                        <p className='ml-2'>Payment Status : {item.paymentDetails.payment_status}</p>
                      </div>

                      <div className='mr-6'>
                        <div className='font-medium text-lg'>Shipping Details:</div>
                        {
                          item.shipping_options.map((shipping, index) => {
                            return (
                              <div key={shipping.shipping_rate + index} className='ml-2'>
                                Shipping Amount : {shipping.shipping_amount}
                              </div>
                            )
                          })
                        }

                      </div>
                      <div className='font-semibold  w-fit lg:text-lg '>
                        Total Amount : ₹{item.totalAmount}
                      </div>
                     
                    </div>
                    
                  </div>
                </div>
              </div>)
          })
        }
      </div>

    </div>
  );

  
  
  
};

export default OrderPage;
