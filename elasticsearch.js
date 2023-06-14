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