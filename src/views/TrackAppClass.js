import React, { Component } from 'react';

import Filter from '../cmps/Filter';
import TrackList from '../cmps/TrackList';
import TrackPlayer from '../cmps/TrackPlayer';
import SearchHistory from '../cmps/SearchHistory';

import searchService from '../services/searchService';
import soundCloudService from '../services/soundCloudService';

import next from '../assets/imgs/next.svg'
import menu from '../assets/imgs/menu.svg'
import tile from '../assets/imgs/tile.svg'
import '../styles/main.css'

class TrackApp extends Component {
    state = {
        tracks: null,
        searchStr: '',
        selectedTrack: null,
        searches: [],
        display: 'list'
    }
    componentDidMount() {
        const searches = searchService.loadSearch()
        this.setState({ searches })
    }
    onFilterBy = async (searchStr = '') => {
        searchService.saveSearch(searchStr)
        const tracks = await soundCloudService.getTracks(searchStr)
        const searches = searchService.loadSearch()
        this.setState({ ...this.state, searches, searchStr, tracks })
    }
    goNextPage = async () => {
        if (!this.state.tracks) return
        const { searchStr } = this.state
        const query = this.state.tracks.next_href
        const offset = new URLSearchParams(query).get('offset')
        const tracks = await soundCloudService.getTracks(searchStr, offset)
        this.setState({ searchStr, tracks })
    }
    onSelectedTrack = (selectedTrack) => {
        this.setState({ ...this.state, selectedTrack })
    }
    onPlayTrack = async () => {
        const trackSrc = await soundCloudService.getTrackSrc(this.state.selectedTrack.permalink_url)
        console.log(trackSrc);
        this.setState({ ...this.state, trackSrc })
    }
    changeDisplay = (display) => {
        this.setState({ ...this.state, display })
    }
    render() {
        console.log(this.state.trackSrc);
        return (
            <div className="app-container container flex column">
                <h1 className="header">Edea - Soundcloud API</h1>
                <div className=" flex space-between ">
                    <section className="track-search-container flex column space-between">
                        <div>
                            <Filter onFilterBy={this.onFilterBy} searchStr={this.state.searchStr} />
                            {this.state.tracks && <TrackList display={this.state.display} tracks={this.state.tracks.collection} onSelectedTrack={this.onSelectedTrack} />}
                        </div>
                        <section className="flex space-between">
                            <div className="next-select" onClick={() => this.goNextPage()}><img height="30" src={next} /></div>
                            <div className="flex">
                                <div className="list-select" onClick={() => this.changeDisplay('list')}><img height="30" src={menu} /></div>
                                <div className="tile-select" onClick={() => this.changeDisplay('tile')}><img height="30" src={tile} /></div>
                            </div>
                        </section>
                    </section>
                    {<TrackPlayer onPlayTrack={this.onPlayTrack} selectedTrack={this.state.selectedTrack} trackSrc={this.state.trackSrc} />}
                    <SearchHistory onFilterBy={this.onFilterBy} searches={this.state.searches} />
                </div >
            </div >
        )
    }
}

export default TrackApp