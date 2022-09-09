import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cs = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cs('wrapper')}>
            <h2>Sidebar</h2>
        </aside>
    );
}

export default Sidebar;
