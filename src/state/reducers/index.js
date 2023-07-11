import { combineReducers } from "redux";
import NavBarSelectReducer from './NavBarSelectReducer'
import UserReducer from './UserReducers'
const reducer = combineReducers({
    NavBarSelectReducer:NavBarSelectReducer,
    UserReducer:UserReducer
})

export default reducer