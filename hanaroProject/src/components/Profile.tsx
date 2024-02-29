import { useNavigate } from 'react-router-dom';
import { useSession } from '../contexts/session-contexts';

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
      <div>
        <div className='text-lg'>{username}</div>
        <button onClick={goToHome}>Sign Out</button>
      </div>
    </>
  );
};

export default Profile;
