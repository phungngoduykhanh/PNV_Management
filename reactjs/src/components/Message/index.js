import React from 'react'
import { Avatar, Typography } from 'antd'

import classNames from 'classnames/bind';
import styles from './Message.module.scss';
const cx = classNames.bind(styles);

export default function Message({text, displayName,createAt,img}) {
  return (
    <div className={cx('wrapper')}>
        <div>
            <Avatar src={img}>a</Avatar>
            <Typography.Text className={cx('author')}>{displayName}</Typography.Text>
            <Typography.Text className={cx('date')}>{createAt}</Typography.Text>
        </div>
        <div>
        <Typography.Text className={cx('content')}>{text}</Typography.Text>
        </div>
    </div>
  )
}
