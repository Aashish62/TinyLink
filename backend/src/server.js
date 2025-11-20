import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../src/config/db.js";
import app from "./app.js";

connectDB();

if(process.env.NODE_ENV !== "production"){
const port = process.env.PORT || 5050;
app.listen(port, () => console.log(`Server started on port : ${port}`));
}

export default app;