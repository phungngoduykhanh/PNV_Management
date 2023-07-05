import React from 'react'
import Header from './Header';
import Sidebar from './Sidebar/MenuAdmin';

function LayoutAdmin({ children }) {
    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper">
                <Header />
                {children}
            </div>
        </div>
    )
}
export default LayoutAdmin;