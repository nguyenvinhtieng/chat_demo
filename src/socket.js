import { io } from 'socket.io-client';
import { BACKEND_URL_SOCKET } from './constant';
const URL = BACKEND_URL_SOCKET;
let socket = io(URL)
export default socket