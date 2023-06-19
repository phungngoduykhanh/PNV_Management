import ShowClass from "../ShowClass/ShowClass";
import classNames from 'classnames/bind';
import styles from '../ShowClass/Showclass.module.scss';
const cx = classNames.bind(styles);

function Home() {

    return (
        <div className={cx('Home-teachers')}>
            <ShowClass/>
        </div>
      
    )
}

export default Home;