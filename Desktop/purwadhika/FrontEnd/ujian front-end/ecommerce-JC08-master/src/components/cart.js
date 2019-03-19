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

    btnDelete = () => {
        
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
                        <td><button onClick={this.btnDelete}>Delete</button></td>
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

