import { transporter, mailOptions } from "@/libs/mailService";


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
                <p> Se petición de cancelar cita con peluqueria EL PELUCA ha sido gestionada</p>
                <br/>
                <h4>La cita para el: ${cita}</h4>
                <h5 style="color:red;">Ha sido cancelada </h5>
                <hr style="width:30%;text-align:left;margin-left:0" >
                <p>Para solicitar otra cita visite <a href="https://appointment-management.vercel.app/"> nuestra web </a></p>
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
