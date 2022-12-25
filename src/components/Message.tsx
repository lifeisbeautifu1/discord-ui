import moment from 'moment';
import { TrashIcon } from '@heroicons/react/solid';
import { deleteDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, db } from '../firebase';
import { useAppSelector } from '../app/hook';

interface Props {
  message: string;
  timestamp: any;
  name: string;
  photoURL: string;
  email: string;
  id: string;
}

const Message: React.FC<Props> = ({
  message,
  timestamp,
  name,
  photoURL,
  email,
  id,
}) => {
  const [user] = useAuthState(auth);
  const { id: channelId } = useAppSelector((state) => state.channel);
  const deleteMessage = () => {
    deleteDoc(doc(db, 'channels', channelId!, 'messages', id));
  };
  return (
    <div className="flex items-center p-1 pl-5 my-3 mr-2 hover:bg-[#32353b] group">
      <img
        src={photoURL}
        alt={name}
        className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl select-none"
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-[#72767d] text-xs">
            {moment(timestamp?.toDate().getTime()).format('lll')}
          </span>
        </h4>
        <p className="text-[#dcddde] text-sm">{message}</p>
      </div>
      {user?.email === email && (
        <div
          onClick={deleteMessage}
          className="hover:bg-[ed4245] hover:text-white p-1 ml-auto rounded-sm text-[#ed4245] cursor-pointer hidden group-hover:inline"
        >
          <TrashIcon className="h-5" />
        </div>
      )}
    </div>
  );
};

export default Message;
