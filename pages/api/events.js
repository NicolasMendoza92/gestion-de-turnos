import { connectMongoDB } from "@/libs/mongodb";
import Event from "@/models/Event";

export default async function handle (req,res){
    await connectMongoDB();

    if(req.method === 'POST'){
        const {title, start, end, reserve} = req.body;
        const newEvent = await Event.create({title, start, end, reserve});
        res.json(newEvent);

    }

    if(req.method === 'GET'){
        try {
            if (req.query?.id) {
                res.json(await Event.findOne({ _id: req.query.id }));
            }
            else {
                const events = await Event.find({}, null, { sort: { 'start': 1 } })
                res.json({
                    events,
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    if (req.method === 'DELETE') {
        if (req.query?.id) {
            await Event.deleteOne({ _id: req.query?.id });
            res.json({ ok: true, message: 'Event deleted' });
        }
    }
}