import React, { FC, ReactNode } from 'react';
import { myLogo } from './assets/AssetConfig';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import MenuBar from './components/MenuBar';
import { Navigation } from './types';

const members: Array<Navigation.NavMember> = [
    {
      name: "Home",
      link: "/"
    }
]

const headerLogo: ReactNode = myLogo;

const App: FC = () => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="col-span-2">
        <Nav members={members} logo={headerLogo} />
      </div> 
      <div className="flex w-40 max-h-full">
        <MenuBar username="birudeghi" loggedIn={true} />
      </div>
      <div className="flex">
        <Routes>
        </Routes>
      </div>
    </div>
  );
}

export default App;
