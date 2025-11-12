import express from 'express';
import { getNews } from '../utils/newsData';
import { validateSearchNews } from '../validation/val-news/searchNews';

const Router = express.Router();

// DEPRECATED ENDPOINTS - Data no longer updated (REMOVED)
// - PUT /update-who-news (REMOVED)
// - PUT /update-other-news (REMOVED)
// - GET /fetch-news-images (REMOVED)
// - PUT /update-store-news-images (REMOVED)
// - DELETE /delete-old-news-images (REMOVED)
// - DELETE /delete-old-news (REMOVED)
// This website now serves archived news data only.

// Uncomment if you need deprecation warnings instead:
/*
const deprecatedEndpoint = (req, res) => {
  res.status(410).json({ 
    error: "This endpoint is deprecated. Data is no longer updated.",
    message: "This website now displays archived news data only."
  });
};

Router.put('/update-who-news', deprecatedEndpoint);
Router.put('/update-other-news', deprecatedEndpoint);
Router.get('/fetch-news-images', deprecatedEndpoint);
Router.put('/update-store-news-images', deprecatedEndpoint);
Router.delete('/delete-old-news-images', deprecatedEndpoint);
Router.delete('/delete-old-news', deprecatedEndpoint);
*/

// KEPT: GET endpoints for reading archived news data

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

export default Router;
