const { default: axios } = require('axios');
const express = require('express')
const router = express.Router();
 
// List of Categories
router.get('/categories', async (req, res) => {
  try {
      
    const response = await axios.get('https://api.chucknorris.io/jokes/categories');
      res.send(response.data);
  } catch (error) {
      res.status(500).send({ error });
  }
});     

// Random
router.get('/random', async (req, res) => {
  try {
      
    const response = await axios.get('https://api.chucknorris.io/jokes/random');
      res.send(response.data);
  } catch (error) {
      res.status(500).send({ error });
  }
});    

// Select by Category
router.get('/category/:category', async (req, res) => {
  try {
      
    const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${req.params.category}`);
      res.send(response.data);
  } catch (error) {
      res.status(500).send({ error });
  }
});    
//FREE TEXT
router.get('/freetext/:text', async (req, res) => {
  try {
    const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${req.params.text}`);
      res.send(response.data);
  } catch (error) {
      res.status(500).send({ error });
  }
});


module.exports = router;