import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.get("/user/", (request: Request, response: Response) => {
  response.send({
    name: "Akshay",
    phone: 123123,
  });
});
app.listen(3000, () => {
  console.log("Server started");
});
