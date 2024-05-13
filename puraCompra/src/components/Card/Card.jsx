import React from 'react'


export default function Card({image}) {
  return (
    <div className='w-full max-w-xs border border-gray-200 rounded-lg shadow m-1'>
    <div>
        <img src={image} alt="Card" className='p-8 rounded-t-lg' />
    </div>
</div>
  )
}
