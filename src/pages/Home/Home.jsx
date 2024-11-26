import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom'; // Para navegação
import Navbar from '../../components/Navbar/Navbar';
import yogi_banner from '../../assets/hero_banner.jpg';
import yogi_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handlePlayClick = () => {
    navigate('/player/lesson1'); // Navega para Lesson 1
  };

  const handleMoreInfoClick = () => {
    navigate('/course/course1'); // Navega para Course 1
  };

  return (
    <div className='home'>
      <Navbar />
      <div className="yogi">
        <img src={yogi_banner} alt="" className='banner-img' />
        <div className="yogi-caption">
          <img src={yogi_title} alt="" className='caption-img' />
          <p>
            Yoga is an ancient Hindu tradition that harmonizes the mind, body, and spirit. 
            It blends physical postures, breath control, and meditation to promote inner 
            balance and self-awareness.
          </p>
          <div className="yogi-btns">
            <button className='btn' onClick={handlePlayClick}>
              <img src={play_icon} alt="" /> Play
            </button>
            <button className='btn dark-btn' onClick={handleMoreInfoClick}>
              <img src={info_icon} alt="" /> More Info
            </button>
          </div>
        </div>
      </div>
      <div className="more-cards">
        {/* Uma linha para cada tipo de conteúdo */}
        <TitleCards title="Courses" collectionName="Courses" />
        <TitleCards title="Lessons" collectionName="Lessons" />
        <TitleCards title="Articles" collectionName="Articles" />
        
        {/* Uma linha para conteúdos da mesma categoria */}
        <TitleCards title="Beginner" category="Beginner" />
        <TitleCards title="Kriya Yoga" category="kriya" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
