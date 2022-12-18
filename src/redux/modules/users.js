// 외우기!!!
// 1) 초기 상태값
const initState = {
	userEmail: " ",
	isLogin: false,
};

// 2) 액션타입 선언
const LOGIN = "users/LOGIN";
const LOGOUT = "users/LOGOUT";

// 3) 액션타입 생성함수 (어떻게 사용할 지)
export function login(loginInfo) {
	return {
		type: LOGIN, // 어떤 액션인지 알려주는 설정
		payload: loginInfo, // 전달할 인자를 담아준다
	};
}

export function logout() {
	return {
		type: LOGOUT,
	};
}

// 4) 리듀서 생성
// 초기값과 함수를 인자로 전달해준다
export default function users(state = initState, action) {
	// 스위치문 생성
	switch (action.type) {
		case LOGIN:
			return {
				...state, // 유지할 값들 리턴
				userEmail: action.payload.email,
				isLogin: true,
			};
		case LOGOUT:
			return {
				...state,
				isLogin: false,
				userEmail: "", // 둘 다 초기화 해준다
			};
		default:
			return state;
	}
}
