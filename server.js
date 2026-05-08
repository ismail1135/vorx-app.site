import express from "express";
import { Resend } from "resend";
import dotenv from "dotenv";
import cors from "cors";

app.use(cors());
dotenv.config();

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/subscribe", async(req, res) => {
    const { email } = req.body;

    try {
        await resend.emails.send({
            from: "noreply@vorx-app.site",
            to: email,
            subject: "Vorx Beta Katılımı",
            html: "<h1>Vorx'e hoş geldin!</h1><p>Beta listesine başarıyla eklendiniz.</p>",
        });

        res.json({ message: "Abonelik başarılı" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Hata oluştu" });
    }
});

app.listen(3000, () => console.log("Server 3000 portunda hazır."));