import React from 'react';
import { withPrefix, Link } from 'gatsby';
import Icon from '../../Icon';
import { getIcon } from '../../../utils';
import styles from './Author.module.scss';

const Author = ({ author, isIndex, showSidebarBio }) => {
  const bio = showSidebarBio ? author.sidebarBio : author.bio;
  const techLogos = author.tech.map(name => (
    <Icon key={name} icon={getIcon(name)} name={name} social={false} />
  ));
  return (
    <div className={styles['author']}>
      <Link to="/">
        <img
          src="https://res.cloudinary.com/img-cdn01/image/upload/c_thumb,w_100/v1555264829/photo.jpg"
          className={styles['author__photo']}
          width="75"
          height="75"
          alt={author.name}
        />
      </Link>

      {isIndex ? (
        <h1 className={styles['author__title']}>
          <Link className={styles['author__title-link']} to="/">
            {author.name}
          </Link>
        </h1>
      ) : (
        <h2 className={styles['author__title']}>
          <Link className={styles['author__title-link']} to="/">
            {author.name}
          </Link>
        </h2>
      )}
      <div>
        <p className={styles['author__subtitle']}>{bio}</p>
        <span>{techLogos}</span>
      </div>
    </div>
  );
};

export default Author;
