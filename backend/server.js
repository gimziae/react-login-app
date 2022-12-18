const express = require("express");
const cors = require("cors");

const PORT = 4000;

const app = express();

// bodyparse 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cors 설정
app.use(cors());

const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.listen(PORT, () => {
	console.log(`로그인 서버가 ${PORT}번에서 실행 중 입니다!!`);
});
