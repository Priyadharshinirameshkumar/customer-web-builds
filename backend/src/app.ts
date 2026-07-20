import express from "express";
import cors from "cors";
import morgan from "morgan";
import { notFound } from "./middleware/notFound";
import bookingRoutes from "./routes/booking.routes";
import { errorHandler } from "./middleware/errorHandler";
import websitePlanRoutes from "./routes/websitePlan.routes";
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Customer Web Builds API Running"
    });
});
app.use("/api/bookings", bookingRoutes);
app.use("/api/website-plan", websitePlanRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;