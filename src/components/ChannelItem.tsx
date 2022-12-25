import { HashtagIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../app/hook';
import { setChannelInfo } from '../features/channel/channel';

interface Props {
  id: string;
  name: string;
}

const ChannelItem: React.FC<Props> = ({ id, name }) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        id,
        name,
      })
    );
    navigate('/channels/' + id);
  };

  return (
    <div
      className="font-medium flex items-center cursor-pointer hover:bg-[#3a3c43] p-1 rounded-md hover:text-white"
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-2" />
      {name}
    </div>
  );
};

export default ChannelItem;
