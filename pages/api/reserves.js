import { connectMongoDB } from "@/libs/mongodb";
import Event from "@/models/Event";
import Reserve from "@/models/Reserve";


export default async function handle(req, res) {
    const { method } = req;
    await connectMongoDB();

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                res.json(await Reserve.findOne({ _id: req.query.id }));
            }
            else {
                const reserveDoc = await Reserve.find({}, null, { sort: { '_id': -1 } })
                res.json({
                    reserveDoc,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (method === 'POST') {
        const { fullName, email, cita, date, time } = req.body;
        const reservaDoc = await Reserve.create({ fullName, email, cita, date, time });
        res.json(reservaDoc);
    }

    if (method === 'PUT') {
        const { status, _id } = req.body;
        // definimos dos parametros, definimos el objeto que lo identifica, como el id, y luego las propiedades del objeto que queremos actualizar
        const reservaDoc = await Reserve.updateOne({ _id }, { status });
        res.json(reservaDoc);

        // console.log(reservaDoc) - lo de abajo e lo que aparece en los console log. 
        // {
        //     acknowledged: true,
        //     modifiedCount: 1,
        //     upsertedId: null,
        //     upsertedCount: 0,
        //     matchedCount: 1
        //   }
    }

    if (method === 'DELETE') {
        try {
            if (req.query?.id) {
                await Reserve.deleteOne({ _id: req.query?.id });
                res.json({ ok: true, message: 'Reserva borrada' });
            }
        } catch (error) {
            res.status(400).send('Hubo un error en la conexion a la base de datos');
        }

    }
}