// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")
const express = require('express');
const {template} = require('./src/template');
const {ssr} = require('./src/ssr');

const app=express();
const PORT=process.env.PORT || 3000;

// hide powered by express
app.disable('x-powered-by');
// start the server

let initialState = {
  isFetching: false
}

// server rendered home page
app.get('/', (req, res) => {
  const { preloadedState, content}  = ssr(initialState,req)
  const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});

// Pure client side rendered page
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response)
});
app.listen(PORT,()=>{
    console.log(`App running at ${PORT}`)
})