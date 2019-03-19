import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { urlApi } from './../support/urlApi';

class Cart extends React.Component {
    state = { cart: [] }

    componentDidMount() {
        this.getCartList()
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

    btnCheckout = () => {
        axios.get(urlApi+'/cart?idUser='+this.props.id)
        .then((res)=>{
            axios.post(urlApi+'/histori',{
            idUser: res.data[0].idUser,
            item: {idProduk:res.data[0].idProduk,qty:res.data[0].qty,nama:res.data[0].namaProduk},
            
        })
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))

        })
    }

    renderJsx = () => {
        var jsx = this.state.cart.map((val) => {
            return (
                
                <tbody>
                    <tr>
                        <td>{val.id}</td>
                        <td><img src={val.img} width='100px'/></td>
                        <td>{val.nama}</td>
                        <td>Rp. {val.harga}</td>
                        <td>{val.qty} pcs</td>
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
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <td >Invoice No</td>
                            <td></td>
                            <td>Product Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total</td>
                        </tr>
                    </thead>
                    {this.renderJsx()}
                </table>
                <p>Total Harga Rp. <b>{this.getTotalHarga()}</b></p>
                <button className="btn btn-primary" onClick={this.btnCheckout}> CHECKOUT </button>
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

