// const express = require('express');
// const app = express();

// app.get('/', function (req, res) {
//     res.json({
//       data: ' First Api Endpoint!' 
//     })
//   });
// app.listen(8080, function () {
//   console.log('Server listening at 8080');
// });

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', function (req, res) {
  res.json({
    data: 'First API Endpoint!'
  });
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});



