// type AlbumType = {
//   albumId: number;
//   id: number;
//   title: string;
//   url: string;
//   thumbnailUrl: string;
// };

import { useEffect, useState } from 'react';
import clsx from 'clsx';

export type AlbumsType = { userId: number; id: number; title: string };
type Props = {
  albumData?: AlbumsType;
  isSelected: boolean;
  onSelect: (id: number) => void;
};

const Album = ({ albumData, isSelected, onSelect }: Props) => {
  const [album, setAlbum] = useState<AlbumsType | null>(null);

  // console.log('🚀 ~ Album ~ albumId:', albumId);
  // console.log('🚀 ~ Album ~ albumData:', albumData);
  // const toggleSelected = () => {
  //   setSelected((prev) => !prev);
  // };

  useEffect(() => {
    if (albumData) {
      setAlbum(albumData);
      return;
    }
  }, [albumData]);

  return (
    <>
      <button
        // className='border border-slate-400 mx-3'
        className={clsx(
          'border mx-3',
          isSelected ? 'border-green-500' : 'border-slate-400'
        )}
        onClick={() => onSelect(Number(album?.id))}
      >
        {album?.title}
      </button>
    </>
  );
};

export default Album;
