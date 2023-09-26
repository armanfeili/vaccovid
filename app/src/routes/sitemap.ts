import express from 'express';
import { generateSitemap } from '../utils/sitemap-generate';

const Router = express.Router();


Router.get('/', async (req, res) => {
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    try {
        await generateSitemap(res);
        // if (sitemap !== undefined) {
        //     res.status(200).json({ message: 'sitemap has been generated.' });
        //     // res.send(sitemap)
        //     return
        // } else {
        //     res.status(500).json({ message: 'sitemap has not been generated.' });
        // }

    } catch (error) {
        console.log(error);
        res.status(500).end()
    }
});


export default Router;
