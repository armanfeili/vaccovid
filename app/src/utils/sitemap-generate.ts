import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import { Readable } from 'stream';

import { worldSymbols } from './world';
// const pictureDirectory = path.join(__dirname, './../../../../pics');


export async function generateSitemap(res: any) {
    let sitemap;
    const smStream = new SitemapStream({
        hostname: 'https://vaccovid.live/',
        lastmodDateOnly: false, // print date not time
    })
    const pipeline = smStream.pipe(createGzip())
    // pipe your entries or directly write them.
    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0, lastmod: `${new Date().toDateString()}` })
    smStream.write({ url: '/covid-19', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/world-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-world-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })

    smStream.write({ url: '/covid-19/USA/USA', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Canada/CAN', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Australia/AUS', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/India/IND', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Germany/DEU', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/France/FRA', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/UK/GBR', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Netherlands/NLD', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Italy/ITA', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Japan/JPN', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/China/CHN', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Russia/RUS', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Spain/ESP', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Sweden/SWE', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19/Ukraine/UKR', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })

    smStream.write({ url: '/coronavirus-usa-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-canada-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-australia-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-germany-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-brazil-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })

    smStream.write({ url: '/news/vaccine', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/news/covid19', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/news/health', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })

    smStream.write({ url: '/covid-19/north-america-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19/europe-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19/asia-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19/africa-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19/australia-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19/south_america-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19/oceania-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/about', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.7 })

    worldSymbols.forEach(e => {
        if (
            e.id !== 4 &&
            e.id !== 840 &&
            e.id !== 124 &&
            e.id !== 36 &&
            e.id !== 356 &&
            e.id !== 276 &&
            e.id !== 250 &&
            e.id !== 826 &&
            e.id !== 535 &&
            e.id !== 380 &&
            e.id !== 392 &&
            e.id !== 156 &&
            e.id !== 643 &&
            e.id !== 724 &&
            e.id !== 752 &&
            e.id !== 804
        ) {
            smStream.write({ url: `/covid-19/${e.name}/${e.alpha3.toUpperCase()}`, changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
        }
    })

    /* or use
    Readable.from([{url: '/page-1'}...]).pipe(smStream)
    if you are looking to avoid writing your own loop.
    */

    // cache the response
    streamToPromise(pipeline).then((sm: any) => sitemap = sm)
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e: any) => { throw e })
}