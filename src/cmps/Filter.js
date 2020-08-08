import React, { useState, useEffect } from 'react';
import { Input, Button } from '@material-ui/core';

function Filter(props) {
    const [searchStr, setSearchStr] = useState('');
    useEffect(() => {
        setSearchStr(props.searchStr)
    }, [props.searchStr])
    
    const inputChange = ev => {
        const inputValue = ev.target.value
        setSearchStr(inputValue)
    }
    const onFilterBy = () => {
        props.onFilterBy(searchStr)
    }
    return (
        <div className="filter-container">
            <Input color="primary" onChange={inputChange} value={searchStr} placeholder="Search" inputProps={{ 'aria-label': 'description' }} />
            <Button color="primary" onClick={onFilterBy}>Go</Button>
        </div >
    )
}

export default Filter