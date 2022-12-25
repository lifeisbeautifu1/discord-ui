import { Link } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

import { auth, provider } from '../firebase';

const Header = () => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const signIn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then(() => navigate('/channels'));
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
      <Link to="/">
        <img
          src="./logo.svg"
          alt="discord"
          className="w-32 h-12 object-contain"
        />
      </Link>
      <div className="hidden lg:flex space-x-6 text-white">
        <Link to="/" className="link">
          Download
        </Link>
        <Link to="/" className="link">
          Why Discord?
        </Link>
        <Link to="/" className="link">
          Nitro
        </Link>
        <Link to="/" className="link">
          Safety
        </Link>
        <Link to="/" className="link">
          Support
        </Link>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-white py-2 px-4 rounded-full text-xs md:text-sm focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
          onClick={!user ? signIn : () => navigate('/channels')}
        >
          {!user ? 'Login' : 'Open Discord'}
        </button>
        <MenuIcon className="h-9 text-white cursor-pointer lg:hidden" />
      </div>
    </header>
  );
};

export default Header;
