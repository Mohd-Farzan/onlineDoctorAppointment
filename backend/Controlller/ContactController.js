const Contact =require('../Model/contact')

const contact = async (req, res) => {
  try {
    const { name,email,phone,message} = req.body;
    if(!name || !email || !phone ||!message){
        alert('all fields are required')
    }
    
    
    const newContact = new Contact({
        name,
        email,
       phone,
       message,
    });
    await newContact.save();

    res.status(200).json({
      success: true, // Correct the success field to true
      message: "your message is send out team reponse you soon...",
      data: newContact
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { contact };
