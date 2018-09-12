
const extractRel = (fragment) => {
    
    const regex = /rel\=\"(.*)\"$/
    const matched = fragment.match(regex)

    if (matched) {
        return matched[1]
    }

    return null
}

const extractLink = (fragment) => {
    
    const regex = /<(.*?)>/g
    const matched = fragment.match(regex)

    if (matched) {
        return matched[0].replace(/<|>/g, '')
    }

    return null
}

const configureLink = (fragment, links) => {

    const link = extractLink(fragment)
    const rel = extractRel(fragment)

    if (link && rel) {
        links[rel] = link
    }
}

const normalizeLinks = (links) => {
    
    const keys = ['first', 'last', 'prev', 'next']
    
    keys.forEach(key => {
        if (!links.hasOwnProperty(key)) {
            links[key] = null
        }
    })
}

const extractMetaLinks = (metaLinks) => {

    let links = {}

    if (metaLinks) {
        const fragments = metaLinks.split(',')
        fragments.forEach(fragment => configureLink(fragment, links))        
    }

    normalizeLinks(links)

    return links
}

module.exports = {
    parse: extractMetaLinks
}
