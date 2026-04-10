import { memo } from 'react';
import TopBar from './TopBar';
import Mainheader from './Mainheader';

const Header = () => {
  return (
    <div>
      <TopBar />
      <Mainheader />
    </div>
  );
};

export default memo(Header);