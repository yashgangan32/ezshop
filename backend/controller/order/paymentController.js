const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body;
        

        // Fetch the user by ID (ensure req.userId is set, probably from authentication middleware)
        const user = await userModel.findOne({ _id : request.userId });
       
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: "auto",
            shipping_options: [
                {
                    shipping_rate: 'shr_1PnLHRL43TqLybgMPj20Kl1Q'
                }
            ],
            customer_email: user.email,
            metadata:{
                userId:request.userId
            },
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.productId.productName, // Accessing nested productId fields
                            images:  Array.isArray(item.productId.productImage) ? item.productId.productImage : [item.productId.productImage], // Ensure it's an array of stringsy, // Ensure this is an array
                            metadata: {
                                productId: item.productId._id // Accessing product ID
                            }
                        },
                        unit_amount: item.productId.sellingPrice*100 // Convert to the smallest currency unit (e.g., paise)
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        };

        // Create the Stripe checkout session
        const session = await stripe.checkout.sessions.create(params)
        // Send the session ID as the responsey

        response.status(303).json(session);

    } catch (err) {
        response.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        });
    }
}

module.exports = paymentController;
