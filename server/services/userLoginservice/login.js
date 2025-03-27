
const bcrypt = require('bcryptjs');
const { User, Role } = require('../../models');
const { ValidationError }=require ('../../errors');
const loginService = async (userData) => {
    const existingUser = await User.findOne({
        where: { email: userData.email },
        include: [{
            model: Role,
            through: 'userRole',
            attributes: ['name']
        }]
    });

    if (!existingUser) {
        throw new ValidationError("Invalid Email or Password",401);
    }

    const isPasswordValid = await bcrypt.compare(userData.password, existingUser.password);
    if (!isPasswordValid) {
        throw new ValidationError("Invalid Email or Password",401);
        // throw new Error("Invalid Email or Password this",401);
    }

    const roles = existingUser.Roles.map(role => role.name);
    

    if (!roles.includes("user")) {
        throw new ValidationError("Access denied.Only User is allowed to Log In",403);
        
    }

    

    const { password, ...userWithoutPassword } = existingUser.toJSON();
    return {
            ...userWithoutPassword,
            Roles:roles,
    };
};

module.exports = loginService;
