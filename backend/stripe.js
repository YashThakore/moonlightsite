require("dotenv").config();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST);

(async () => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Moonlight Premium [1 Guild]",
                            description: "Unlock premium commands for one full server, ideal for communities.",
                        },
                        unit_amount: 1000, // $10.00 USD
                    },
                    quantity: 1,
                },
            ],
            custom_fields: [
                {
                    key: "serverid",
                    label: {
                        type: "custom",
                        custom: "Discord Server ID",
                    },
                    type: "text",
                    text: {}
                },
            ],
            success_url: "https://www.moonlightbot.xyz",
            cancel_url: "https://www.moonlightbot.xyz",
        });

        console.log("✅ Checkout URL:", session.url);
    } catch (err) {
        console.error("❌ Error creating checkout session:", err);
    }
})();