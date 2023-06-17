import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from '../Search';
import { faCircleUser, faBell, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

//làm giống phần này
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {

  const [user, setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem('token'); 
    console.log(token);
    if (token) {
      axios
        .get('http://127.0.0.1:8000/api/user', {
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
        { user &&
            <div className={cx('item-right')}>
              <div className={cx('user-info')}>
                  <img className={cx('avatar-user')} src={user.img} alt='img-user'/>
                  <span className={cx('name-user')}>{user.name}</span>
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
        }
        { user === false &&
            <>
              <button>
                <a href={'http://localhost:3000/login'} >
                  <FontAwesomeIcon icon={faCircleUser} />
                    SIGN IN
                </a>
              </button>
            
         </>
        }
    </div>
</div>  
</header>
 )   
}
export default Header;