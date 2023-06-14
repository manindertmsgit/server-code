const elasticSearch = require('./elasticsearch');
const express = require('express');
const data = require('./data')
const cors = require('cors');

let port = process.env.PORT || 3000;
const app = express();
app.use(cors());

app.get('/', function (req, res) {
  res.json({
    data: data.partners[0].firstName
  });
});
app.get('/api/partners', async (req, res) => {
  // res.json(await elasticSearch.getAll('partners'));
  res.json(data.partners);
});
app.post('/api/initialise-partners', async (req, res) => {
  res.json(await elasticSearch.initialise('partners'));
})

app.get('/api/associates', async (req, res) => {
  // res.json(await elasticSearch.getAll('associates'));
  res.json(data.associates);
});

app.get('/api/cases', async (req, res) => {
  // res.json(await elasticSearch.getAll('cases'));
  res.json(data.cases);
});


app.get('/api/test', (req, res) => {
  elasticSearch.elasticClient.ping({ requestTimeout: 30000 }, (error) => {
    if (error) {
      res.json({ connected: false });
    } else {
      res.json({ connected: true });
    }
  });
});

app.get('/favorite-candy', async(req, res) => {
  try {
    const index = 'favorite_candy';

    const searchQuery = {
      index: index,
      body: {
        query: {
          match_all: {},
        },
      },
      size: 10000,
    };

    const searchResult = await elasticClient.search(searchQuery);
    const documents = searchResult.hits.hits.map(hit => hit._source);

    res.json(documents);
  } catch (error) {
    console.error('Error retrieving favorite candy documents:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(8080, () => {
  console.log('server is running on port 8080');
});

