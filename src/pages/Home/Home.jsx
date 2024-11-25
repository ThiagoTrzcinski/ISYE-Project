import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import yogi_banner from '../../assets/hero_banner.jpg';
import yogi_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="yogi">
        <img src={yogi_banner} alt="" className='banner-img' />
        <div className="yogi-caption">
          <img src={yogi_title} alt="" className='caption-img' />
          <p>
            Discovering his ties to a secret ancient order, a young man living in modern Istanbul
            embarks on a quest to save the city from an immortal enemy
          </p>
          <div className="yogi-btns">
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt="" />More Info</button>
          </div>
        </div>
      </div>
      <div className="more-cards">
        {/* Uma linha para cada tipo de conteúdo */}
        <TitleCards title="Courses" collectionName="Courses" />
        <TitleCards title="Lessons" collectionName="Lessons" />
        <TitleCards title="Articles" collectionName="Articles" />
        
        {/* Uma linha para conteúdos da mesma categoria */}
        <TitleCards title="Beginner" category="kriya" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
