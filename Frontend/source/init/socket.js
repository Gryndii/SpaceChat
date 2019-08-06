//Core
import io from 'socket.io-client';

//Config
import { ROOT_URL, groupId } from '../API';

export const socket = io(ROOT_URL, {
  path: '/redux/ws',
});

export const joinSocketChannel = () => {
  const token = localStorage.getItem('token');

  if (token) {
    socket.emit('join', { groupId, token });
  }
  
};