import { combineReducers } from "redux";
import NavBarSelectReducer from './NavBarSelectReducer'
import UserReducer from './UserReducers'
import CurrentProductReducer from './CurrentProductUploadReducer'
const reducer = combineReducers({
    NavBarSelectReducer:NavBarSelectReducer,
    UserReducer:UserReducer,
    CurrentProductReducer:CurrentProductReducer
})

export default reducer