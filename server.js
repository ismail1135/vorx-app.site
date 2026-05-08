import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/subscribe", async(req, res) => {
    const { email } = req.body;

    try {


        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Abonelik başarılı",
            html: "<h1>Bültene hoş geldin 👋</h1>",
        });

        res.json({
            message: "Abonelik başarılı",
        });

    } catch (err) {
        res.status(500).json({
            message: "Hata oluştu",
        });
    }
});

app.listen(3000, () => {
    console.log("Server çalışıyor");
});