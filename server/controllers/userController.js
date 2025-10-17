export const getProfile = (req, res) => {
    const user = req.user
    return res.status(200).json({user})
}

// export const updateProfile = (req,res) => {
//   const user = req.user
  
// }
