import classNames from "classnames/bind";
import styles from './WithoutLayout.module.scss';
const cx = classNames.bind(styles);

function WithoutLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
        <div className={cx('content')}>{children}</div>
    </div>
  );
}

export default WithoutLayout;
