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
  const [error, setError] = useState(null); // Mensagens de erro
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    if (!courseId) {
      setError("No course ID provided.");
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      try {
        const coursesRef = collection(db, "Courses");
        const q = query(coursesRef, where("id", "==", courseId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const courseData = querySnapshot.docs[0].data();
          setCourse(courseData);
        } else {
          setError("Course not found.");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
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
        {course.lessons.map((lessonId, index) => (
          <li
            key={index}
            className="lesson-item"
            onClick={() => navigateToLesson(lessonId)}
          >
            Lesson {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
