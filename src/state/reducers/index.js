import { combineReducers } from "redux";
import NavBarSelectReducer from './NavBarSelectReducer'
import UserReducer from './UserReducers'
import CurrentProductReducer from './CurrentProductUploadReducer'
import ShowMessageReducer from './ShowMessageReducer'
const reducer = combineReducers({
    NavBarSelectReducer:NavBarSelectReducer,
    UserReducer:UserReducer,
    CurrentProductReducer:CurrentProductReducer,
    ShowMessageReducer:ShowMessageReducer

})

export default reducer