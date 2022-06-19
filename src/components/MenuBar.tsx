import React, { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';

type MenuProps = {
    username: string | null
    loggedIn: boolean
}

const MenuBar: FC<MenuProps> = ({ username, loggedIn }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    
    const menu: ReactNode = (
        <ul className="flex flex-col">
            <Link to="/progress">
                <button type="button" className="flex wf-full bg-slate-100 sans">
                    Progress
                </button>
            </Link>
            <Link to="/prep">
                <button type="button" className="flex wf-full bg-slate-100 sans">
                    Prep
                </button>
            </Link>
            <Link to="/team">
                <button type="button" className="flex wf-full bg-slate-100 sans">
                    Team
                </button>
            </Link>
        </ul>
    )
    
    return (
        <React.Fragment>
            <nav className="flex flex-col max-h-full w-full bg-slate-100">
                <div className="flex w-full mx-2">
                    {menu}
                </div>
            </nav>
        </React.Fragment>
    );
}

export default MenuBar;