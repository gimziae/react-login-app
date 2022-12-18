import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/modules/users";

export default function KakaoRedirectHandler() {
	const dispatch = useDispatch();
	const navigate = useNavigate(); // 주소값을 이동하게 해주는 역할

	useEffect(() => {
		// window.loacation.href : 현재 주소값을 받아오게 된다
		// 주소값의 코드 뒤에 값을 받아오는 값
		// ex) http://localhost:3000/oauth/callback/kakao?code=wY6AtN2lKsx_ooWLQ22-nFQeUYxNfqCh2BsXK7k3FQ8GszxmVvzLdrQ1fLg2weT5zmyZwQopb1QAAAGFI0vN8A
		// 여기서 code 뒤의 값 wY6AtN2lKsx_ooWLQ22-nFQeUYxNfqCh2BsXK7k3FQ8GszxmVvzLdrQ1fLg2weT5zmyZwQopb1QAAAGFI0vN8A 를 받아온다
		// 하위 코드카카오에서 지정한 값이므로 그대로 쓰면돼~
		const CODE = new URL(window.location).searchParams.get("code");
		const GRANT_TYPE = "authorization_code";
		const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
		const KAKAO_CLIENT_ID = "7b6a4c6008b2f50e97c664ebfbbd3920";

		async function loginFetch() {
			const tokenResponse = await fetch(
				`https://kauth.kakao.com/oauth/token?grant_type=${GRANT_TYPE}&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${CODE}`,
				{
					method: "POST",
					headers: {
						"Content-type":
							"application/x-www-form-urlencoded;charset=utf-8",
					},
				}
			);
			if (tokenResponse.status === 200) {
				const tokenData = await tokenResponse.json();
				// console.log("카카오 토큰 데이터", tokenData);

				const userDataResponese = await fetch(
					`https://kapi.kakao.com/v2/user/me`, // 카카오에서 받은 토큰 해독해주는 것
					{
						method: "POST",
						headers: {
							Authorization: `Bearer ${tokenData.access_token}`,
							"Content-type":
								"application/x-www-form-urlencoded;charset=utf-8",
						},
					}
				);
				if (userDataResponese.status === 200) {
					const userData = await userDataResponese.json();
					// console.log(
					// 	"카카오 유저 정보",
					// 	userData.kakao_account.email
					// );
					const loginInfo = {
						type: "kakao",
						email: userData.kakao_account.email,
					};

					// 회원가입 처리
					const registerResponse = await fetch(
						"http://localhost:4000/users/register",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(loginInfo), // 꼭 담아줘야해!! 안그러면 읽히지 않음
						}
					);

					if (registerResponse.status === 200) {
						// 로그인 처리
						dispatch(login(loginInfo));
						navigate("/"); // /로 이동하여 YesLogin 으로 이동
					} else {
						alert("회원 등록 이상");
					}
				} else {
					alert("토큰 발행 오류");
				}
			} else {
				alert("토큰 발행 실패");
			}
		}
		loginFetch();
	}, []);

	// 기능만 하고 그리는 역할이 없으므로 return 값 따로 안줘도됨
}
