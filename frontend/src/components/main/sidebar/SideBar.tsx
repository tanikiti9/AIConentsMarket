import React from 'react'

interface NavItem {
  icon: string;
  name: string;
}

interface NavSection {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}


const SideBar = (navItem: NavItem) => {

  return (
    <div>SideBar</div>
  )
}

export default SideBar