import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {MenuItem} from './Menu';
import logo from '../../../assets/images/logo.svg';
import { NavLink, useLocation, useParams } from "react-router-dom";
import {faComments, faHouse,faCalendarDays, faGear, faCircleQuestion, faBug, faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

import {Button, Collapse,Typography} from 'antd';
const {Panel} = Collapse;

function Sidebar() {

  const {id} = useParams();

  const [activeItem, setActiveItem] = useState('Home');
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath === '/') {
      setActiveItem('Home');
    } else if (currentPath === '/chat') {
      setActiveItem('Chat');
    } else if (currentPath === '/calender') {
      setActiveItem('Calender');
    } else if (currentPath === '/setting') {
      setActiveItem('Setting');
    } else if (currentPath === '/help') {
      setActiveItem('Help');
    } else if (currentPath === '/report') {
      setActiveItem('Report');
    } else {
      setActiveItem('Home'); 
    }
  }, [location]);

  const isChatroomPath = id !== undefined;

    return (
      <aside className={cx('wrapper')}>
        <NavLink to="/"><img className={cx('logo')} src={logo}/></NavLink>

          {isChatroomPath ? (
            <nav className={cx("navbar-chatroom")}>
                <Collapse ghost  defaultActiveKey={['1']} >
                  <Panel header='Channels' key='1' className="custom-collapse">
                      <Typography.Link><span className={cx('icon-public')} >#</span> Room 1</Typography.Link>
                      <Typography.Link><span className={cx('icon-public')} >#</span> Room 2</Typography.Link>
                      <Typography.Link><span className={cx('icon-public')} >#</span> Room 3</Typography.Link>
                  </Panel>
                </Collapse>
                <div className={cx('button-container')}>
                  <Button type='text'>
                    <FontAwesomeIcon icon={faCirclePlus}/>
                    Add Channels
                    </Button>
                </div>
            </nav>
          ):(
            <nav className={cx("navbar")}>
              <div>
                <MenuItem active={activeItem === 'Home'} onClick={() => setActiveItem('Home')} title="Home" to='/' icon={<FontAwesomeIcon icon={faHouse}/>}/>
                <MenuItem active={activeItem === 'Chat'} onClick={() => setActiveItem('Chat')} title="Chat" to='/chat' icon={<FontAwesomeIcon icon={faComments}/>}/>
                <MenuItem active={activeItem === 'Calender'} onClick={() => setActiveItem('Calender')} title="Calender" to='/calender' icon={<FontAwesomeIcon icon={faCalendarDays} />}/>
              </div>
              <div>
                <MenuItem active={activeItem === 'Setting'} onClick={() => setActiveItem('Setting')} title="Setting" to='/setting' icon={<FontAwesomeIcon icon={faGear}/>}/>
                <MenuItem active={activeItem === 'Help'} onClick={() => setActiveItem('Help')} title="Help" to='/help' icon={<FontAwesomeIcon icon={faCircleQuestion}/>}/>
                <MenuItem active={activeItem === 'Report'} onClick={() => setActiveItem('Report')} title="Report" to='/report' icon={<FontAwesomeIcon icon={faBug}/>}/>
              </div>
            </nav>
          )
          }
        
      </aside>
    )   
   }
export default Sidebar;