import Header from '../components/Header';
import Sidebar from "../components/Sidebar";
import './DefaultLayout.css';

function DefaultLayout({ children }) {
  return (
    <div className="wrapper">
      <Header />
      <div className="container">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
