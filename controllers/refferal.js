import Referral from "../models/refferal.js";

export const getRefferal = async (req, res) => {
  res.render("apply");
};

export const submitRefferal = async (req, res) => {
  const { name, email, position, company, message } = req.body;

  try {
    // Create a new referral object
    const newReferral = new Referral({
      name,
      email,
      position,
      company,
      message,
    });

    // Save the referral to the database
    await newReferral.save();

    res.send("Form submitted successfully!");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const submitRefferal = async (req, res) => {
//     const { name, email, position, company, message } = req.body;
//     // Handle form data here
//     res.send('Form submitted successfully!');
//   };
