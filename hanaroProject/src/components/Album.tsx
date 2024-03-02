import { useEffect, useState } from 'react';
import clsx from 'clsx';

export type AlbumsType = { userId: number; id: number; title: string };
type Props = {
  albumData?: AlbumsType;
  isSelected: boolean;
  onSelect: (id: number, title: string) => void;
};

const Album = ({ albumData, isSelected, onSelect }: Props) => {
  const [album, setAlbum] = useState<AlbumsType | null>(null);

  useEffect(() => {
    if (albumData) {
      setAlbum(albumData);
      return;
    }
  }, [albumData]);

  return (
    <>
      <button
        className={clsx(
          'border rounded mx-3',
          'w-1/6 h-1/5 mt-3',
          isSelected
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-slate-400'
        )}
        onClick={() => onSelect(Number(album?.id), album?.title!)}
      >
        {album?.title}
      </button>
    </>
  );
};

export default Album;
