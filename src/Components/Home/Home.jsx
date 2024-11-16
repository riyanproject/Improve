import React from 'react'
import './Home.css'
import Navbar from '../Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../TitleCards/TitleCards'
import Footer from '../Footer/Footer'


const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className="hero">
    </div>
    <div className="hero-caption"></div>
    <div className="hero-btns">


        </div>

        <div className='more-cards'>
        <TitleCards title="Seek knowledge"/>
        <TitleCards title="Motivation"/>
        <TitleCards title="Work as a Man"/>
        <TitleCards title="Self care"/>
        <TitleCards title="Faith"/>

        </div>
        <Footer/>
    </div>
    
  )
}

export default Home