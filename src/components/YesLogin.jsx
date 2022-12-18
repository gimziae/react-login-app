import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/modules/users";

export default function YesLogin() {
	const userEmail = useSelector((state) => state.users.userEmail);
	const dispatch = useDispatch();

	return (
		<>
			<h1>{userEmail} 님 로그인 되었습니다!</h1>
			<button onClick={() => dispatch(logout())}>로그아웃</button>
		</>
	);
}
