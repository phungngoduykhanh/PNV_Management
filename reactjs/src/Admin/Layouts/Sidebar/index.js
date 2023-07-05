import React from 'react'
import logo from '../../../assets/images/logo.svg';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            {/* Sidebar */}
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                {/* Sidebar - Brand */}
                <a className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon rotate-n-15">
                        {/* <i className="fas fa-laugh-wink" /> */}
                        <img className='logo' src={logo} height={50} />
                    </div>
                </a>
                {/* Divider */}
                <hr className="sidebar-divider my-0" />
                {/* Divider */}
                <hr className="sidebar-divider" />
                {/* Heading */}
                <div className="sidebar-heading">
                    Interface
                </div>
                {/* Nav Item - Pages Collapse Menu */}
                <li className="nav-item">
                    <NavLink to="/admin/chatroomlist" className="nav-link collapsed"  data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-sharp fa-solid fa-comments"></i>
                        <span>Chat Room</span>
                    </NavLink>
                </li>
                {/* Nav Item - Utilities Collapse Menu */}
                <li className="nav-item">
                    <NavLink to="/admin/staff" className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-chalkboard-user"></i>
                        <span>List Staff</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/admin/student" className="nav-link collapsed" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                        <i className="fa-solid fa-users"></i>
                        <span>List Student</span>
                    </NavLink>
                </li>
            </ul>
            {/* End of Sidebar */}
        </>
    )
}
export default Sidebar;