import React, { useRef } from "react"; // 입력값 참조하기 위해
import { useDispatch } from "react-redux";
import { login } from "../redux/modules/users";

export default function Login() {
	// 카카오 로그인
	const KAKAO_CLIENT_ID = "7b6a4c6008b2f50e97c664ebfbbd3920"; // REST API 키
	const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
	const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

	const userEmailInput = useRef();
	const userPwInput = useRef();
	const dispatch = useDispatch();

	// 로그인 처리 함수
	async function loginUser() {
		// 받아올 로그인 정보 객체 생성
		const loginInfo = {
			email: userEmailInput.current.value,
			password: userPwInput.current.value,
		};

		// 유효성 검사
		// 값이 들어 온다면 로그인 처리
		if (loginInfo.email !== "" && loginInfo.password !== "") {
			const loginResponse = await fetch(
				"http://localhost:4000/users/login",
				{
					// 기본 설정
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(loginInfo), // 보낼 값
				}
			);
			if (loginResponse.status === 200) {
				const result = await loginResponse.json();
				console.log(result);

				// 받아온 result 객체의 값 중 result값이 true일 경우
				if (result.result) {
					dispatch(login(result));
				}
				// 로그인 처리
			} else {
				throw new Error("로그인 실패");
			}
		} else {
			// 값이 들어오지 않은 경우
			alert("이메일 또는 비밀번호를 입력해 주세요!!");
		}
	}

	return (
		<>
			<span>EMAIL</span>
			<input ref={userEmailInput} />
			<br />
			<span>PASSWORD</span>
			<input ref={userPwInput} />
			<br />
			{/* 버튼 클릭 시 로그인 처리 함수 실행! */}
			<button
				onClick={() => {
					loginUser();
				}}>
				로그인
			</button>
			<br />
			<a href={KAKAO_AUTH_URL}>카카오 로그인</a>
		</>
	);
}
