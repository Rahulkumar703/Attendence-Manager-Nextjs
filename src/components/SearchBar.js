import React from 'react'
import Input from './Input'
import Button from './Button';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar(value, onChange) {
    return (
        <div className={style.search_bar}>
            <Input value={value} onChange={onChange} name={"search"} label={"Search"} />
            <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { handleDelete(sub._id); }}>
                <FiSearch size={20} />
            </Button>
        </div>
    )
}
