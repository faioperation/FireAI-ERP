import React from 'react'
import MemberNav from './MemberNav'
import { Outlet } from 'react-router'

export default function Member() {
  return (
    <div>
      <MemberNav/>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}
