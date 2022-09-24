const path =require('path');
const router = require('express').Router();

router.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/animals', (req,res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req,res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
//wildcard if not route created will go to home page
router.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;
