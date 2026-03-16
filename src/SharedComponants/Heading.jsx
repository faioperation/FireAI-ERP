import React from 'react'

export default function Heading({heading, subHeading}) {
  return (
    <div className=''>
      <h2 className='text:md md:text-xl text-black mb-2 font-semibold'>{heading}</h2>
      <h5 className='sub'>{subHeading}</h5>
    </div>
  )
}
