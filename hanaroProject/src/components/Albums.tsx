import { useEffect, useState } from 'react';
import { useSession } from '../contexts/session-context';
import { useFetch } from '../hooks/fetch';
import Album, { AlbumsType } from './Album';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAlbum } from '../contexts/album-context';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const Albums = () => {
  const navigate = useNavigate();
  const {
    session: { loginUser },
  } = useSession();
  const [albums, setAlbums] = useState<AlbumsType[]>([]);
  const { data } = useFetch<AlbumsType[]>({
    url: `${BASE_URL}/albums?userId=${loginUser?.id}`,
    dependencies: [loginUser?.id],
    defaultData: albums,
  });
  const { album, setSelectedAlbumId, setSelectedAlbumTitle } = useAlbum();
  // const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({ albumId: '' });

  const selectAlbum = (id: number, title: string) => {
    setSelectedAlbumId(id);
    setSelectedAlbumTitle(title);
    setSearchParams({ albumId: id.toString() });
  };

  const goToAlbumDetail = (id: number) => {
    navigate('/photos');
  };

  useEffect(() => {
    if (data) {
      setAlbums(data);
    }
  }, [data]);

  return (
    <>
      <div className='flex justify-center p-3'>
        <div className='text-lg font-bold'>앨범 목록</div>
      </div>
      <div className='flex justify-end p-1'>
        <button
          className='btn-default'
          onClick={() => goToAlbumDetail(album.id!)}
        >
          앨범 상세 보기
        </button>
      </div>
      <div className='flex-col'>
        {albums.map((item) => (
          <Album
            key={item.id}
            albumData={item}
            isSelected={item.id === album.id}
            onSelect={selectAlbum}
          />
        ))}
      </div>
    </>
  );
};

export default Albums;
