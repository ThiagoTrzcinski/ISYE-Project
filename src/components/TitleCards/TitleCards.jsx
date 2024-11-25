import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';
import { db } from '../../firebase'; // Certifique-se de importar o Firebase configurado
import { collection, getDocs, query, where } from 'firebase/firestore';

const TitleCards = ({ title, collectionName, category }) => {
  const [data, setData] = useState([]);
  const cardsRef = useRef();

  // Função para buscar dados do Firestore
  const fetchData = async () => {
    try {
      let combinedData = [];

      if (collectionName) {
        // Buscar de uma única coleção
        const collectionRef = collection(db, collectionName);

        // Aplicar filtro por categoria, se necessário
        const q = category ? query(collectionRef, where('category', '==', category)) : collectionRef;
        const snapshot = await getDocs(q);

        combinedData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      } else if (category) {
        // Buscar de múltiplas coleções se apenas categoria for especificada
        const collections = ['Courses', 'Lessons', 'Texts'];
        for (const col of collections) {
          const collectionRef = collection(db, col);
          const q = query(collectionRef, where('category', '==', category));
          const snapshot = await getDocs(q);

          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            collection: col, // Identificar a origem
          }));
          combinedData = [...combinedData, ...items];
        }
      }

      setData(combinedData);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetchData();
    cardsRef.current.addEventListener('wheel', handleWheel);
  }, []); // Dependências ajustadas

  return (
    <div className='title-cards'>
      <h2>{title || "Popular on iSYE"}</h2>
      <div className="card-list" ref={cardsRef}>
        {data.map((item) => (
          <Link
            to={
              item.collection === "Lessons" ? `/player/${item.id}` :
                item.collection === "Articles" ? `/article/${item.id}` :
                item.collection === "Courses" ? `/article/${item.id}` :
                  `/`
            }
            className="card"
            key={item.id}
          >
            <img
              src={item.coverImage || 'https://ih1.redbubble.net/image.4905811447.8675/flat,750x,075,f-pad,750x1000,f8f8f8.jpg'}
              alt={item.name}
            />
            <p>{item.name}</p>
          </Link>

        ))}
      </div>
    </div>
  );
};

export default TitleCards;
