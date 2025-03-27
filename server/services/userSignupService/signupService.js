const { User, Role, userRole, sequelize } = require('../../models');
const { ValidationError }=require ('../../errors');


const signupservice = async (userData) => {
    const transaction = await sequelize.transaction();

    const checkexistinguser = await User.findOne({
        where: {
            email: userData.email
        },
        transaction
    });

    if (checkexistinguser) {
        await transaction.rollback();
        throw new ValidationError("User Email already exists in the database",409)
    }

    const newUser = await User.create(userData, { transaction });

    const userroleData = await Role.findOne({
        where: {
            name: 'User'
        },
        transaction
    });

    if (!userroleData) {
        await transaction.rollback();
        throw new ValidationError("Role not found",404);
    }

    await userRole.create({
        userId: newUser.id,
        roleId: userroleData.id
    }, { transaction });

    await transaction.commit();

    return {
        message: "User created successfully",
        user: newUser
    };
};

module.exports = signupservice;
