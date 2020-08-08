import React from 'react'

import { v4 as uuidv4 } from 'uuid';


function SearchHistory(props) {
    function onFilterBy(search) {
        props.onFilterBy(search)
        window.scrollTo(0,100)
    }
    return (
        <div className="search-history-container flex column">
            <h3 className="recent-searches">Recent Searches</h3>
            <ul>

                {props.searches.map(search => {
                    return <li onClick={() => onFilterBy(search)} key={uuidv4()}>
                        {search}
                    </li>
                })
                }
            </ul >
        </div>
    )
}

export default SearchHistory