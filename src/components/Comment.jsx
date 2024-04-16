import { Avatar } from "./Avatar";
import { ThumbsUp, Trash } from "phosphor-react";

import styles from "./Comment.module.css";
import { useState } from "react";

export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content); // acessei a função que foi criada dentro do componente Post e passei o conteúdo (que tbm estou acessando via propriedade)
  };

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1
    });
  };

  return (
    <div className={styles.comment}>
       <Avatar
          hasBorder={false}
          src="https://github.com/arendttt.png" 
        />

        <div className={styles.commentBox}>
          <div className={styles.commentContent}>
            <header>
              <div className={styles.authorAndTime}>
                <strong>Milena Arendt</strong>
                <time 
                  title="19 de março, às 08:13h" /* para quando o usuário passar o mouse em cima aparecer a data*/ 
                  dateTime="2024/03/19 08:13:30"  /* para acessibilidade ou SEO */
                >
                  Cerca de 1h atrás
                </time> 
              </div>

              <button onClick={handleDeleteComment} title="Deletar comentário">
                <Trash size={24} />
              </button>
            </header>

            <p>{content}</p>
          </div>

          <footer>
            <button onClick={handleLikeComment}>
              <ThumbsUp />
              Aplaudir <span>{likeCount}</span>
            </button>
          </footer>
        </div>
    </div>
  );
};