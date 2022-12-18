// 컨트롤러를 사용할 라우터 생성!
const express = require("express"); // 라우터가 익스프레스 내부에 있는 기능이므로 불러와야함
const router = express.Router(); // 라우터 불러오기

const db = require("../controllers/mongoController"); // 사용할 컨트롤러 불러오기

router.post("/login", async (req, res) => {
	const loginInfo = req.body; // 바디로 부터 받아옴
	const result = await db.login(loginInfo); // 받아온 값을 login 함수의 값으로 넣어조
	res.send(JSON.stringify(result)); // 프론트 단에 보내는 것 이므로 json 형태로 변환하여 보내준다.
});

router.post("/register", async (req, res) => {
	const registerInfo = req.body;
	const result = await db.register(registerInfo);
	res.send(JSON.stringify(result));
});

module.exports = router;
