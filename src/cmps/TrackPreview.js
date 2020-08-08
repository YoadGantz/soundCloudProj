import React from 'react'

import image from '../assets/imgs/no-image.jpg';

function TrackPreview(props) {
    function selectedTrack(track) {
        props.onSelectedTrack(track)
        window.scrollTo(0, window.innerHeight+100)
    }
    return (

        <li onClick={() => selectedTrack(props.track)}>
            {props.display === 'list' ? props.track.title : <img title={props.track.title} width="100%" src={props.track.artwork_url || image} alt="" />}
        </li >
    )
}

export default TrackPreview