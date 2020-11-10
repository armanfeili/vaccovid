import { timers } from "./app/src/utils/timer";
import { createConnection } from "typeorm";

(async () => {
    const connection = await createConnection();
    timers();
})();
