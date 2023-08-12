import React from 'react'
import Input from './Input'
import Button from './Button';
import { FiSearch, FiX } from 'react-icons/fi';
import styles from './styles/Searchbar.module.scss'

export default function SearchBar(props) {

    const { value, setValue } = props;


    return (
        <div className={`${styles.searchbar} ${value.length ? styles.active : ''}`}>
            <Input
                type={"text"}
                name={"search"}
                placeholder="Search here"
                className={styles.searchInput}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <FiX size={18} className={styles.clear_icon} onClick={() => setValue('')} />
        </div>
    )
}
