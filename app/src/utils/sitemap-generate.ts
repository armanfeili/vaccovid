import { SitemapStream, streamToPromise } from 'sitemap';
import { createGzip } from 'zlib';
import fs from "fs";
import Path from "path";

import { worldSymbols } from './world-sitemap';
import { routes } from './vacRoutes';

export async function generateSitemap(res: any) {

    let sitemap;
    const smStream = new SitemapStream({
        hostname: 'https://vaccovid.live/',
        lastmodDateOnly: false, // print date not time
    })

    const pipeline = smStream.pipe(createGzip())

    routes.forEach(async (e: any, i: number) => {
        if (e !== undefined) {
            smStream.write({ url: `/${e.treatmentVsVaccine === "Vaccine" ? "vaccine-tracker" : "treatment-tracker"}/${e.trimedCategory}/${e.trimedName}`, changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
        }
    });
    smStream.write({ url: `/vaccine-tracker/buji/buji`, changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })

    smStream.write({ url: '/', changefreq: 'daily', priority: 1.0, lastmod: `${new Date().toDateString()}` })
    smStream.write({ url: '/covid-19-tracker', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/world-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-world-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })

    smStream.write({ url: '/covid-19-tracker/USA/USA', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Canada/CAN', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Australia/AUS', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/India/IND', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Germany/DEU', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/France/FRA', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/UK/GBR', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Netherlands/NLD', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Italy/ITA', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Japan/JPN', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/China/CHN', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Russia/RUS', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Spain/ESP', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Sweden/SWE', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/covid-19-tracker/Ukraine/UKR', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })

    smStream.write({ url: '/coronavirus-usa-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-canada-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-australia-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-germany-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })
    smStream.write({ url: '/coronavirus-brazil-map', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.9 })

    smStream.write({ url: '/news/vaccine', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/news/covid19', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/news/health', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })

    smStream.write({ url: '/covid-19-tracker/north-america-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19-tracker/europe-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19-tracker/asia-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19-tracker/africa-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19-tracker/australia-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19-tracker/south_america-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
    smStream.write({ url: '/covid-19-tracker/oceania-data', changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
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
            smStream.write({ url: `/covid-19-tracker/${e.name}/${e.alpha3.toUpperCase()}`, changefreq: 'daily', lastmod: `${new Date().toDateString()}`, priority: 0.8 })
        }
    })

    // cache the response
    streamToPromise(pipeline).then((sm: any) => sitemap = sm)
    // make sure to attach a write stream such as streamToPromise before ending
    smStream.end()
    // stream write the response
    pipeline.pipe(res).on('error', (e: any) => { throw e })
}

