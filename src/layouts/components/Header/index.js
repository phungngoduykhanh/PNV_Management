import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from '../Search';
import { faCircleUser, faBell, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useContext,useState  } from 'react';
import {AuthContext} from "../../../components/AuthContext";
import axios from 'axios';

//làm giống phần này
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {

  const {user,setUser} = useContext(AuthContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTimeout(() => {
      window.location.reload(false)
    }, 1500);
  };
    useEffect(()=>{
      const token = localStorage.getItem('token'); 
      console.log(token);
      if (token) {
        axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
  },[]);
 return (
 <header className={cx('wrapper')}>
  <div className={cx('content')}>
        <Search/>
        <div className={cx('actions')}>
        { user ?(
            <div className={cx('item-right')}>
              <div className={cx('user-info')}>
                  <img className={cx('avatar-user')} src={user.img} alt='img-user' onClick={handleDropdownToggle}/>
                  <span className={cx('name-user')} onClick={handleDropdownToggle}>{user.name}</span>
                  {isDropdownOpen && (
                    <ul className={cx('dropdown-menu')}>
                      <li><a href='http://localhost:3000/user'>Profile</a></li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  )}
              </div>
              <div className={cx('icon')}>
                  <a href='/Notification'>
                    <FontAwesomeIcon icon={faBell}/>
                  </a>
                  <a href='/Help'>
                    <FontAwesomeIcon icon={faCircleInfo}/>
                  </a>
              </div>
            </div>
        ):(
            <div className={cx('item-right')}>
              <button className={cx('button-signin')}>
                <a href={'http://localhost:3000/login'} >
                  <FontAwesomeIcon icon={faCircleUser} />
                    SIGN IN
                </a>
              </button>
            </div>
        )}
    </div>
</div>  
</header>
 )   
}
export default Header;