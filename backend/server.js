const fs = require('fs');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


const filePaths = {
  technical_skills: './technical_skills.json',
  soft_skills: './soft_skills.json',
  experience: './experience.json',
  education: './education.json',
  projects: './projects.json',
};


app.get('/api/:category', (req, res) => {
  const { category } = req.params;
  const filePath = filePaths[category];
  if (!filePath) {
    return res.status(404).send('Category not found.');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err.message);
      return res.status(500).send('Error reading data.');
    }
    try {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError.message);
      res.status(500).send('Invalid JSON format.');
    }
  });
});


app.post('/api/:category', (req, res) => {
  const { category } = req.params;
  const filePath = filePaths[category];
  if (!filePath) {
    return res.status(404).send('Category not found.');
  }

  const data = req.body;
  if (!data || typeof data !== 'object') {
    return res.status(400).send('Invalid data format.');
  }

  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(`Error writing to file ${filePath}:`, err.message);
      return res.status(500).send('Error saving data.');
    }
    res.send(`${category.charAt(0).toUpperCase() + category.slice(1)} saved successfully.`);
  });
});


app.listen(3001, () => console.log('Server running on http://localhost:3001'));
