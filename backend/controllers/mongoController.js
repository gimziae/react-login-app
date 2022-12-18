const mongoClient = require("./mongoConnect");
const _client = mongoClient.connect(); // 필요할 때만 풀어쓰기 위해 _ 붙혀준다.

// 로그인 컨트롤러
const Users = {
	// 회원가입 함수
	register: async (registerInfo) => {
		const client = await _client;
		const db = client.db("login").collection("users");
		// 중복회원 ck
		const duplicated = await db.findOne({ email: registerInfo.email });
		// 중복회원이 없다면
		if (!duplicated) {
			const registerUser = {
				type: registerInfo.type,
				email: registerInfo.email,
			};

			const registerResult = await db.insertOne(registerUser);

			if (registerResult.acknowledged) {
				return {
					duplicated: false,
					msg: "회원가입 완료",
				};
			} else {
				throw new Error("DB 문제 발생");
			}
		} else {
			return {
				duplicated: true,
				msg: "이미 가입된 회원입니다.",
			};
		}
	},

	// 로그인 함수 구현(loginInfo :  받아온 값)
	login: async (loginInfo) => {
		const client = await _client; // 사용하기 위해 풀어줌
		const db = client.db("login").collection("users");
		// 찾는 함수
		// 몽고데이터에 있는 이메일값과 입력한 이메일 값이 같으면 찾아라!
		const findUser = await db.findOne({ email: loginInfo.email });
		// 해당 유저를 찾은 경우
		if (findUser) {
			// 찾은 유저의 비밀번호값과 입력한 비밀번호값이 같은 경우
			if (findUser.password === loginInfo.password) {
				// 프론트에 값 전달
				return {
					result: true,
					email: findUser.email,
					msg: "로그인 성공!!",
				};
			} else {
				// 비밀번호가 일치하지 않을 경우
				return {
					result: false,
					msg: "비밀번호가 다릅니다!",
				};
			}
		} else {
			// 데이터에 일치하는 이메일값이 없을 경우
			return {
				result: false,
				msg: "해당 이메일을 찾을 수 없습니다.",
			};
		}
	},
};

// 내보내기
module.exports = Users;
