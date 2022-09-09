import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cs = classNames.bind(styles);

function Header({ title, onBack }) {
    return (
        <header className={cs('header')}>
            <button className={cs('back-btn')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <h4 className={cs('header-title')}>{title}</h4>
        </header>
    );
}

export default Header;
