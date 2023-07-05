import React from 'react'
import Header from './Header';
import ChatRoomList from '../Tables/chatRoomList';
import { Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function LayoutAdmin() {
    return (
        <div id="content-wrapper">
            <Header />
            <Outlet /> 
        </div>
    )
}
export default LayoutAdmin;