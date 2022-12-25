import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Navigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { PlusIcon, ChevronDownIcon } from '@heroicons/react/outline';

import { auth, db } from '../firebase';
import { ServerIcon, ChannelItem } from '../components';
import { Channel } from './index';
import { MicrophoneIcon, PhoneIcon, CogIcon } from '@heroicons/react/outline';

const Channels = () => {
  const [user] = useAuthState(auth);
  const [channels] = useCollection(collection(db, 'channels'));
  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel');
    if (channelName) {
      addDoc(collection(db, 'channels'), {
        channelName,
      });
    }
  };
  return (
    <>
      {!user && <Navigate to="/" />}
      <div className="flex h-screen">
        <div className="flex flex-col items-center space-y-3 bg-discord_serversBg p-3 min-w-max">
          <div className="server-default hover:bg-discord_purple">
            <img src="/logo.webp" alt="server" className="h-5" />
          </div>
          <hr className="border-gray-700 border w-8 mx-auto" />
          <ServerIcon image="/server.png" />
          <ServerIcon image="/server.png" />
          <ServerIcon image="/server.png" />
          <ServerIcon image="/server.png" />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="h-6 text-discord_green group-hover:text-white" />
          </div>
        </div>
        <div className="bg-discord_channelsBg flex flex-col min-w-max">
          <h2
            className="flex text-white font-bold text-sm items-center
          justify-between border-b border-gray-800 p-4 cursor-pointer hover:bg-[#34373c]"
          >
            Official PAPA Server... <ChevronDownIcon className="h-5 ml-2" />
          </h2>
          <div className="text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hide">
            <div className="flex items-center p-2 mb-2">
              <ChevronDownIcon className="h-5 mr-2" />
              <h4 className="font-semibold">Channels</h4>
              <PlusIcon
                onClick={handleAddChannel}
                className="h-5 ml-auto cursor-pointer hover:text-white"
              />
            </div>
            <div className="flex flex-col space-y-2 px-2 mb-4">
              {channels?.docs?.map((channel) => (
                <ChannelItem
                  key={channel.id}
                  id={channel.id}
                  name={channel.data().channelName}
                />
              ))}
            </div>
          </div>
          <div className="flex bg-[#292b2f] items-center p-2 justify-between space-x-8 ">
            <div className="flex items-center space-x-1">
              {user?.photoURL && (
                <img
                  src={user.photoURL}
                  alt="avatar"
                  className="h-10 rounded-full cursor-pointer"
                  onClick={() => signOut(auth)}
                />
              )}
              <h4 className="text-white text-xs font-medium">
                {user?.displayName}
                <span className="text-[#b9bbbe] block">
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className="flex items-center text-gray-400">
              <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                <MicrophoneIcon className="h-5 icon" />
              </div>
              <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                <PhoneIcon className="h-5 icon" />
              </div>
              <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                <CogIcon className="h-5 icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#36393f] flex-grow">
          <Channel />
        </div>
      </div>
    </>
  );
};

export default Channels;
