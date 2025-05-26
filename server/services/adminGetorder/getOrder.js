const { User, Item, Order, orderItem } = require('../../models');
const { validationError } = require('../../errors');

const getOrder = async (adminId) => {
  const existingUser = await User.findOne({
    where: { id: adminId }
  });

  if (!existingUser) {
    throw new validationError(`Admin Not found with id ${adminId}`, 401);
  }

  const items = await Item.findAll({
    where: { userId: adminId },
    attributes: ['id']
  });

  const itemIds = items.map(item => item.id);
  if (itemIds.length === 0) return [];

  const orderItems = await orderItem.findAll({
    where: { itemId: itemIds },
    include: [
      {
        model: Order,
        include: [
          {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        ]
      },
      {
        model: Item,
        attributes: ['id', 'name', 'price']
      }
    ]
  });

  return orderItems;
};

module.exports = getOrder;
