import React from 'react'
import Heading from '../../SharedComponants/Heading'
import Stats from './DashboardComponants/Stats'

import TopProfile from './DashboardComponants/TopProfile'
import ServiceBreakdown from './DashboardComponants/ServiceBreakdown'


export default function Dashboard() {
  return (
    <div className='min-h-screen space-y-10'>
        <Heading  heading="Operations Dashboard" subHeading="Welcome back! Here's what's happening with your operations today."></Heading>
      <div>
        <Stats></Stats>
      </div>
      <div className='my-12'>
        <ServiceBreakdown></ServiceBreakdown>
      </div>
      <div>
        <TopProfile></TopProfile>
      </div>
    </div>
  )
}
