import React, { useState } from 'react'
import Post from '../components/Post'
import HomeLeft from '../components/home/HomeLeft'
import HomeRight from '../components/home/HomeRight'

const Home = () => {

    return (
        <div className='text-black flex flex-row'>

            {/* Left section */}
            <HomeLeft />
        </div>
    )
}

export default Home