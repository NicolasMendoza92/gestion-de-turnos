import { connectMongoDB } from "@/libs/mongodb";
import Reserve from "@/models/Reserve";

export default async function handler(req, res) {
    // le pedimos que traiga toda la info que solicito , con req y lo  
    const { method } = req;
    if (method === 'POST') {

        try {
            const { cita } = req.body;
            // Revisando q no haya reserva en ese horario
            await connectMongoDB();
            let reservado = await Reserve.findOne({ cita }).select("_id");
            console.log('reserva:', reservado);
            return res.json({ reservado });

        } catch (error) {
            console.log(error);
            res.status(400).send("Hubo un error");
        }

    }
}