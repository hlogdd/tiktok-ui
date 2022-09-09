import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Images from '~/components/Image';

const cs = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        // - dau / de di ra ngoai path, - @ de noi
        <Link to={`/@${data.nickname}`} className={cs('wrapper')}>
            <Images className={cs('avatar')} src={data.avatar} alt={data.nickname} />
            <div className={cs('info')}>
                <p className={cs('name')}>
                    {data.full_name}
                    {data.tick && (
                        <span className={cs('check')}>
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </span>
                    )}
                </p>
                <span className={cs('username')}>{data.nickname}</span>
            </div>
        </Link>
    );
}

export default AccountItem;
