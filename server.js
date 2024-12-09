import express from "express";
const app = express();
import data from "./data.js";

app.get("/:id", (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message:
        "Please check the question number or the question does not exist.",
    });
  }
  if (!data[id]) {
    return res.status(404).json({
      message: "The question does not exist.",
    });
  }
  res.send(data[id]);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
