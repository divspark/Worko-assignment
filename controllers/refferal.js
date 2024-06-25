

export const getRefferal = async (req, res) => {
    res.render('apply');
  };


export const submitRefferal = async (req, res) => {
    const { name, email, position, company, message } = req.body;
    // Handle form data here
    res.send('Form submitted successfully!');
  };

