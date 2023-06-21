import classNames from "classnames/bind";
import styles from './SearchArea.module.scss'

const cx = classNames.bind(styles);

function SearchArea({children}){
    return <div className={cx('wrapper')}>
        {children}
    </div>
}
export default SearchArea;