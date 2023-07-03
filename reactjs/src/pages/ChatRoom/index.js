import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Input, Tooltip } from 'antd';
import Message from '../../components/Message';
import { useParams } from 'react-router-dom';


import classNames from 'classnames/bind';
import styles from './ChatRoom.module.scss';
const cx = classNames.bind(styles);

export default function ChatRoom() {
    const {id} = useParams();
  
  return (
    <div className={cx('wrapper')}>
        <div className={cx('header')}>
          <div className={cx('info-room')}>
            <p>PNV24B</p>
            <span>a</span>
          </div>
          <div className={cx('user')}>
              <Button className={cx('button')} type='text'><FontAwesomeIcon icon={faUserPlus}/>Mời</Button>
              <Avatar.Group className={cx('avatar')} maxCount={2}>
                <Tooltip title="A">
                  <Avatar>a</Avatar>
                </Tooltip>
                <Tooltip title="B">
                  <Avatar>b</Avatar>
                </Tooltip>
                <Tooltip title="C">
                  <Avatar>c</Avatar>
                </Tooltip>
              </Avatar.Group>
          </div>
        </div>

        <div className={cx('content')}>
            <div className={cx('message')}>
                <Message text='test' img={null} displayName="khanh" createAt={123213213213} />
                <Message text='test' img={null} displayName="ai" createAt={123213213213} />
                <Message text='test' img={null} displayName="khanh" createAt={123213213213} />
            </div>
            <form className={cx('form')}>
                <Input className={cx('input')} bordered={false} autoComplete='off' placeholder='Nhập tin nhắn....'/>
                <Button className={cx('button')}>Gửi</Button>
            </form>
        </div>
    </div>
  )
}
