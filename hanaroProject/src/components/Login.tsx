import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSession } from '../contexts/session-context';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const Login = () => {
  const idRef = useRef<HTMLInputElement | null>(null);
  const {
    login,
    session: { loginUser },
    setUsername,
  } = useSession();
  const [isValid, setValid] = useState(true);

  const navigate = useNavigate();

  const makeLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = Number(idRef.current?.value);

    if (id > 10 || id < 0) {
      // setValid((prev) => !prev);
      setValid(false);
      return;
    }
    // login(id);
    if (login(id)) {
      // setValid((prev) => !prev);
      setValid(true);
      navigate('/albums');
      console.log('🚀 ~ Login ~ id:', id);
    }
    if (idRef.current?.value) idRef.current.value = '';
  };
  useEffect(() => {
    if (!loginUser) return;

    const controller = new AbortController();
    const { signal } = controller;
    (async function () {
      try {
        const res = await fetch(`${BASE_URL}/users/${loginUser?.id}`, {
          signal,
        });
        const data = await res.json();
        console.log('🚀 ~ data:', data.username);
        setUsername(data.username);
      } catch (err) {
        if (err instanceof Error) {
          console.error(err);
        }
      }
    })();

    return () => controller.abort();
  }, [loginUser?.id]);

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
      {!isValid && (
        <div className='text-red-500 text-lg'>
          User ID는 1 ~ 10번만 가능합니다.
        </div>
      )}
      {!loginUser && isValid && (
        <div className='text-lg'>User ID는 1 ~ 10번만 가능합니다.</div>
      )}
    </>
  );
};

export default Login;
