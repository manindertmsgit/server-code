const elastic = require('elasticsearch');
const data = require('./data');

const elasticClient = elastic.Client({
    host: 'localhost:9200',
});

async function indexDocument(index, document) {
    try {
        const indexResult = await elasticClient.index({
            index: index,
            body: document,
        });

        console.log(`Indexed document with ID ${indexResult._id}`);
    } catch (error) {
        console.log('Error indexing document:', error);
        throw error;
    }
}

// async function indexDocument(index, document) {
//     try {
//       const id = document.id; 
  
//       const indexResult = await elasticClient.index({
//         index: index,
//         id: id,
//         body: document,
//       });
  
//       console.log(`Indexed document with ID ${id}`);
//       return id;
//     } catch (error) {
//       console.log('Error indexing document:', error);
//       throw error;
//     }
//   }

// elasticClient.index(
//     {
//       index: 'partners',
//       id: '1',
//       type: 'posts',
//       body: document,
//     },

    // function (err, resp, status) {
    //   if (err) {
    //     console.error('Error indexing document:', err);
    //     res.status(500).json({ error: 'An error occurred' });
    //   } else {
    //     console.log(resp);
    //     res.json(resp);
    //   }
    // }
  




async function initialise(index) {
    const dataValues = data[index]
    await Promise.all(
        dataValues.map(async (value) => {
            return indexDocument(index, value);
        })
    )
}
async function getAll(index) {
    try {

        const searchQuery = {
            index: index,
            body: {
                query: {
                    match_all: {}
                },
            },
            size: 10000,
        };

        const searchResult = await elasticClient.search(searchQuery);
        const document = searchResult.hits.hits.map(hit => hit._source);

        return document;
    } catch (error) {
        console.error(`Error retrieving partners:`, error);
    }

    try {

        const searchQuery = {
            index: index,
            body: {
                query: {
                    match_all: {}
                },
            },
            size: 10000,
        };

        const searchResult = await elasticClient.search(searchQuery);
        const document = searchResult.hits.hits.map(hit => hit._source);

        return document;
    } catch (error) {
        console.error(`Error retrieving associates:`, error);
    }
}

module.exports = { elasticClient, indexDocument, getAll, initialise };