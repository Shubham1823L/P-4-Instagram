import User from '../models/User'


export const findUserByEmail = async (email) => await User.findOne({ email })
