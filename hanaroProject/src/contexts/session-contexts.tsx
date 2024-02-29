import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type SessionContextProps = {
  session: Session;
  login: (id: number) => boolean;
  logout: () => void;
  setUsername: (username: string) => void;
};

type ProviderProps = {
  children: ReactNode;
};

type Action =
  | { type: 'set'; payload: Session }
  | { type: 'login'; payload: LoginUser }
  | { type: 'logout'; payload: null }
  | { type: 'setUsername'; payload: string };

const SKEY = 'session';
const DefaultSession: Session = {
  loginUser: null,
  username: '',
};

function getStorage() {
  const storedData = localStorage.getItem(SKEY);
  if (storedData) {
    return JSON.parse(storedData) as Session; // String ->  JSON as Session
  }

  setStorage(DefaultSession);

  return DefaultSession;
}

function setStorage(session: Session) {
  localStorage.setItem(SKEY, JSON.stringify(session)); // JSON ->  String
}

const SessionContext = createContext<SessionContextProps>({
  session: { loginUser: null, username: '' },
  login: () => false,
  logout: () => {},
  setUsername: () => {},
});

const reducer = (session: Session, { type, payload }: Action) => {
  let newer;
  switch (type) {
    case 'set':
      newer = { ...payload };
      break;
    case 'login':
      newer = { ...session, loginUser: payload };
      break;
    case 'logout':
      newer = { ...session, loginUser: payload };
      break;
    case 'setUsername':
      newer = { ...session, username: payload };
      break;
    default:
      return session;
  }
  setStorage(newer);
  return newer;
};

export const SessionProvider = ({ children }: ProviderProps) => {
  const [session, dispatch] = useReducer(reducer, DefaultSession);

  const setSession = useCallback(
    (payload: Session) => dispatch({ type: 'set', payload }),
    []
  );
  const login = useCallback((id: number) => {
    dispatch({ type: 'login', payload: { id } });
    return true;
  }, []);
  const logout = useCallback(
    () => dispatch({ type: 'logout', payload: null }),
    []
  );
  const setUsername = useCallback(
    (username: string) => dispatch({ type: 'setUsername', payload: username }),
    []
  );

  useEffect(() => {
    setSession(getStorage());
  }, []);

  return (
    <SessionContext.Provider value={{ login, logout, session, setUsername }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
