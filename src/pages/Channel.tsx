import {
  UsersIcon,
  BellIcon,
  ChatIcon,
  HashtagIcon,
  SearchIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  GiftIcon,
  EmojiHappyIcon,
  PlusCircleIcon,
} from '@heroicons/react/solid';
import { useState, useRef } from 'react';
import {
  collection,
  serverTimestamp,
  addDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { Message } from '../components';
import { useAppSelector } from '../app/hook';
import { auth, db } from '../firebase';

const Channel = () => {
  const [message, setMessage] = useState('');

  const chatRef = useRef<HTMLDivElement>(null);

  const { name, id } = useAppSelector((state) => state.channel);

  const [user] = useAuthState(auth);

  const [messages] = useCollection(
    id
      ? query(
          collection(db, 'channels', id, 'messages'),
          orderBy('timestamp', 'asc')
        )
      : null
  );

  const scrollToBottom = () => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message.trim()) return;

    addDoc(collection(db, 'channels', id!, 'messages'), {
      timestamp: serverTimestamp(),
      message,
      name: user?.displayName,
      photoURL: user?.photoURL,
      email: user?.email,
    });

    scrollToBottom();

    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{name}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white pl-1 placeholder:text-[#72767d]"
            />
            <SearchIcon className="h-4 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>
      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {messages?.docs?.map((doc) => {
          const { message, timestamp, name, photoURL, email } = doc.data();
          return (
            <Message
              key={doc?.id}
              id={doc?.id}
              message={message}
              timestamp={timestamp}
              name={name}
              photoURL={photoURL}
              email={email}
            />
          );
        })}
        <div ref={chatRef} className="pb-16" />
      </main>
      <div className="bg-[#40444b] flex items-center p-2.5 mx-5 mb-2 rounded-lg">
        <PlusCircleIcon className="icon mr-4" />
        <form onSubmit={sendMessage} className="flex flex-grow space-x-2">
          <input
            type="text"
            disabled={!id}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={id ? `Message #${name}` : `Select a channel`}
            className="bg-transparent flex-grow focus:outline-none text-[#dcddde] w-full placeholder:text-[#72767d]"
          />
          <EmojiHappyIcon className="icon" />
          <GiftIcon className="icon" />
        </form>
      </div>
    </div>
  );
};

export default Channel;
