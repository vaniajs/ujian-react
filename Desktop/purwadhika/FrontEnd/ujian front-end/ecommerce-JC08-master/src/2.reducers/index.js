import { combineReducers } from 'redux'
import User from './userGlobal'
import Product from './userProduct'

export default combineReducers({
    user : User,
    product : Product
})