import { useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export function Post({ author, publishedAt, content }) {
  const [comments, setComments] = useState([
    'Post muito legal!'
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR, // traduzindo a data para português
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment() {
    event.preventDefault() /* pois o comportamento padrão de um submit é enviar o usuário para outra página */

    setComments([...comments, newCommentText])

    setNewCommentText('');
  }

  function handleNewCommentChange() {
    event.target.setCustomValidity(''); // informando que não há mais erro, para que seja possível enviar o comentário
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('Este campo é obrigatório!'); // para tratar o erro causado pela propriedade required
  };

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete; // vai manter na lista apenas os comentários que forem diferentes do comentário que quero deletar, gerando uma nova lista
    });

    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>

          <Avatar src={author.avatarUrl} />

          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>

        </div>

        <time 
          title={publishedDateFormatted} /* para quando o usuário passar o mouse em cima aparecer a data*/ 
          dateTime={publishedAt.toISOString()}  /* para acessibilidade ou SEO */
        >
          {publishedDateRelativeToNow}
        </time> 

      </header>

      <div className={styles.content}>
        {content.map(line => {
          if(line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>

          } else if (line.type === 'link') {
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          name="comment"
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty} >Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return ( 
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment} // função enviada como propriedade, para que possa ser acessada no componente Comment
            />
          )
        })}
      </div>
    </article>
  )
}