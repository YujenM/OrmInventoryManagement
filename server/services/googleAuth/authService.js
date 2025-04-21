const { User, Role, userRole, sequelize } = require('../../models');
const { ValidationError } = require('../../errors');

const googleSignupService = async (userData) => {
  const transaction = await sequelize.transaction();

  try {
    let user = await User.findOne({
      where: {
        email: userData.email
      },
      transaction
    });

    // If user exists, return it (no need to create again)
    if (user) {
      await transaction.commit();
      return {
        message: 'User already exists, continuing login',
        user
      };
    }

    // Create the new user
    user = await User.create(userData, { transaction });

    // Find the "User" role
    const userRoleData = await Role.findOne({
      where: {
        name: 'User'
      },
      transaction
    });

    if (!userRoleData) {
      await transaction.rollback();
      throw new ValidationError("Role not found", 404);
    }

    // Assign the role to the user
    await userRole.create({
      userId: user.id,
      roleId: userRoleData.id
    }, { transaction });

    await transaction.commit();

    return {
      message: "New Google user created successfully",
      user
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = googleSignupService;
