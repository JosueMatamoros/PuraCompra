import React from 'react'
import { Label, TextInput } from 'flowbite-react'

export default function ShippingAddresses() {
  return (
    <div className='w-1/2 flex flex-col  items-center p-8 '>
      <div className='flex w-full'>
        <div className='w-full pr-2'>
          <Label>Name</Label>
          <TextInput type='text' placeholder='Izack'/>
        </div>
        <div className='w-full'>
          <Label>LastName</Label>
          <TextInput type='text' placeholder='Ramirez'/>
        </div>
      </div>
      <div className='w-full '>
        <Label >Address</Label>
        <TextInput className='w-full' type='text' placeholder='1234 Main St'/>
      </div>


    </div>
  )
}
