import React from 'react'
import { NavSection } from '@/components/interface'
import { navSections } from '@/data/navitem'
import Section from './Section'
import { logout } from '@/store/getToken'

const SideBar = (navItem: NavSection) => {
  return (
    <div>
      {navSections.map((navSection) => (
        <Section key={navSection.id} {...navSection}/>
      ))}
      <button onClick={()=>logout()}>ログアウト</button>
    </div>
  )
}

export default SideBar