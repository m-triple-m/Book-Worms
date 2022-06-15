const express = require("express");
const app = express();
const cors = require("cors");

const userRouter = require("./routers/userRouter").router;
const novelRouter = require("./routers/novelRouter").router;
const utilRouter = require("./routers/utils").router;
const queryRouter = require("./routers/queryRouter").router;
const checkoutRouter = require("./routers/checkoutRouter").router;

const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const connectedUsers = {};

const io = new Server(httpServer, {
  cors: { origin: ["http://localhost:3000"] },
});

io.on("connection", (socket) => {
  console.log("client connected");

  io.on("add", (userid) => {
    connectedUsers[userid] = socket.id;
  });

  io.on("checkuser", (userid) => {
    io.emit(
      "isonline",
      connectedUsers[userid]
        ? { status: online, socketid: connectedUsers[userid] }
        : { status: offline }
    );
  });
  // on function is used for receieving the event
  socket.on("sendmsg", (data) => {
    console.log(data);
    data.sent = false;
    socket.broadcast.emit("recmsg", data);
  });
});

// app.listen(5000,()=>{

//          console.log("listening 5000...");
// });

const stripe_sk =
  "sk_test_51L1Wf4SG8drK0Wt5r9B58VpCVuppBvRGQciPAEEoKGtMEtRWr9HpGdBK8ulyJuckoVaJcaUSPDeYibVSIi89rGgj006q8dj8ZW";
const stripe = require("stripe")(stripe_sk);

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.static("./uploads"));
app.use(express.json());
// app.use(cors({origin:['http://localhost:3000'],}));

app.use("/user", userRouter);

app.use("/novel", novelRouter);
app.use("/util", utilRouter);
app.use("/query", queryRouter);
app.use("/checkout", checkoutRouter);

app.post("/create-payment-intent", async (req, res) => {
  const data = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: "inr",
  });
  res.status(200).json(paymentIntent);
});

app.get("/", (req, resp) => {
  resp.send("home");
});

httpServer.listen(5000, () => {
  console.log("server started");
});
