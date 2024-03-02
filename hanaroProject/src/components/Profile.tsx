import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/session-context';

const Profile = () => {
  const {
    session: { username },
    logout,
  } = useSession();
  const navigate = useNavigate();

  const goToHome = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <div className='w-1/5 flex justify-evenly'>
        <div className='text-lg text-white'>{username}</div>
        <button className='btn-default' onClick={goToHome}>
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Profile;
