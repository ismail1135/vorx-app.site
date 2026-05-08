import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);



app.post("/subscribe", async(req, res) => {
    console.log("ENDPOINT HIT");
    const { email } = req.body;

    try {

        console.log("before resend");

        await resend.emails.send({
            from: "noreply@vorx-app.site",
            to: email,
            subject: "Test",
            html: "<h1>Test</h1>",
        });

        console.log("after resend");

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