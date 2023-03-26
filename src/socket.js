import socketIO from 'socket.io-client';
import { BACKEND_URL_SOCKET } from './constant';
const URL = BACKEND_URL_SOCKET;
let socket = socketIO.connect(URL)
export default socket