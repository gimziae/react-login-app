import { combineReducers } from "redux"; // 합치는 거
import users from "./modules/users"; // 사용할 리듀서

// 내보내기
export default combineReducers({ users });
