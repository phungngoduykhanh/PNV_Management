import ShowClass from "../../components/ShowClass/ShowClass";
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
import CreateClass from '../../components/CreateClass/CreateClass';
function Home() {

    return (
        <div className={cx('wrapper')}>
            <CreateClass/>
            <ShowClass/>
        </div>

    )
}
export default Home;