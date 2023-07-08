import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {MenuItem} from './Menu';
import logo from '../../../assets/images/logo.svg';
import { useLocation, useParams } from "react-router-dom";
import {faComments, faHouse,faCalendarDays, faGear, faCircleQuestion, faBug, faCirclePlus, faLock} from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useMemo, useState } from 'react';

const cx = classNames.bind(styles);

import {Button, Collapse,Typography} from 'antd';
import AddChannel from '../../../components/AddChannel/AddChannel';
import { AppContext } from '../../../Context/AppProvider';
const {Panel} = Collapse;

function Sidebar() {
  const {id} = useParams();

  const { setisAddChannelVisible,useRealtimeChannels,setSelectedChannelId, channels } =useContext(AppContext);
  
  useRealtimeChannels(id);

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

  const handleAddChannel= ()=>{
    setisAddChannelVisible(true);
  }

    return (
      <aside className={cx('wrapper')}>
        <a href='/'><img className={cx('logo')} src={logo}/></a>

          {isChatroomPath ? (
            <nav className={cx("navbar-chatroom")}>
                <Collapse ghost  defaultActiveKey={['1']} >
                  <Panel header='Channels' key='1' className="custom-collapse">

                    {channels.map((channel) => (
                      <Typography.Link key={channel.id} onClick={()=>setSelectedChannelId(channel.id)}>
                        <span className={cx("icon-public")}>
                            {channel.mode === "public" ? "#" : <FontAwesomeIcon icon={faLock}/>}  
                        </span> 
                        <span className={cx("channel-name")}>
                          {channel.channelname}
                        </span>
                      </Typography.Link>
                    ))}

                  </Panel>
                </Collapse>
                <div className={cx('button-container')}>
                  <Button type='text' onClick={handleAddChannel}>
                    <FontAwesomeIcon icon={faCirclePlus}/>
                      Add Channels
                    </Button>
                </div>
                <AddChannel chatroom_id={id}/>
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