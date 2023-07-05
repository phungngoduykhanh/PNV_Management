import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const cx=classNames.bind(styles);

function Search(){

    return(
        <form className={cx('wrapper')}> 
            <input className={cx('input')}>
            </input>
            <div className={cx('icon')}>
                <FontAwesomeIcon  icon={faSearch}/>
            </div>
        </form>
            
    );
}

export default Search;