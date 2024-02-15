import { transporter, mailOptions } from "@/libs/mailService";
import { connectMongoDB } from "@/libs/mongodb";
import Reserve from "@/models/Reserve";


export default async function handler(req, res) {
    // le pedimos que traiga toda la info que solicito , con req y lo  
    const { method } = req;
    if (method === 'POST') {

        try {
            const {fullName, cita, email, solicitado} = req.body;
            await connectMongoDB();
            // Buscamos el Id de la reserva, para enviar en el correo 
            const reservefind = await Reserve.findOne({ cita });
            console.log(reservefind._id)

            // Revisando q el email sea unico
            await transporter.sendMail({
                ...mailOptions,
                to: email,
                subject: `Reserva para el PELUCA `,
                html: `
    
                <h2> Hola ${fullName}!</h2>
                <p> Se ha generado tu reserva para el día: </p>
                <br/>
                <h4>${cita}</h4>
                <h4>Te esperamos!</h4>
                <hr style="width:30%;text-align:left;margin-left:0" >
                <p> Solicitada el: ${solicitado} </p>
                <p style="color:red;> Atención:</p><p>La cita no puede ser modificada, si desea hacerlo, debera cancelarla y solicitar otra</p>
                <hr style="width:30%;text-align:left;margin-left:0" >
                <p>Si por algún motivo no podrá asistir por favor  <a href="http://localhost:3000/cancel/reserve/${reservefind._id}">Cancelar la Cita</a></p>
                <p>Si tiene alguna duda envianos un <a href="https://wa.me/c/34644053023">WhatsApp</a></p>
                <p> Gracias por confiar en nosotros </p>
                `
            })
            res.json({ ok: true, message: 'Email sent correctly' });

        } catch (error) {
            console.log(error);
            res.status(500).send("Hubo un error");
        }

    }
}
