import stripe from 'stripe';
import Booking from '../models/Booking.js';

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = stripeInstance.webhooks.constructEvent(
            request.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return response.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
        try {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const sessions = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const session = sessions.data[0];
            const { bookingId } = session.metadata;

            await Booking.findByIdAndUpdate(bookingId, {
                isPaid: true,
                paymentMethod: 'Stripe',
                status: 'confirmed',
            });
        } catch (err) {
            console.error(`Error processing payment intent:`, err.message);
            return response.status(500).send('Internal Server Error');
        }
    } else {
        console.log(`Unhandled event type: ${event.type}`);
    }

    response.json({ received: true });
};
