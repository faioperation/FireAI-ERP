import React from 'react'

export default function Heading({heading, subHeading}) {
  return (
    <div className=''>
      <h2 className='text-xl '>{heading}</h2>
      <h5 className='text-sm '>{subHeading}</h5>
    </div>
  )
}
