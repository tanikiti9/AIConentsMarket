'use client'
import SideBar from './sidebar/SideBar'
import MainContainer from './main-container/MainContainer'


const Main = () => {
    return (
        <main>
            <div className='SideBar '><SideBar/></div>
            <div className='MainContainerd'><MainContainer /></div>
        </main>

    )
}

export default Main