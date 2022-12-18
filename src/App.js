import { useSelector } from "react-redux"; // 함수에 따라 페이지에 보여지는 걸 바꿔주기위해
import { Route, Routes } from "react-router-dom";
import "./App.css";
import YesLogin from "./components/YesLogin";
import Login from "./components/Login";
import KakaoRedirectHandler from "./components/KakaoRedirectHandler";

function App() {
	const isLogin = useSelector((state) => state.users.isLogin);
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={isLogin ? <YesLogin /> : <Login />} />
				<Route
					path="/oauth/callback/kakao"
					element={<KakaoRedirectHandler />}
				/>
			</Routes>
		</div>
	);
}

export default App;
