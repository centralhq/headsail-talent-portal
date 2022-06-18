import React, { FC, ReactNode } from 'react';
import { myLogo } from './assets/AssetConfig';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
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
    <React.Fragment>
      <Nav members={members} logo={headerLogo} />
      <Routes>
      </Routes>
    </React.Fragment>
  );
}

export default App;
