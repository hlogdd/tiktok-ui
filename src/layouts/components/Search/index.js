import { useState, useEffect, useRef } from 'react';
import { useDebounce } from '~/hooks';

import * as searchService from '~/services/searchService';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { SearchIcon } from '~/components/Icons';

const cs = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 500);

    const inputSearchRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResults([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const results = await searchService.search(debounced);
            setSearchResults(results);

            setLoading(false);
        };

        fetchApi();

        /*
        API luon bat buoc chay lan dau phai nhap q nen ham useEffect can xoa
        encodeURIComponent su dung de ma hoa neu trung voi quy tac dat url thi no se ma hoa

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResults(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        */

        // Sử dụng axios
    }, [debounced]);

    const handleHideResults = () => {
        setShowResults(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;

        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        // Bọc div trước tippy để tránh ko dính lỗi và tính lại position nếu được tràn ra
        <div>
            <HeadlessTippy
                appendTo={() => document.body}
                interactive
                visible={showResults && searchResults.length > 0}
                render={(attrs) => (
                    <div className={cs('search-results')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cs('search-title')}>Account</h4>
                            {searchResults.map((item) => (
                                <AccountItem key={item.id} data={item} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResults}
            >
                <div className={cs('search')}>
                    <input
                        value={searchValue}
                        placeholder="Search account and video..."
                        ref={inputSearchRef}
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResults(true)}
                    />

                    {!!searchValue && !loading && (
                        <button
                            className={cs('clear')}
                            onClick={() => {
                                setSearchValue('');
                                setSearchResults([]);
                                inputSearchRef.current.focus();
                            }}
                        >
                            {<FontAwesomeIcon icon={faCircleXmark} />}
                        </button>
                    )}

                    {loading && <FontAwesomeIcon className={cs('loading')} icon={faSpinner} />}
                    <button className={cs('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
