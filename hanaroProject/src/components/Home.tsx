import { useSession } from '../contexts/session-context';
import Profile from './Profile';

const Home = () => {
  const {
    session: { loginUser },
  } = useSession();
  return (
    <>
      <div className='rounded-lg bg-blue-500 text-white text-lg'>
        Hanaro Album
      </div>
      {loginUser && <Profile />}
    </>
  );
};

export default Home;
