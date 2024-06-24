import express from 'express'

const app = express();

//Refferal Routes /api/v1/refferal

app.get('/apply', (req, res) => {
    res.render('apply');
  });
  
// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, position, company, message } = req.body;
    // Handle form data here
    res.send('Form submitted successfully!');
  });

export default app;