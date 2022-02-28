import {
  MdStorage,
  MdWorkOutline,
  MdDoneOutline,
  MdLoop,
} from 'react-icons/md';

export const workspaceMap = {
  'Current Sprint': 'current',
  'My Work': 'user',
  Backlog: 'backlog',
  Done: 'archive',
};

export const workspaceIconMap = {
  'Current Sprint': <MdLoop />,
  'My Work': <MdWorkOutline />,
  Backlog: <MdStorage />,
  Done: <MdDoneOutline />,
};
