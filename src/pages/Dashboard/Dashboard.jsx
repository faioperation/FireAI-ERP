import React from 'react'
import Heading from '../../SharedComponants/Heading'
import Stats from './DashboardComponants/Stats'
import Graph from './DashboardComponants/Graph'
import TopProfile from './DashboardComponants/TopProfile'


export default function Dashboard() {
  return (
    <div className='min-h-screen space-y-10'>
        <Heading heading="Operations Dashboard" subHeading="Welcome back! Here's what's happening with your operations today."></Heading>
      <div>
        <Stats></Stats>
      </div>
      <div>
        <Graph></Graph>
      </div>
      <div>
        <TopProfile></TopProfile>
      </div>
    </div>
  )
}
