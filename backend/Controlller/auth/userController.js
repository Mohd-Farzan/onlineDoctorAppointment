const UserModel = require("../../Model/userModel");

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params; // Ensure the parameter matches the route
    
    const { email, password, userName } = req.body;
    
    const checkProfileData = await UserModel.findById({id});
    if (!checkProfileData) {
        return res.status(404).json({
            success: false,
            message: "User profile not found",
        });
    }

    // Update fields only if they are provided in the request
    if (email) checkProfileData.email = email;
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds); // Hash password
    }
    if (userName) checkProfileData.userName = userName;

    // Save the updated document
    await checkProfileData.save();

    res.status(200).json({
      success: true, // Correct the success field to true
      message: "Profile updated successfully",
      data: checkProfileData, // Include updated user data if needed
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { updateProfile };
