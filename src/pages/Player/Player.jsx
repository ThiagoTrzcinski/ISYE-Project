import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase'; // Certifique-se de configurar o Firebase corretamente
import { collection, query, where, getDocs } from 'firebase/firestore';

const Player = () => {
  const { id } = useParams(); // Obtém o ID da lição a partir da URL
  const navigate = useNavigate();

  const [lessonData, setLessonData] = useState(null); // Estado para armazenar os dados da lição
  const [error, setError] = useState(null); // Estado para capturar erros
  const [loading, setLoading] = useState(true); // Estado para exibir carregamento

  // Função para buscar dados da lição no Firestore

  const fetchLessonData = async (lessonId) => {
    try {
      console.log(`Fetching lesson with ID: ${lessonId}`);
  
      // Usar consulta para buscar pelo campo `id`
      const lessonsRef = collection(db, 'Lessons');
      const q = query(lessonsRef, where('id', '==', lessonId));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        console.log('Lesson data found:', docData);
        setLessonData(docData);
      } else {
        console.warn('Lesson not found with ID:', lessonId);
        setError('Lesson not found in Firestore.');
      }
    } catch (err) {
      console.error('Error fetching lesson data:', err);
      setError('Failed to load lesson data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLessonData(id); // Chama a função para buscar dados quando o ID está disponível
    } else {
      setError('No lesson ID provided.');
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="player">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player">
        <img src={back_arrow_icon} alt="Go Back" onClick={() => navigate(-1)} />
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Go Back" onClick={() => navigate(-1)} />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${lessonData.link}`} // Usando o campo "link" da coleção
        title={lessonData.name}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{lessonData.publishDate}</p>
        <p>{lessonData.name}</p>
        <p>{lessonData.type}</p>
      </div>
    </div>
  );
};

export default Player;
