import { useSession } from '../contexts/session-context';
import Profile from './Profile';

const Home = () => {
  const {
    session: { loginUser },
  } = useSession();
  return (
    <>
      <div className='rounded-lg bg-blue-500 h-12 flex justify-between items-center'>
        <div className='text-white text-lg ml-5 '>Hanaro Album</div>
        {loginUser && <Profile />}
      </div>
    </>
  );
};

export default Home;
