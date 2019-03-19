import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { urlApi } from './../support/urlApi';

class Cart extends React.Component {
    state = { cart: [], checkout:[], editAngka:true , angka:[]}

    componentDidMount() {
        this.getCartList()
        this.getTotalHarga()
    }

    getCartList = () => {
        axios.get(urlApi + '/cart?userId=' + this.props.id)
            .then((res) => {
                console.log(res)
                this.setState({ cart: res.data })
            })
            .catch((err) => console.log(err))  
    }

    btnDelete = (a) => {
        axios.delete(urlApi+'/cart/' + a)
        .then((res)=>{
            // this.setState({cart:res.data})
            this.getCartList()
        })
        .catch((err)=>console.log(err))
    }

    getTotalHarga = () => {
        var harga=0
        for(var i = 0;i<this.state.cart.length;i++){
            harga += this.state.cart[i].harga*this.state.cart[i].qty
        }
        return harga
    }

    qtyRemove = (a) => {
        return(this.refs.editJumlah.value === 0 ?
            alert('msk')
        // this.getTotalHarga()
        // this.btnDelete(a)
        :null
        )
    }

    btnChange = () => {
        var qty = this.refs.editJumlah.value
        
    }

    btnCheckout = () => {
        swal ("THANKS FOR PURCHASING","Your items will be delivered soon","success")

        axios.get(urlApi+'/cart?idUser='+this.props.id)
        .then((res)=>{
            this.setState({cart:res.data})
            var d = new Date()
            var tgl = d.getDate()
            var bln = 'Maret'
            var year = '19'
            axios.post(urlApi+'/histori',{idUser: this.props.id ,tanggal: `${tgl}-${bln}-${year}`,
                item: this.state.cart})
            .then((res)=>{
                axios.delete(urlApi+'/cart?idUser='+this.props.id)
                .then((res)=>{
                    this.setState({cart:res.data})
                })
                .catch((err)=>console.log(err))
            })
            .catch((err)=>console.log(err))
        })
        .catch((err)=>console.log(err))
        //.then((res)=>{
            // this.setState({this.state.checkout:res.data})
            // axios.post(urlApi+'/histori',{
            // idUser: checkout[0].idUser,
            // item: {idProduk:res.data[0].idProduk,qty:res.data[0].qty,nama:res.data[0].namaProduk},
            
        // })

        }

        btnPlus = () => {

        }

        btnMin = () => {
            // this.setState({editAngka:true,angka:this.refs.editJumlah.value+1})
            // return(
            // this.refs.editJumlah.value===this.state.angka
            // )

        }

    renderJsx = () => {
        var jsx = this.state.cart.map((val) => {
            return (
                <tbody>
                    <tr>
                        {/* <td>{val.id}</td> */}
                        <td><img src={val.img} width='100px'/></td>
                        <td>{val.nama}</td>
                        <td>Rp. {val.harga}</td>
                        {/* {this.state.editAngka===true?
                            <td><button onClick={()=>this.btnMin(val.qty)}>-</button><input type="number" ref='editJumlah' defaultValue={val.qty} style={{width:'30px'}}/><button>+</button></td>
                            :
                            <td><button onClick={()=>this.btnMin(val.qty)}>-</button> {val.qty} <button>+</button></td>
                        } */}
                        <td><button onClick={this.btnMin}>-</button><input type="number" ref='editJumlah' defaultValue={val.qty} style={{width:'30px'}} onChange={this.btnChange}/><button onClick={this.btnPlus}>+</button></td>

                        <td><b>Rp {val.qty * val.harga}</b></td>
                        <td><button onClick={()=>this.btnDelete(val.id)}>Remove</button></td>
                    </tr>
                </tbody>
                
            )
        })
        return jsx
    }

    render() {
        return (
            // {
            //     this.state.redirect===true?
            //     null:
            //     null
            // }
            <div className="container">
                {
                    this.state.cart.length === 0 ?
                    <h5 className="text-center" style={{color:"red"}}>Your cart is empty. Continue Shopping</h5>
                    : 
                    <table>
                    <thead>
                        <tr>
                            {/* <td >No</td> */}
                            <td></td>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total</td>
                            </tr>
                    </thead>
                    {this.renderJsx()}
                    <h5>Total Price Rp. <b>{this.getTotalHarga()}</b></h5>
                    <button className="btn btn-primary" onClick={this.btnCheckout}> CHECKOUT </button>
                </table>
                }
                
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        id: state.user.id,

    }
}
export default connect(mapStateToProps)(Cart);

