import App from "./app";

import { AuthRoute } from "./routes/userRoute";

const app = new App([new AuthRoute()]);

app.listen();
