const orderModel = require('../../models/orderProductModel');

const orderController = async (req, res) => {
  try {
    //console.log("Order Controller Hit");
    // Assuming you want to fetch orders for the logged-in user:
    const currentUserId = req.userId;
    //console.log("User ID:", currentUserId);

    const orderList = await orderModel.find({ userId: currentUserId }).sort({createdAt:-1});

    res.json({
      data: orderList,
      message: "Order list retrieved successfully",
      success: true,
    });
  } catch (error) {
    //console.error("Error in orderController:", error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
    });
  }
};

module.exports = orderController;
