
// const path = require("path");
// app.use(express.static(path.join(__dirname,"public")))
// Router-level middleware for `userRouter`
const userRouter = require("./Router/UserRouter")

app.use("/api/user", userRouter);

