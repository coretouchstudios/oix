import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { email } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "AI Dev SaaS Pro",
          },
          unit_amount: 2000, // $20/mo
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    customer_email: email,
  });

  return Response.json({ url: session.url });
}