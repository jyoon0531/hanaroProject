// type AlbumType = {
//   albumId: number;
//   id: number;
//   title: string;
//   url: string;
//   thumbnailUrl: string;
// };

type Album = { userId: number; id: number; title: string };
type Props = {
  albumId?: number;
  albumData?: Album;
};

const Album = ({ albumId, albumData }: Props) => {
  return <>{/* <h1>{albumData}</h1> */}</>;
};

export default Album;
