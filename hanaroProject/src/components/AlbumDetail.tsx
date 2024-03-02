import { useEffect, useState } from 'react';
import { useAlbum } from '../contexts/album-context';
import { useFetch } from '../hooks/fetch';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type AlbumType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const AlbumDetail = () => {
  const navigate = useNavigate();
  const { album } = useAlbum();
  const { data } = useFetch<AlbumType[]>({
    url: `${BASE_URL}/photos?albumId=${album.id}`,
    dependencies: [album.id],
    defaultData: [],
  });
  const goToback = () => {
    navigate('/albums');
  };
  const [albumDetails, setAlbumDetails] = useState<AlbumType[]>([]);

  useEffect(() => {
    if (data) {
      setAlbumDetails(data);
    }
  }, [data]);

  return (
    <>
      <div className='flex justify-center text-lg font-bold mt-3 p-2'>
        {album.title}
      </div>
      <div className='flex justify-end mr-7 p-3'>
        <button className='btn-default' onClick={goToback}>
          뒤로
        </button>
      </div>
      <div className='grid grid-cols-5 gap-1'>
        {albumDetails.map((item) => (
          <img
            key={item.id}
            className='max-w-36'
            src={item.thumbnailUrl}
            alt={item.title}
          />
        ))}
      </div>
    </>
  );
};

export default AlbumDetail;
