import React from 'react';
import AwardList from './AwardList';

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-screen-md p-4">
        <AwardList />
      </div>
    </div>
  );
};

export default Home;
