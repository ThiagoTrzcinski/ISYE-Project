import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Navegação e parâmetros da URL
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Configuração do Firebase
import back_arrow_icon from "../../assets/back_arrow_icon.png"; // Imagem do ícone de voltar
import "./Article.css";

const Article = ({ articleId: propArticleId }) => {
  const { id: routeArticleId } = useParams(); // Obter ID da URL, se disponível
  const articleId = propArticleId || routeArticleId; // Prioriza o ID vindo da prop
  const navigate = useNavigate(); // Navegação para o botão de voltar

  const [article, setArticle] = useState(null); // Armazena os dados do artigo
  const [error, setError] = useState(null); // Armazena mensagens de erro
  const [loading, setLoading] = useState(true); // Indica carregamento

  useEffect(() => {
    if (!articleId) {
      setError("No article ID provided.");
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      try {
        console.log(`Fetching article with ID: ${articleId}`);

        // Consulta baseada no campo `id`
        const articlesRef = collection(db, "Articles");
        const q = query(articlesRef, where("id", "==", articleId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          console.log("Article data found:", docData);
          setArticle(docData); // Armazena os dados no estado
        } else {
          console.warn("Article not found with ID:", articleId);
          setError("Article not found.");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError("Failed to load article.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="article">
      <div className="article-header">
        <img
          src={back_arrow_icon}
          alt="Go Back"
          onClick={() => navigate(-1)}
          className="back-arrow"
        />
        <h1 className="article-title-overlay">{article.name}</h1>
      </div>

      <div className="content">
        {article.blocks.map((block, index) => {
          if (block.type === "text") {
            return <p key={index}>{block.content}</p>;
          } else if (block.type === "image") {
            return (
              <img
                key={index}
                src={block.url}
                alt={block.alt || "Image"}
                className="article-image"
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Article;
