import React from 'react'
import { v4 as uuidv4 } from 'uuid';

import TrackPreview from './TrackPreview'

function TrackList(props) {
    return (
        <ul className={"track-list-container "+ props.display} >
            {props.tracks.map(track => {
                return <TrackPreview key={uuidv4()} display={props.display} track={track} onSelectedTrack={props.onSelectedTrack} />
            })}
        </ul>
    )
}

export default TrackList