import Header from '../components/Header';
import Sidebar from "../components/Sidebar";
import classNames from "classnames/bind";
import styles from './DefaultLayout.module.scss';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <Sidebar/>
      <div className={cx('container')}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}
export default DefaultLayout;
