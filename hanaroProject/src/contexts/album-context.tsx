import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { AlbumsType } from '../components/Album';

type AlbumContextProps = {
  album: AlbumsType;
  setSelectedAlbumId: (id: number) => void;
};

type ProviderProps = {
  children: ReactNode;
};
type Action =
  | { type: 'set'; payload: AlbumsType }
  | { type: 'setSelectedAlbumId'; payload: number };

const AlbumContext = createContext<AlbumContextProps>({
  album: { id: 0, userId: 0, title: '' },
  setSelectedAlbumId: () => {},
});
const reducer = (album: AlbumsType, { type, payload }: Action) => {
  switch (type) {
    case 'set':
      return { ...album, album: payload };
    case 'setSelectedAlbumId':
      album.id = payload;
      return { ...album };
    default:
      return album;
  }
};

export const AlbumCotextProvider = ({ children }: ProviderProps) => {
  const [album, dispatch] = useReducer(reducer, {
    id: 0,
    userId: 0,
    title: '',
  });
  const setSelectedAlbumId = useCallback(
    (id: number) => dispatch({ type: 'setSelectedAlbumId', payload: id }),
    []
  );
  return (
    <AlbumContext.Provider value={{ album, setSelectedAlbumId }}>
      {children}
    </AlbumContext.Provider>
  );
};

export const useAlbum = () => useContext(AlbumContext);
