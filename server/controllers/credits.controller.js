import Stripe from "stripe"
import UserModel from './../models/user.model.js';
import dotenv from "dotenv" 
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 
//generates url of stripe, navigate to that window

const CREDIT_MAP = {
    99:50 ,
    199 : 120,
    349 : 250,
}

export const createCreditsOrder = async(req, res)=>{
    try {
        const userId = req.userId
        const {amount} = req.body ; //by handlePaying

        if(!CREDIT_MAP[amount]){
            return res.status(400).json({message:"Invalid credit plan"})
        }

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
            line_items: [
                {
                price_data: {
                    currency: "inr",
                    product_data: {
                    name: `${CREDIT_MAP[amount]} Credits`,
                    },
                    unit_amount: amount * 100,
                },
                quantity: 1,
                },
            ],
            metadata: {
                userId,
                credits: CREDIT_MAP[amount],
            },
        })
        // we get url through session -> send to frontend

        res.status(200).json({url : session.url}) ; 

    } catch (error) {
        res.status(500).json({message : "Stripe error "}) ; 
    }
}



export const stripeWebhook = async(req, res)=>{
    // after payment - signature is stored in header
    const sign = req.headers["stripe-signature"]

    // find event - if event is - stripe.sessions.complete -- credit Add
    // else if - stripe.sessions.failed --credit not Add
    let event ;

    try {
        // create event - after checking by webhook
        event = stripe.webhooks.constructEvent(
            req.body ,
            sign,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        console.log("❌ Webhook signature error : " , error.message);
        return res.status(400).send("Webhook Error");
    }

    if(event.type === "checkout.session.completed"){
        // payment completed - credit update

        const session = event.data.object;

        const userId = session.metadata.userId;
        const creditsToAdd = Number(session.metadata.credits);

        if(!userId || !creditsToAdd){
            return res.status(400).json({ message: "Invalid metadata" });
        }

        const user = await UserModel.findByIdAndUpdate(userId, {
            $inc : {credits : creditsToAdd},
            $set : {isCreditAvailable : true} ,
        }, {new : true} )

        if(!user) return res.status(404).json({ message: "User not found" })

    }
    res.json({recieved :true})
}