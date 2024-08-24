import { FC } from 'react';
import Navbar from '../components/navbar';
import { ChatThreeFive } from '../components/chatThreeFive';

const ChatPage: FC = () => {
  return (
    <div className="m-3 mt-5">
        <Navbar />
        <ChatThreeFive />
    </div>
  );
};

export default ChatPage;