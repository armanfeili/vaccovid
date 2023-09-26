import express from 'express';
import { saveWhoNews, getNews, saveOtherNews, fetchOtherNewsImages, update_DB_WithNewsImages, deleteOldOtherNewsImages, deleteOldNews } from '../utils/newsData';
import { validateSearchNews } from '../validation/val-news/searchNews';

const Router = express.Router();

Router.put('/update-who-news', async (req, res) => {
  try {
    await saveWhoNews();

    res.status(200).json({ message: 'News database is updated.' });
  } catch (error) {
    console.log(error);
  }
});

Router.put('/update-other-news', async (req, res) => {
  try {
    await saveOtherNews();

    res.status(200).json({ message: 'News database is updated.' });
  } catch (error) {
    console.log(error);
  }
});

Router.get('/fetch-news-images', async (req, res) => {
  try {
    await fetchOtherNewsImages();

    res.status(200).json({ message: 'News images are getting fetched.' });
  } catch (error) {
    console.log(error);
  }
});

Router.put('/update-store-news-images', async (req, res) => {
  try {
    await update_DB_WithNewsImages();

    res.status(200).json({ message: 'News images are updated.' });
  } catch (error) {
    console.log(error);
  }
});

Router.delete('/delete-old-news-images', async (req, res) => {
  try {
    await deleteOldOtherNewsImages();

    res.status(200).json({ message: 'Old News images are getting deleted.' });
  } catch (error) {
    console.log(error);
  }
});

Router.get('/get-all-news/:page', async (req, res) => {
  const { errors, isValid } = validateSearchNews(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    let search_term: any = [];

    const news = await getNews(search_term, req.params.page);
    res.status(200).json({ news });
  } catch (error) {
    console.log(error);
  }
});

Router.get('/get-coronavirus-news/:page', async (req, res) => {
  const { errors, isValid } = validateSearchNews(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const keywords = ['corona', 'COVID-19', 'pandemic', 'vaccine'];

    const news = await getNews(keywords, req.params.page);
    res.status(200).json({ news });
  } catch (error) {
    console.log(error);
  }
});

Router.get('/get-vaccine-news/:page', async (req, res) => {
  const { errors, isValid } = validateSearchNews(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const keywords = ['vaccine'];

    const news = await getNews(keywords, req.params.page);
    res.status(200).json({ news });
  } catch (error) {
    console.log(error);
  }
});

Router.get('/get-health-news/:page', async (req, res) => {
  const { errors, isValid } = validateSearchNews(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const keywords = [
      'World Health Organization',
      'health',
      'cure',
      'fever',
      'influenza',
      'symptoms',
      'disease',
      'complication',
    ];

    const news = await getNews(keywords, req.params.page);
    res.status(200).json({ news });
  } catch (error) {
    console.log(error);
  }
});

Router.delete('/delete-old-news', async (req, res) => {
  try {
    await deleteOldNews();

    res.status(200).json({ message: 'Old News are deleted.' });
  } catch (error) {
    console.log(error);
  }
});

export default Router;
