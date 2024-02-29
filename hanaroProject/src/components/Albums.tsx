import { useEffect, useState } from 'react';
import { useSession } from '../contexts/session-contexts';
import { useFetch } from '../hooks/fetch';
import Album from './Album';
// import Album from './Album';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

type AlbumsType = { userId: number; id: number; title: string };

const Albums = () => {
  const {
    session: { loginUser },
  } = useSession();
  const [albums, setAlbums] = useState<AlbumsType[]>([]);
  const { data } = useFetch<AlbumsType[]>({
    url: `${BASE_URL}/albums?userId=${loginUser?.id}`,
    dependencies: [loginUser?.id],
    defaultData: albums,
  });

  useEffect(() => {
    if (data) {
      setAlbums(data);
    }
    console.log('🚀 ~ Albums ~ data:', data);
  }, [data]);

  return (
    <>
      <div className='flex'>
        <div className='text-lg font-bold'>앨범 목록</div>
        <button className='btn-default'>앨범 상세 보기</button>
        {loginUser?.id}
      </div>
      <div>
        {albums.map((album) => (
          <Album key={album.id} albumData={album} />
        ))}
      </div>
    </>
  );
};

export default Albums;
