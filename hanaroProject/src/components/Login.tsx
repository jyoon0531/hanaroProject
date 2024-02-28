import { FormEvent, useRef } from 'react';
import { useSession } from '../contexts/session-contexts';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const { login } = useSession();

  const navigate = useNavigate();

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = Number(idRef.current?.value);
    console.log('🚀 ~ makeLogin ~ id:', id);
    if (login(id)) {
      navigate('/albums');
    }
  };
  return (
    <>
      <form onSubmit={makeLogin}>
        <input
          className='border border-gray-400 rounded-lg'
          type='text'
          placeholder='User ID...'
          ref={idRef}
        />
        <button type='submit' className='btn-primary'>
          Sign In
        </button>
      </form>
    </>
  );
};

export default Login;
