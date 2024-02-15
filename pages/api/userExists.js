import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
    // le pedimos que traiga toda la info que solicito , con req y lo  
    const { method } = req;
    if (method === 'POST') {

        try {
            const { email } = req.body;
            // Revisando q el email sea unico
            await connectMongoDB();
            let userfind = await User.findOne({ email });
            console.log('user:', userfind);
            return res.json({ userfind });

        } catch (error) {
            console.log(error);
            res.status(400).send("Hubo un error");
        }

    }
}