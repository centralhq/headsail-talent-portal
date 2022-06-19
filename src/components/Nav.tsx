import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../types';

type NavProps = {
    members: Array<Navigation.NavMember>;
    logo: ReactNode;
}

const Nav: FC<NavProps & React.HTMLAttributes<HTMLDivElement>> = ({ members, logo }) => {
    return (
        <header className="h-14 flex align-middle static max-w-full border-b border-solid border-gray-500">
          <div className="max-section-width flex justify-between mx-auto w-full pr-4 pl-4">
            <div className="flex-[2_0_140px] inline-flex align-middle items-center">
                <Link
                  className="flex align-middle"
                  to="/"
                >
                  {logo}
                </Link>
            </div>
            <div className="flex justify-end">
              <nav className="flex-[1_0_100%] flex align-middle items-center">
                <ul className="flex m-0 p-0 topnav" id="mySurfboardNav">
                  {members.map(member => (
                    <Link to={member.link} className="sans">
                      {member.name}
                    </Link>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </header>
    )
}

export default Nav;