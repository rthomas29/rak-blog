import { ICONS } from '../constants';

const getIcon = (name) => {
  let icon;

  switch (name) {
    case 'twitter':
      icon = ICONS.TWITTER;
      break;
    case 'github':
      icon = ICONS.GITHUB;
      break;
    case 'vkontakte':
      icon = ICONS.VKONTAKTE;
      break;
    case 'telegram':
      icon = ICONS.TELEGRAM;
      break;
    case 'email':
      icon = ICONS.EMAIL;
      break;
    case 'rss':
      icon = ICONS.RSS;
      break;
    case 'linkedin':
      icon = ICONS.LINKEDIN;
      break;
    case 'react':
      icon = ICONS.REACT;
      break;
    case 'graphql':
      icon = ICONS.GRAPHQL;
      break;
    case 'js':
      icon = ICONS.JS;
      break;
    case 'nodejs':
      icon = ICONS.NODEJS;
      break;
    case 'typescript':
      icon = ICONS.TYPESCRIPT;
      break;
    default:
      icon = {};
      break;
  }

  return icon;
};

export default getIcon;
