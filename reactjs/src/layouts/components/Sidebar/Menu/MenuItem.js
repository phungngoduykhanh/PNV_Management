import { NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from './MenuItem.module.scss';

const cx = classNames.bind(styles);

function MenuItem({title,to,icon,active,onClick}){
    return (
        <NavLink className={cx('menu-item',{active})} to={to} onClick={onClick}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    )
}

export default MenuItem;