import app from "./app";
import { PORT } from "./config/env";
import { verifySmtpConnection } from "./config/mailer";
import { seedSlots } from "./utils/seedSlots";
import { seedAdmin } from "./utils/seedAdmin";

const startServer = async () => {
  await seedSlots();
  await seedAdmin();
  await verifySmtpConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
