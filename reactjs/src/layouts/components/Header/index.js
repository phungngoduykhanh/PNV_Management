import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Search from '../Search';
import { faCircleUser, faBell, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as getDataUser from '../../../apiServices/getDataUser';
const cx = classNames.bind(styles);
function Header() {
  const [currentUser,setCurrentUser]= useState(undefined);
  useEffect(()=>{
    const fetchApi = async ()=>{
        const resultUser = await getDataUser.getDataUser();
            setCurrentUser(resultUser);
        }
    fetchApi();
},[]);

 return (
 <header className={cx('wrapper')}>
  <div className={cx('content')}>
        <Search/>
        <div className={cx('actions')}>
        { currentUser &&
            <div className={cx('item-right')}>
              <div className={cx('user-info')}>
                  <img className={cx('avatar-user')} src={currentUser.img} alt='img-user'/>
                  <span className={cx('name-user')}>{currentUser.name}</span>
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
        { currentUser === false &&
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