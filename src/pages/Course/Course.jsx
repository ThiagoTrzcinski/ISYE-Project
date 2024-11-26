import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Navegação e parâmetros da URL
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Configuração do Firebase
import back_arrow_icon from "../../assets/back_arrow_icon.png"; // Ícone de voltar
import "./Course.css";

const Course = () => {
  const { id: courseId } = useParams(); // Obter ID do curso da URL
  const navigate = useNavigate(); // Navegação para o botão de voltar

  const [course, setCourse] = useState(null); // Dados do curso
  const [lessons, setLessons] = useState([]); // Lista de lições
  const [error, setError] = useState(null); // Mensagens de erro
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para buscar os dados do curso
  const fetchCourse = async () => {
    try {
      const coursesRef = collection(db, "Courses");
      const q = query(coursesRef, where("id", "==", courseId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const courseData = querySnapshot.docs[0].data();
        setCourse(courseData);
        return courseData.lessons || []; // Retorna os IDs das lições
      } else {
        setError("Course not found.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching course:", error);
      setError("Failed to load course.");
      return [];
    }
  };

  // Função para buscar as lições pelo ID
  const fetchLessons = async (lessonIds) => {
    try {
      const lessonsRef = collection(db, "Lessons");
      const fetchedLessons = await Promise.all(
        lessonIds.map(async (lessonId) => {
          const q = query(lessonsRef, where("id", "==", lessonId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data();
          } else {
            console.warn(`Lesson ${lessonId} not found.`);
            return null;
          }
        })
      );

      // Filtrar lições válidas
      setLessons(fetchedLessons.filter((lesson) => lesson !== null));
    } catch (err) {
      console.error("Error fetching lessons:", err);
      setError("Failed to load lessons.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const lessonIds = await fetchCourse();
      if (lessonIds.length > 0) {
        await fetchLessons(lessonIds);
      }
      setLoading(false);
    };

    fetchData();
  }, [courseId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const navigateToLesson = (lessonId) => {
    navigate(`/player/${lessonId}`); // Navega para o player da lição
  };

  return (
    <div className="course">
      <div className="course-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <img src={back_arrow_icon} alt="Go Back" />
        </button>
        <img
          src={course.coverImage}
          alt={course.name}
          className="course-cover-image"
        />
      </div>
      <h1 className="course-title">{course.name}</h1>
      <ul className="lesson-list">
        {lessons.map((lesson, index) => (
          <li
            key={lesson.id}
            className="lesson-item"
            onClick={() => navigateToLesson(lesson.id)}
          >
            <strong>Lesson {index + 1}:</strong> {lesson.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
