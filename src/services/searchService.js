import storageService from "./storageService"

function loadSearch() {
    const searches = storageService.loadFromStorage('search')
    return searches
}

function saveSearch(searchStr) {
    const searches = storageService.loadFromStorage('search')
    if (searches.length === 5) searches.pop()
    searches.unshift(searchStr)
    storageService.saveToStorage('search', searches)
}




export default {
    loadSearch,
    saveSearch
}

