import { timers } from "./app/src/utils/timer";
import { createConnection } from "typeorm";

(async () => {
    await createConnection();
    timers();
})();
