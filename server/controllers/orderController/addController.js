const addOrderService = require('../../services/OrderSevices/addOrder');

const addOrdercontroller = async (req, res, next) => {
    try {
        const userId = req.decoded?.id;
        if (!userId) {
          return res.status(401).json({ success: false, message: "Unauthorized access" });
        }
    
        const { itemId } = req.params;
        const { quantity } = req.body;
    
        if (!itemId || !quantity) {
          return res.status(400).json({
            success: false,
            message: "Item ID (in URL) and quantity (in body) are required"
          });
        }
    
        const items = [{ itemId: parseInt(itemId, 10), quantity: parseInt(quantity, 10) }];
        const result = await addOrderService(userId, items);
    
        return res.status(201).json(result);
      } catch (err) {
        next(err);
      }
};

module.exports = { addOrdercontroller };
