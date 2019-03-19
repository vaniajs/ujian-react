const INITIAL_STATE = {qty:0}

export default (state=INITIAL_STATE,action) => {
    switch(action.type){
        case 'UPDATE_CART':
            return{...INITIAL_STATE , qty: action.payload}
        case 'CART_QTY':
            return{...INITIAL_STATE,qty: action.payload}
        // case 'USER_NOT_FOUND':
        //      return{...INITIAL_STATE , error : 'Username atau password salah', cookie:true}
        // case 'SYSTEM_ERROR':
        //     return {...INITIAL_STATE , error : 'System Error', cookie:true} 
        // case 'RESET_USER' :
        //     return INITIAL_STATE
        // case 'COOKIE_CHECKED' :
        //     return {...state, cookie:true}
        // case 'USERNAME_NOT_AVAILABLE':
        //     return {...INITIAL_STATE, error : 'Username not available', cookie:true}
        default :
            return state
    }
}