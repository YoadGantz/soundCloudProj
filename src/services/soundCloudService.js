import SC from 'soundcloud'

SC.initialize({
    client_id: 'ggX0UomnLs0VmW7qZnCzw'
});

function getTracks(searchStr = '', offset = 0) {
    return SC.get('/tracks', { limit: 6, linked_partitioning: 1, offset, q: searchStr })
}

async function getTrackSrc(src) {
    const size = (window.innerWidth > 400) ? '500' : '300'
    const oEmbed = await SC.oEmbed(src, { auto_play: true, color: '#90e0ef', maxheight: 100, maxwidth: size})
    oEmbed.html = oEmbed.html.replace('visual=true', 'visual=false')
    oEmbed.html = oEmbed.html.replace('show_artwork=true', 'show_artwork=false')
    // trackSrc = trackSrc.substring(1, trackSrc.length - 1);
    return oEmbed.html;
}

export default {
    getTracks,
    getTrackSrc
}
// find all sounds of buskers licensed under 'creative commons share alike'
