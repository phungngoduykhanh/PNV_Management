import React from 'react'
import Sidebar from './Layouts/Sidebar';
import LayoutAdmin from './Layouts/index';
import { Routes, Route } from 'react-router-dom';
import ChatRoomList from './Tables/chatRoomList';

function AdminPage() {
  return (
    <div id="wrapper">
      <Sidebar />
      <LayoutAdmin/>
    </div>
  )
}
export default AdminPage;
