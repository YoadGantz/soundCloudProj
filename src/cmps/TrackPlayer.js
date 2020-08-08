import React from 'react'
import parse from 'html-react-parser'

import image from '../assets/imgs/no-image.jpg';

function TrackPlayer(props) {
    let imgSrc = ''
    const imgSize = (window.innerWidth > 400) ? '500' : '300'
    if (props.selectedTrack) {
        imgSrc = image
        console.log(imgSrc);
        const size = (window.innerWidth > 400) ? 't500x500' : 't300x300'
        if (props.selectedTrack.artwork_url)
            imgSrc =  props.selectedTrack.artwork_url.replace('large', size)
    }
    function onPlayTrack() {
        props.onPlayTrack()
    }
    return (
        <div className="track-player-container flex column align-center">
            {props.selectedTrack && <img width={imgSize} src={imgSrc} alt="img" className={props.isVisable ? 'fade-in' : 'fade-out'} onClick={onPlayTrack} />}
            {props.trackSrc && parse(props.trackSrc)}
        </div >
    )
}

export default TrackPlayer