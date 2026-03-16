import React from 'react'

export default function Heading({heading, subHeading}) {
  return (
    <div className=''>
      <h2 className='text:md md:text-2xl text-black mb-2 font-bold'>{heading}</h2>
      <h5 className='sub'>{subHeading}</h5>
    </div>
  )
}
