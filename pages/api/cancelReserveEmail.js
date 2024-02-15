import { transporter, mailOptions } from "@/libs/mailService";
import { connectMongoDB } from "@/libs/mongodb";
import Reserve from "@/models/Reserve";


export default async function handler(req, res) {
    // le pedimos que traiga toda la info que solicito , con req y lo  
    const { method } = req;
    if (method === 'POST') {

        try {
            const {fullName, cita, email} = req.body;

            // Revisando q el email sea unico
            await transporter.sendMail({
                ...mailOptions,
                to: email,
                subject: `Reserva para el PELUCA `,
                html: `
    
                <h2> Hola ${fullName}!</h2>
                <p>Lamentamos informarle que Peluqueria EL PELUCA ha tenido que <p style="color:red;font-size:18px;">cancelar </p> su reserva.</p>
                <br/>
                <h4>Su cita para el: ${cita}</h4>
                <h5 style="color:red;">Ya no esta disponible </h5>
                <hr style="width:30%;text-align:left;margin-left:0" >
                <p>Para solicitar otra cita visite <a href="http://localhost:3000/"> nuestra web </a></p>
                <p>Si tiene alguna duda envianos un <a href="https://wa.me/c/34644053023">WhatsApp</a></p>
                <p> Disculpe las molestias ocacionadas </p>
                `
            })
            res.json({ ok: true, message: 'Email sent correctly' });

        } catch (error) {
            console.log(error);
            res.status(500).send("Hubo un error");
        }

    }
}