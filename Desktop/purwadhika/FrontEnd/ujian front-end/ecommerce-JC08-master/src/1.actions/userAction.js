import axios from 'axios'
import {urlApi} from './../support/urlApi'
import cookie from 'universal-cookie'

const objCookie = new cookie()
export const onLogin = (paramUsername,password) => { 
    return(dispatch)=>{
        // INI UNTUK MENGUBAH LOADING MENJADI TRUE
        dispatch({
            type: 'LOADING',
        })

        // GET DATA DARI FAKE API JSON SERVER
        axios.get(urlApi + '/users',{
            params:{username :paramUsername,
                    password}})
        
        // KALO BERHASIL NGE GET, DIA MASUK THEN
        .then((res) => {
            console.log(res)

        // IF USERNAME DAN PASSWORD SESUAI MAKA RES.DATA ADA ISINYA
            if(res.data.length > 0){
                dispatch(
                    {
                        type : 'LOGIN_SUCCESS',
                        payload : res.data[0]
                        // {
                        //      username : res.data[0].username,
                        //      role : res.data[0].role,
                        //      id : res.data[0].id
                        // }
                    }
                )
            }else{
                dispatch({
                    type : 'USER_NOT_FOUND',
                })
            }
            
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
   
}


export const keepLogin = (cookie) => {
    return(dispatch) => {
        axios.get(urlApi + '/users',{params : {username : cookie}})
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0]
                        // {
                        //      username : res.data[0].username,
                        //      role : res.data[0].role
                        // }
                })
            }
        })
        .catch((err) => console.log(err))
    }
} 

export const cookieChecked = () => {
    return{
        type: 'COOKIE_CHECKED'
    }
}
export const resetUser = () => {
    return {
        type : 'RESET_USER'
    }
}

export const userRegister = (a,b,c,d) => { // userRegister('fikri')
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {username : a, password : b, email : c, phone : d}
        // Mengecek Username availablity

        axios.get(urlApi +'/users?username=' + a)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            }
            else{
                axios.post(urlApi +'/users',newData)
                .then((res) => dispatch({
                    type : 'LOGIN_SUCCESS',
                    //Mengirim Payload dalam bentuk Object
                    //payload : { username : newData.username, id : res.data.id, email : c} 
                    payload : a
                },
                    // Parameter Ketiga agar cookie bisa diakses di semua komponen
                    objCookie.set('userData',a,{path : '/'}),
                ))
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
}

export const loginWithGoogle = (email) => {
    return(dispatch) => {
        axios.get(urlApi + '/users?username=' + email)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type :'LOGIN_SUCCESS',
                    payload : res.data[0]
                },
                    objCookie.set('userData',email,{path : '/'})
                )
            }else{
                axios.post(urlApi + '/users', {username : email,role :'user'})
                .then((res) => {
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                    },
                        objCookie.set('userData',email,{path : '/'})
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


export const AddToCart=(idProduk,idUser,nama,harga,img)=>{
    return(dispatch)=>{
        axios.get(urlApi+'/cart?idUser='+idUser+'&idProduk='+idProduk)
        .then((res)=>{
            if(res.data.length>0){
                // var newQty = res.data[0].qty+1
                    axios.put(urlApi+'/cart/'+res.data[0].id,{
                        idProduk,idUser,nama,harga,img,qty:res.data[0].qty+1
                    })
                    .then((res)=>{
                        console.log(res)
                        // return{
                        //     type: "UPDATE_CART",
                        //     payload: res.data[0].qty
                        // }
                    })
                    .catch((err)=>console.log(err))
            }
            else{
                axios.post(urlApi+'/cart',{
                    idProduk,idUser,nama,harga,img,qty:1
                })
                .then((res)=>{
                    return{
                        type:"ADD_CART"
                    }

                })
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=>console.log(err))
        // ,{
        //     idProduk,idUser,nama,harga,img,qty:
        // }
        
    }
}

export const AddToCart2=(idProduk,idUser,nama,harga,img,qtyNew)=>{
    return(dispatch)=>{
        axios.get(urlApi+'/cart?idUser='+idUser+'&idProduk='+idProduk)
        .then((res)=>{
            if(res.data.length>0){
                // var newQty = res.data[0].qty+1
                    axios.put(urlApi+'/cart/'+res.data[0].id,{
                        idProduk,idUser,nama,harga,img,qty:res.data[0].qty+qtyNew
                    })
                    .then((res)=>{
                        console.log('INI ADD TO CART 2')
                        // return{
                        //     type: "UPDATE_CART",
                        //     payload: res.data[0].qty
                        // }
                    })
                    .catch((err)=>console.log(err))
            }
            else{
                axios.post(urlApi+'/cart',{
                    idProduk,idUser,nama,harga,img,qty:qtyNew
                })
                .then((res)=>{
                    return{
                        type:"ADD_CART"
                    }

                })
                .catch((err)=>console.log(err))
            }
        })
        .catch((err)=>console.log(err))
        // ,{
        //     idProduk,idUser,nama,harga,img,qty:
        // }
        
    }
}

export const updateCart = (param) => {
    return{
        type: 'CART_QTY',
        payload: param
    }
}



