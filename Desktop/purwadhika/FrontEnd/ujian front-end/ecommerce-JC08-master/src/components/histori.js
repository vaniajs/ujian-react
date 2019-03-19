import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { urlApi } from '../support/urlApi';

class Histori extends React.Component {
    state = { histori: [], Detail: false, item:[] }

    componentDidMount() {
        this.getDataHistory()
    }

    getDataHistory = () => {
        Axios.get(urlApi + '/histori?idUser=5')
            .then((res) => {
                this.setState({ histori: res.data })
                this.setState({item:res.data.item})
            })
            .catch((err) => { console.log(err) })
    }

    btnDetail = () => {
        this.setState({ Detail: true })
    }

    btnClose = () => {
        this.setState({ Detail: false })

    }

    renderJsx = () => {
        var jsx = this.state.histori.map((val) => {
            return (
                <tr>
                    <td>{val.id}</td>
                    <td>{val.tanggal}</td>
                    <td>{val.item.length}</td>
                    <td><button className="btn btn-primary" onClick={this.btnDetail}>Detail</button></td>
                </tr>
            )
        })
        return jsx
    }

    renderDetail = () => {
        var jsx = this.state.histori.map((val) => {
            for(var i = 0;i<val.item.length;i++){
                 return(   
                 <tr>
                        <td><img src={val.item[i].img} width='60px'/></td>
                        <td>{val.item[i].nama}</td>
                        <td>{val.item[i].qty}</td>
                        <td>{val.item[i].harga * val.item[i].qty}</td>
                        <td><button className="btn btn-primary" onClick={this.btnClose}>Close</button></td>
                    </tr>
                )
                
            }
        })
        return jsx
    }

    render() {
        return (
            <div className="container justify-content-center">
                <h5>Transaction History</h5>
                        <br />
                        <table style={{ padding: '10px' }}>
                            {this.state.Detail===true?
                            <thead>
                                <td>Img</td>
                                <td>Product</td>
                                <td>Total</td>
                            </thead>
                            :<thead>
                            <td>No</td>
                            <td>Date</td>
                            <td>Item</td>
                        </thead>
                            }
                            
                            {this.state.Detail===true?
                            this.renderDetail()
                            :this.renderJsx()
                            }
                        </table>
                  

            </div>
        )



    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id
    }
}
export default connect(mapStateToProps)(Histori)