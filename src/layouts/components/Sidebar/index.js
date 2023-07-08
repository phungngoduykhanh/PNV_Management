import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {MenuItem} from './Menu';
import logo from '../../../assets/images/logo.svg';
import { NavLink} from "react-router-dom";
import {faComments, faHouse,faCalendarDays,faUserGroup, faBars, faGear, faCircleQuestion, faBug} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function Sidebar() {
    return (
      <aside className={cx('wrapper')}>
        <NavLink to="/"><img className={cx('logo')} src={logo}/></NavLink>
        <nav className={cx("navbar")}>
          <MenuItem title="Home" to='/' icon={<FontAwesomeIcon icon={faHouse}/>}/>
          <MenuItem title="Class" to='/class' icon={<FontAwesomeIcon icon={faBars} />}/>
          <MenuItem title="Chat" to='/chat' icon={<FontAwesomeIcon icon={faComments}/>}/>
          <MenuItem title="Calender" to='/calender' icon={<FontAwesomeIcon icon={faCalendarDays} />}/>
          <MenuItem title="Student" to='/student' icon={<FontAwesomeIcon icon={faUserGroup} />}/>
          <MenuItem title="Setting" to='/setting' icon={<FontAwesomeIcon icon={faGear}/>}/>
          <MenuItem title="Help" to='/help' icon={<FontAwesomeIcon icon={faCircleQuestion}/>}/>
          <MenuItem title="Report" to='/report' icon={<FontAwesomeIcon icon={faBug}/>}/>
        </nav>
      </aside>
    )   
   }
export default Sidebar;