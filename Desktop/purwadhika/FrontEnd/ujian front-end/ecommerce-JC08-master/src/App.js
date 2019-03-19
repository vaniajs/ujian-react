import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Product from './components/productList'
import ManageProduct from './components/admin/manageProduct'
import PageNotFound from './components/pageNotFound'
import ProductDetail from './components/productDetail'
import Cart from './components/cart'
import ScrollToTop from './components/scrollToTop'
import { Route ,withRouter, Switch } from 'react-router-dom' 
import {connect} from 'react-redux'
import {urlApi} from './support/urlApi'
import axios from 'axios';
import cookie from 'universal-cookie'
import { keepLogin, cookieChecked,updateCart } from './1.actions'
import './App.css';

// withRouter => Untuk tersambung ke Reducer dengan connect, 
// tapi di dalam komponen ada routing

const objCookie = new cookie()
class App extends Component {
  state= {cart:[]}

  componentDidMount(){
    var terserah = objCookie.get('userData')
    if(terserah !== undefined){
      this.props.keepLogin(terserah)
    }
    this.getDataCart(terserah)
  }
  
  getDataCart = (a) => {
    axios.get(urlApi+'/users?username='+a)
    .then((res)=>{
      axios.get(urlApi+'/cart?idUser='+res.data[0].id)
      .then((res)=>{
        console.log('masuk')
        this.setState({cart:res.data})
        this.fnQty()
      })
      .catch((err)=>console.log(err))
    })
    .catch((err)=>console.log(err))

  }

  fnQty = () => {
    var total=0
    for(var i=0;i<this.state.cart.length;i++){
      total+= this.state.cart[i].qty
    }
    this.props.updateCart(total) 
  }

  render() {
    if(this.props.cookie){
      return (
        <div>
            <Navbar/>
            <ScrollToTop>
              <Switch>
                  <Route path='/' component={Home} exact/>
                  <Route path='/login' component={Login} exact/>
                  <Route path='/register' component={Register} exact/>
                  <Route path='/product' component={Product} exact/>
                  <Route path='/manage' component={ManageProduct} exact/>
                  <Route path='/cart' component={Cart} exact/>
                  <Route path='/product-detail/:terserah' component={ProductDetail} exact/>
                  <Route path='*' component={PageNotFound} exact/>
              </Switch>
            </ScrollToTop>
        </div>
      )
    };
    return(
      <div>Loading...</div>
    )
  }

}

const mapStateToProps = (state) => {
  return{
    cookie: state.user.cookie
  }
}
export default withRouter(connect(mapStateToProps , {keepLogin,cookieChecked,updateCart})(App));
