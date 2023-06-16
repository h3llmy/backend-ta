import cron from "node-cron";
import { notification } from "../controller/orderController.js";

export default function scheduler() {
  console.log("\x1b[34m%s\x1b[0m", "Scheduler Running...");

  // send email to admin when order dedline is -1 day
  cron.schedule("0 9 * * *", async () => {
    notification();
  });
}
