import React, { useState } from 'react';

import Filter from '../cmps/Filter';
import TrackList from '../cmps/TrackList';
import TrackPlayer from '../cmps/TrackPlayer';
import SearchHistory from '../cmps/SearchHistory';

import searchService from '../services/searchService';
import soundCloudService from '../services/soundCloudService';
import storageService from '../services/storageService';

import next from '../assets/imgs/next.svg'
import menu from '../assets/imgs/menu.svg'
import tile from '../assets/imgs/tile.svg'
import '../styles/main.css'


function TrackApp() {
    const [tracks, setTracks] = useState(null)
    const [isVisable, setIsVisable] = useState(false)
    const [searchStr, setSearchStr] = useState('')
    const [trackSrc, setTrackSrc] = useState('')
    const [selectedTrack, setSelectedTrack] = useState(null)
    const [searches, setSearches] = useState(searchService.loadSearch());
    const [display, setDisplay] = useState(storageService.loadFromStorage('display') || 'list')
    const onFilterBy = async (searchStr = '') => {
        searchService.saveSearch(searchStr)
        const newTracks = await soundCloudService.getTracks(searchStr)
        const searches = searchService.loadSearch()
        setTracks(newTracks)
        setSearchStr(searchStr)
        setSearches(searches)
    }
    const onPlayTrack = async () => {
        const trackSrc = await soundCloudService.getTrackSrc(selectedTrack.permalink_url)
        console.log(trackSrc);
        setTrackSrc(trackSrc)
    }
    const goNextPage = async () => {
        if (!tracks) return
        const query = tracks.next_href
        const offset = new URLSearchParams(query).get('offset')
        const newTracks = await soundCloudService.getTracks(searchStr, offset)
        setTracks(newTracks)
        setSearchStr(searchStr)
    }
    const onSelectedTrack = (newSelectedTrack) => {
        if (selectedTrack === newSelectedTrack) return 
        setIsVisable(false)
        setTimeout(() => {
            setSelectedTrack(newSelectedTrack)
            setIsVisable(true)
        },500)
        
    }
    const changeDisplay = (display) => {
        setDisplay(display)
        storageService.saveToStorage('display', display)
    }
    return (
        <div className="app-container container flex column">
            <h1 className="header">Edea - Soundcloud API</h1>
            <main className="flex space-between">
                <section className="track-search-container flex column space-between">
                    <div>
                        <Filter onFilterBy={onFilterBy} searchStr={searchStr} />
                        {tracks && <TrackList display={display} tracks={tracks.collection} onSelectedTrack={onSelectedTrack}/>}
                    </div>
                    <section className="flex space-between">
                        <div className="next-select" onClick={goNextPage}><img height="30" src={next} alt="next" /></div>
                        <div className="flex">
                            <div className="list-select" onClick={() => changeDisplay('list')}><img height="30" src={menu} alt="list" /></div>
                            <div className="tile-select" onClick={() => changeDisplay('tile')}><img height="30" src={tile} alt="tile" /></div>
                        </div>
                    </section>
                </section>
                {<TrackPlayer isVisable={isVisable} onPlayTrack={onPlayTrack} selectedTrack={selectedTrack} trackSrc={trackSrc} />}
                <SearchHistory onFilterBy={onFilterBy} searches={searches} />
            </main >
            <footer>By Yoad Gantz</footer>
        </div >
    )
}

export default TrackApp