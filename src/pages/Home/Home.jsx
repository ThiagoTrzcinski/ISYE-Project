import React, { useRef } from 'react';
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

  // Referências para as seções
  const homeRef = useRef();
  const coursesRef = useRef();
  const lessonsRef = useRef();
  const articlesRef = useRef();
  const othersRef = useRef();

  const sectionRefs = {
    home: homeRef,
    courses: coursesRef,
    lessons: lessonsRef,
    articles: articlesRef,
    others: othersRef,
  };

  const handlePlayClick = () => {
    navigate('/player/lesson1'); // Navega para Lesson 1
  };

  const handleMoreInfoClick = () => {
    navigate('/course/course1'); // Navega para Course 1
  };

  return (
    <div className='home'>
      <Navbar sectionRefs={sectionRefs} />
      <div ref={homeRef} className="yogi">
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
      <div ref={coursesRef} className="more-cards">
        <TitleCards title="Courses" collectionName="Courses" />
      </div>
      <div ref={lessonsRef} className="more-cards">
        <TitleCards title="Lessons" collectionName="Lessons" />
      </div>
      <div ref={articlesRef} className="more-cards">
        <TitleCards title="Articles" collectionName="Articles" />
      </div>

      <div ref={othersRef} className="more-cards">
        <TitleCards title="Beginner" category="Beginner" />
        <TitleCards title="Kriya Yoga" category="kriya" />
      </div>


      <Footer />
    </div>
  );
};

export default Home;
