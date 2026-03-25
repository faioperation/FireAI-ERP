import React from 'react'
import LeaderNav from './LeaderNav'
import { Outlet } from 'react-router'

export default function Leader() {
  return (
    <div>
     <div>
      <LeaderNav/>
     </div>
     <div>
      <Outlet></Outlet>
     </div>
    </div>
  )
}
