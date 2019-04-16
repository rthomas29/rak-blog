import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

const Author = ({ author, isIndex, showSidebarBio }) => {
  const bio = showSidebarBio ? author.sidebarBio : author.bio
  return (
    <div className={styles['author']}>
      <Link to="/">
        <img
          src="https://res.cloudinary.com/img-cdn01/image/upload/v1555264829/photo.jpg"
          className={styles['author__photo']}
          width="75"
          height="75"
          alt={author.name}
        />
      </Link>

      {isIndex ? (
        <h1 className={styles['author__title']}>
          <Link className={styles['author__title-link']} to="/">{author.name}</Link>
        </h1>
      ) : (
          <h2 className={styles['author__title']}>
            <Link className={styles['author__title-link']} to="/">{author.name}</Link>
          </h2>
        )}
      <p className={styles['author__subtitle']}>{bio}</p>
    </div>
  )
}

export default Author;
