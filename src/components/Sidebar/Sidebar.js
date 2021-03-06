import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Author from './Author';
import Contacts from './Contacts';
import styles from './Sidebar.module.scss';

export const PureSidebar = ({ data, isIndex }) => {
  const { author } = data.site.siteMetadata;

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author showSidebarBio author={author} isIndex={isIndex} />
        <Contacts contacts={author.contacts} />
      </div>
    </div>
  );
};

export const Sidebar = props => (
  <StaticQuery
    query={graphql`
      query SidebarQuery {
        site {
          siteMetadata {
            title
            subtitle
            author {
              name
              bio
              tech
              sidebarBio
              contacts {
                email
                github
                linkedin
                twitter
              }
            }
          }
        }
      }
    `}
    render={data => <PureSidebar {...props} data={data} />}
  />
);

export default Sidebar;
