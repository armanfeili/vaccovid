import Parser from 'rss-parser';
import axios from 'axios';
import { getConnection, Like, Not } from 'typeorm';
import { News } from './../db/models/News';
import { secretData } from './../config/secretData';

// const pictureDirectory = path.join(__dirname, './../../../../pics');

interface newsType {
  title: string;
  link: string;
  urlToImage: string
  pubDate: Date;
  content: string;
  reference: string;
}

async function _connect() {
  try {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const manager = queryRunner.manager;

    return { connection, manager, queryRunner };
  } catch (error) {
    console.log(error);
  }
}

function _sortArrayOfObjects(a: any, b: any) {
  //invert return value by multiplying by -1
  if (a.pubDate < b.pubDate) {
    return -1 * -1;
  }
  if (a.pubDate > b.pubDate) {
    return 1 * -1;
  }
  return 0;
}

async function _fetchOtherNews(whichSource: any) {
  // https://newsapi.org/docs/endpoints/top-headlines

  try {
    const options = {
      url: 'http://newsapi.org/v2/top-headlines',
      sortBy: 'publishedAt',
      pageSize: 100,
      page: 1,
      apiKey: secretData.apiKey2,
      sources: secretData.sources,
    };

    const response = await axios.get(
      `${options.url}?sortBy=${options.sortBy}&pageSize=${options.pageSize}&page=${options.page}&apiKey=${options.apiKey}&sources=${options.sources[whichSource]}`
    );

    // should return an array of objects
    return response.data;
  } catch (error) {
    console.log("couldn't update news - external api problem or exceed limitation");
  }
}

async function _fetchWhoNews() {
  // https://documenter.getpostman.com/view/8854915/SzS7NkAS?version=latest

  try {
    // create a RSS parser
    let parser = new Parser();

    // get the RSS from URL
    let whoFeed: any = await parser.parseURL(
      'https://www.who.int/rss-feeds/news-english.xml'
    );

    // get the RSS from URL
    let outbreakFeed: any = await parser.parseURL(
      'https://www.who.int/feeds/entity/csr/don/en/rss.xml'
    );

    // whoFeed.items;
    const feed = whoFeed.items.concat(outbreakFeed.items);
    // return all news
    return feed;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchOtherNewsImages() {

  // // getConnection to DB
  // const connect = await _connect();

  // // entities to work with:
  // const newsRepository = connect.connection.getRepository(News);

  // let news: Array<newsType> = [];

  // let today = new Date();
  // let oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  // let otherNewsPubDate = [];
  // let recentNews: Array<newsType> = [];

  // try {
  //   await connect.queryRunner.startTransaction();

  //   // search all news
  //   news = await newsRepository.find({
  //     where: [
  //       {
  //         reference: Not('who'),
  //       },
  //     ],
  //     order: {
  //       pubDate: 'DESC',
  //     },
  //   });

  //   // separate recent news from 1 month ago.
  //   for (let i = 0; i < news.length; i++) {
  //     otherNewsPubDate[i] = news[i].pubDate;
  //     if (otherNewsPubDate[i].getTime() > oneMonthAgo.getTime()) {
  //       recentNews.push(news[i]);
  //     }
  //   }

  //   if (recentNews.length === 0) {
  //     await connect.queryRunner.rollbackTransaction();
  //   } else {
  //     recentNews.map((news) => {
  //       const dateStr = news.pubDate.toString();

  //       Jimp.read(news.urlToImage)
  //         .then(async (img) => {
  //           img
  //             .resize(256, 256) // resize
  //             .quality(60) // set JPEG quality
  //             // .greyscale() // set greyscale
  //             // .write(`./pics/${dateStr.slice(0, 24)}-${news.reference}.jpg`); // save
  //             .writeAsync(`./pics/${dateStr.slice(0, 24)}-${news.reference}.jpg`); // save
  //           return img;
  //         })
  //         .catch(err => {
  //           // console.error(err);
  //           console.log("couldn't save the photo");
  //           console.log(`./pics/${dateStr.slice(0, 24)}-${news.reference}`);
  //         });
  //     })

  //   }
  //   await connect.queryRunner.commitTransaction();

  // } catch (error) {
  //   console.log(error);
  //   await connect.queryRunner.rollbackTransaction();
  // } finally {
  //   // you need to release query runner which is manually created:
  //   await connect.queryRunner.release();
  // }
}

export async function update_DB_WithNewsImages() {
  // // getConnection to DB
  // const connect = await _connect();

  // let arrayOfFileNames: string[] = [];
  // let arrayOfDates: Date[] = [];

  // const newsRepository = connect.connection.getRepository(News);

  // try {
  //   await connect.queryRunner.startTransaction();

  //   // read all files from directory & separate the date from their names.
  //   fs.readdir(path.join(__dirname, './../../../../pics'), async (err, files) => {
  //     // console.log(files);
  //     files.forEach(file => {
  //       const date = file.slice(0, 24)
  //       // console.log(date);
  //       arrayOfDates.push(new Date(date));
  //       arrayOfFileNames.push(file);
  //     });

  //     for (let i = 0; i < arrayOfFileNames.length; i++) {
  //       // console.log('******');
  //       // console.log(arrayOfDates[i]);
  //       // console.log(arrayOfFileNames[i]);
  //       // [1] Sun Sep 27 2020 11:30:00-google-news-in.jpg

  //       await newsRepository.update(
  //         {
  //           imageFileName: arrayOfFileNames[i],
  //         },
  //         { imageInLocalStorage: `/${arrayOfFileNames[i]}` }
  //       );
  //     }
  //   });

  //   await connect.queryRunner.commitTransaction();
  // } catch (error) {
  //   console.log(error);
  //   await connect.queryRunner.rollbackTransaction();
  // } finally {
  //   // you need to release query runner which is manually created:
  //   await connect.queryRunner.release();
  // }
}

export async function deleteOldOtherNewsImages() {

  // // getConnection to DB
  // const connect = await _connect();

  // let today = new Date();
  // // let oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  // let halfMonthAgo = new Date(today.getTime() - 15 * 24 * 60 * 60 * 1000);
  // // let oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);

  // let arrayOfFileNames: string[] = [];
  // let arrayOfDates: Date[] = [];
  // let datesToDelete: string[] = [];
  // let fileNamesToDelete: string[] = [];

  // const newsRepository = connect.connection.getRepository(News);

  // try {
  //   await connect.queryRunner.startTransaction();

  //   // read all files from directory & separate the date from their names.
  //   fs.readdir(path.join(__dirname, './../../../../pics'), (err, files) => {
  //     // console.log(files);
  //     files.forEach(file => {
  //       const date = file.slice(0, 24)
  //       // console.log(date);
  //       arrayOfDates.push(new Date(date));
  //       arrayOfFileNames.push(file);
  //     });

  //     // check if they are older than 15 days ago. 
  //     arrayOfDates.forEach(date => {
  //       if (date < halfMonthAgo) {
  //         datesToDelete.push(`${date.toString().slice(0, 24)}*`);
  //       }
  //     })

  //     // find files with matched dates to delete
  //     fileNamesToDelete = micromatch(arrayOfFileNames, datesToDelete)
  //     // console.log(fileNamesToDelete.length);

  //     // first update the imageInLocalStorage path to the file with '/logo-pic-resized.jpg'
  //     fileNamesToDelete.forEach(async (fileName) => {
  //       await newsRepository.update(
  //         {
  //           imageFileName: fileName,
  //         },
  //         { imageInLocalStorage: '/logo-pic-resized.jpg' }
  //       );
  //     })

  //     // then, delete the image file
  //     // loop in fileNamesToDelete to delete old files.
  //     fileNamesToDelete.forEach(async (file) => {
  //       fs.unlink(path.join(__dirname, `./../../../../pics/${file}`), function (err) {
  //         if (err) {
  //           console.error(err)
  //         } else {
  //           console.log("Successfully deleted the file.")
  //         }
  //       })
  //     })
  //   });

  //   await connect.queryRunner.commitTransaction();
  // } catch (error) {
  //   console.log(error);
  //   await connect.queryRunner.rollbackTransaction();
  // } finally {
  //   // you need to release query runner which is manually created:
  //   await connect.queryRunner.release();
  // }
}

export async function saveOtherNews() {
  // getConnection to DB
  const connect: any = await _connect();

  // entities to work with:
  const newsRepository = connect.connection.getRepository(News);

  try {
    await connect.queryRunner.startTransaction();

    // initialize an array of objects
    let eachNews: any = [];

    // new objects to insert to DB
    let new_News: any = [];

    // existed objects in DB
    let existed_News: any = [];

    // send 26 request - call fetchOtherNews() for 26 times
    const broadcasting: any = [];
    // allNews will be an array of all news objects.
    const allNews: any = [];
    for (let i = 0; i < 26; i++) {
      broadcasting[i] = await _fetchOtherNews(i);

      // check if we got data
      if (broadcasting[i] === undefined) {
        console.log("we couldn't fetch news from some broadcastings");
        await connect.queryRunner.rollbackTransaction();

      } else {
        for (let j = 0; j < broadcasting[i].articles.length; j++) {
          allNews.push(await broadcasting[i].articles[j]);
        }
      }
    }

    // check if we copied data
    if (allNews.length === 0) {
      console.log("couldn't get the WHO data");
      await connect.queryRunner.rollbackTransaction();
    }

    eachNews = allNews;

    // read all news from database once.
    const databaseNews = await newsRepository.find({
      order: {
        pubDate: 'ASC',
      },
    });

    if (databaseNews.length === 0) {
      for (let i = 0; i < eachNews.length; i++) {
        new_News.push(eachNews[i]);
      }
    } else {
      // search for common objects
      for (let i = 0; i < databaseNews.length; i++) {
        for (let j = 0; j < eachNews.length; j++) {
          // check if any news is matched with one of our news in DB.
          if (databaseNews[i].link === eachNews[j].url) {
            // console.log('find the match');
            existed_News.push(eachNews[j]);
          }
        }
      }

      // intersection: A - B
      // find the new news
      new_News = eachNews.filter((x: any) => !existed_News.includes(x));
    }

    // insert from the end to the beginning
    for (let i = new_News.length - 1; i >= 0; i--) {
      // console.log(`News number ${i + 1} : ${new_News[i].title}`);

      const dateStr = new Date(new_News[i].publishedAt).toString();

      // const fileName = `${dateStr.slice(0, 18)}/${dateStr.slice(19, 21)}/${dateStr.slice(22, 24)}-${new_News[i].source.id}.jpg`
      const fileName = `${dateStr.slice(0, 24)}-${new_News[i].source.id}.jpg`
      // console.log(fileName);

      await connect.manager.insert(News, [
        {
          title: new_News[i].title,
          link: new_News[i].url,
          imageFileName: fileName,
          urlToImage:
            new_News[i].urlToImage === null ||
              new_News[i].urlToImage === '' ||
              new_News[i].urlToImage === 'null'
              ? 'https://www.vaccinenow.live/icone-image'
              : new_News[i].urlToImage,
          pubDate: new_News[i].publishedAt,
          content:
            (new_News[i].description === null ||
              new_News[i].description === '' ||
              new_News[i].description === 'null'
              ? new_News[i].content
              : new_News[i].description) &&
            (new_News[i].content === null ||
              new_News[i].content === '' ||
              new_News[i].content === 'null'
              ? 'Click on the link to access the whole article.'
              : new_News[i].content),
          reference: new_News[i].source.id,
        },
      ]);
    }

    await connect.queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await connect.queryRunner.rollbackTransaction();
  } finally {
    // you need to release query runner which is manually created:
    await connect.queryRunner.release();
  }
}

export async function saveWhoNews() {
  // getConnection to DB
  const connect: any = await _connect();

  // entities to work with:
  const newsRepository = connect.connection.getRepository(News);

  try {
    await connect.queryRunner.startTransaction();

    // initialize an array of objects
    let eachNews: Array<newsType> = [];

    // existed objects in DB
    let existed_News: Array<newsType> = [];

    // new objects to insert to DB
    let new_News: Array<newsType> = [];

    // get the raw data
    const rawNews: any = await _fetchWhoNews();

    // const OutbreakNews = await getOutbreakNews();

    // check if we got data
    if (rawNews.length === 0) {
      console.log("couldn't get the WHO data");
      await connect.queryRunner.rollbackTransaction();
    }

    eachNews = rawNews;
    // // filling eachNews array with WHO news.
    // for (let i = 0; i < rawNews.length; i++) {
    //   eachNews.push(await rawNews[i]);
    // }

    // read all news from database once.
    const databaseNews = await newsRepository.find({
      order: {
        pubDate: 'ASC',
      },
    });

    if (databaseNews.length === 0) {
      for (let j = 0; j < eachNews.length; j++) {
        new_News.push(eachNews[j]);
      }
    } else {
      // search for common objects
      for (let i = 0; i < databaseNews.length; i++) {
        for (let j = 0; j < eachNews.length; j++) {
          // check if any news is matched with one of our news in DB.
          if (databaseNews[i].link === eachNews[j].link) {
            // console.log('find the match');
            existed_News.push(eachNews[j]);
          }
        }
      }

      // intersection: A - B
      // find the new news
      new_News = eachNews.filter((x) => !existed_News.includes(x));
    }

    let pureText: string;
    // insert from end to the beginning
    for (let i = new_News.length - 1; i >= 0; i--) {
      // console.log(`News number ${i + 1} : ${new_News[i].title}`);

      // remove HTML tags from the text.
      pureText = new_News[i].content.replace(/(<([^>]+)>)/gi, '');

      await connect.manager.insert(News, [
        {
          title: new_News[i].title,
          link: new_News[i].link,
          pubDate: new_News[i].pubDate,
          content: pureText,
        },
      ]);
      pureText = '';
    }

    await connect.queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await connect.queryRunner.rollbackTransaction();
  } finally {
    // you need to release query runner which is manually created:
    await connect.queryRunner.release();
  }
}

export async function getNews(search_term: any, page: any) {

  // getConnection to DB
  const connect: any = await _connect();

  // entities to work with:
  const newsRepository = connect.connection.getRepository(News);

  let news: Array<newsType> = [];
  let uniqueNews: any = [];
  let newsForKeyword: any = [];

  let whoNews: Array<newsType> = [];
  let uniqueWhoNews: any = [];
  let whoNewsForKeyword: any = [];

  let today = new Date();
  let oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  let tenDaysAgo = new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000);
  let otherNewsPubDate = [];
  let whoNewsPubDate = [];

  let recentWhoNews: Array<newsType> = [];
  let recentNews: Array<newsType> = [];

  let pureText: string;
  const validLength = 200;
  let realLength = 0;

  try {
    if (search_term.length === 0) {
      // search all news
      news = await newsRepository.find({
        where: {
          reference: Not('World')
        },
        order: {
          pubDate: 'DESC',
        }
      });

      // separate recent news from 1 month ago.
      for (let i = 0; i < news.length; i++) {
        otherNewsPubDate[i] = news[i].pubDate;
        if (otherNewsPubDate[i].getTime() > oneMonthAgo.getTime()) {
          recentNews.push(news[i]);
        }
      }
      // search all WHO news
      whoNews = await newsRepository.find({
        where: [
          {
            reference: 'who',
          },
          {
            reference: 'who',
          },
        ],
        order: {
          pubDate: 'DESC',
        },
      });

      // justify the WHO content in order to show to users.
      for (let i = 0; i < whoNews.length; i++) {
        pureText = whoNews[i].content;
        realLength = pureText.length;
        pureText = pureText.substring(0, validLength);
        whoNews[i].content =
          pureText +
          (realLength - validLength < 0
            ? ''
            : `… [+${realLength - validLength} chars]`);
      }

      // separate recent WHO news from 10 days ago.
      for (let i = 0; i < whoNews.length; i++) {
        whoNewsPubDate[i] = whoNews[i].pubDate;
        if (whoNewsPubDate[i].getTime() > tenDaysAgo.getTime()) {
          recentWhoNews.push(whoNews[i]);
        }
      }
    }

    if (search_term.length > 0) {
      // search for all news with given keywords
      for (let i = 0; i < search_term.length; i++) {

        newsForKeyword[i] = await newsRepository.find({
          where: [
            {
              title: Like(`%${search_term[i]}%`),
              reference: Not('who'),
            },
            {
              content: Like(`%${search_term[i]}%`),
              reference: Not('who'),
            },
          ],
          order: {
            pubDate: 'DESC',
          },
        });

        // search for all WHO news with given keywords
        // SELECT * FROM news WHERE ((title = '%search_term%' AND "reference" = 'who') OR
        // (content = '%search_term%' AND "reference" = 'bbc-news'))
        // AND ORDER BY pubDate DESC
        whoNewsForKeyword[i] = await newsRepository.find({
          where: [
            {
              title: Like(`%${search_term[i]}%`),
              reference: 'who',
            },
            {
              content: Like(`%${search_term[i]}%`),
              reference: 'who',
            },
          ],
          order: {
            pubDate: 'DESC',
          },
        });

        // gather all news into 1 single array called news
        for (let j = 0; j < newsForKeyword[i].length; j++) {
          news.push(newsForKeyword[i][j]);
        }

        // gather all who news into 1 single array called whoNews
        for (let j = 0; j < whoNewsForKeyword[i].length; j++) {
          whoNews.push(whoNewsForKeyword[i][j]);
        }
      }

      // remove duplicate news based on their links.
      uniqueNews = Array.from(new Set(news.map((a) => a.link))).map((link) => {
        return news.find((a) => a.link === link);
      });

      // remove duplicate who news based on their links.
      uniqueWhoNews = Array.from(new Set(whoNews.map((a) => a.link))).map(
        (link) => {
          return whoNews.find((a) => a.link === link);
        }
      );

      // separate recent news from 1 month ago.
      for (let i = 0; i < uniqueNews.length; i++) {
        otherNewsPubDate[i] = uniqueNews[i].pubDate;
        if (otherNewsPubDate[i].getTime() > oneMonthAgo.getTime()) {
          recentNews.push(uniqueNews[i]);
        }
      }

      // justify the WHO content in order to show to users.
      for (let i = 0; i < uniqueWhoNews.length; i++) {
        pureText = uniqueWhoNews[i].content;
        realLength = pureText.length;
        pureText = pureText.substring(0, validLength);
        uniqueWhoNews[i].content =
          pureText +
          (realLength - validLength < 0
            ? ''
            : `… [+${realLength - validLength} chars]`);
      }

      // separate recent WHO news from 10 days ago.
      for (let i = 0; i < uniqueWhoNews.length; i++) {
        whoNewsPubDate[i] = uniqueWhoNews[i].pubDate;
        if (whoNewsPubDate[i].getTime() > tenDaysAgo.getTime()) {
          recentWhoNews.push(uniqueWhoNews[i]);
        }
      }
    }

    // final sort news:
    const sortedWhoNews = recentWhoNews.sort(_sortArrayOfObjects)
    const sortedNews = recentNews.sort(_sortArrayOfObjects)

    // return WHO news first, and then other news.
    const allNews = [...sortedWhoNews, ...sortedNews];

    // devide allNews into 10 arrays:
    const newsPerPage = [];
    for (var i = 0; i < allNews.length; i += 10) {
      newsPerPage.push(allNews.slice(i, i + 10));
    }

    return newsPerPage[page];
    // return allNews;

  } catch (error) {
    console.log(error);
  } finally {
    // you need to release query runner which is manually created:
    await connect.queryRunner.release();
  }
}

export async function deleteOldNews() {

  // getConnection to DB
  const connect: any = await _connect();

  // entities to work with:
  const newsRepository = connect.connection.getRepository(News);

  let today = new Date();
  // let oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  // let oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
  let fortyFiveDaysAgo = new Date(today.getTime() - 45 * 24 * 60 * 60 * 1000);

  let news: Array<newsType> = [];
  let newsPubDate = [];
  let oldNews: Array<newsType> = [];

  try {
    await connect.queryRunner.startTransaction();

    // search all news
    news = await newsRepository.find({
      order: {
        pubDate: 'DESC',
      }
    });

    // separate recent news from 45 days ago.
    for (let i = 0; i < news.length; i++) {
      newsPubDate[i] = news[i].pubDate;
      if (newsPubDate[i].getTime() < fortyFiveDaysAgo.getTime()) {
        oldNews.push(news[i]);
      }
    }

    // delete old news
    oldNews.forEach(async (oldNews) => {
      await newsRepository.delete({ link: `${oldNews.link}` });
    })

    await connect.queryRunner.commitTransaction();
  } catch (error) {
    console.log(error);
    await connect.queryRunner.rollbackTransaction();
  } finally {
    // you need to release query runner which is manually created:
    await connect.queryRunner.release();
  }
}

// ******************** //
// ******************** //
// ******************** //

export async function firstTimeFetchNewsImages() {
  // await fetchOtherNewsImages();
}

export async function fetchAndSaveNewsImages() {
  // setInterval(async () => {
  //   await fetchOtherNewsImages();
  //   setTimeout(async () => {
  //     await update_DB_WithNewsImages()
  //   }, 240000);// afte 4 minutes
  // }, 3600000 * 8); // gets called every 8 hours.
  // setInterval(async () => {
  //   await deleteOldOtherNewsImages();
  // }, 3600000 * 5); // gets called every 5 hours.
}

export async function firstTimeFetchAndSaveNews() {
  setTimeout(async () => {
    await saveOtherNews();
  }, 240000); // after 4 minutes
  setTimeout(async () => {
    await saveWhoNews();
  }, 180000); // after 3 minutes
}

export async function fetchAndSaveNews() {
  setInterval(async () => {
    await saveOtherNews();
  }, 7200000); // gets called every 2 hours.
  setInterval(async () => {
    await saveWhoNews();
  }, 7200100); // gets called almost every 2 hours.
}

export async function deleteAllOldNews() {
  setInterval(async () => {
    await deleteOldNews();
  }, 18000300); // gets called every 5 hours.
}
