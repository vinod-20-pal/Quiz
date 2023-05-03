const app = require("./quiz");
const database = require('./connection');
const port = 3000;


app.listen(port,(req,res) => {
    console.log(`Server is created successfully at port no.${port}`);
});