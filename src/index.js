const express = require('express');
const app = express();
// To solve the cors issue
const cors=require('cors');
const fs = require('fs');
  
// json file with the data
const data = fs.readFileSync('data.json');
const elements = JSON.parse(data);
const PORT = 5000;


// start the server on port 5000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is called
app.get('/products', alldata);

function alldata(request, response) {
	
	// Returns all information about the elements
	response.send(elements);
}
