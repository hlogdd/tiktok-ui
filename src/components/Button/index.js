import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cs = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    small = false,
    large = false,
    disabled = false,
    hasIcon = false,
    leftIcon,
    rightIcon,
    children,
    className,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    // Xóa sự kiện khi nút có disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    // Dùng chuyển link nội bộ
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        // Dùng chuyển link sang bên ngoài
        props.href = href;
        Comp = 'a';
    }

    const classes = cs('wrapper', {
        primary,
        outline,
        text,
        rounded,
        [className]: className,
        hasIcon,
        small,
        large,
        disabled,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cs('icon')}>{leftIcon}</span>}
            <span className={cs('title')}>{children}</span>
            {rightIcon && <span className={cs('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
