import React from 'react';
import StockTableContent from './StockTableContent';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import StockGraph from './StockGraph';
import { Row, Container, Col, Table,Card } from 'react-bootstrap'
class StockTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productList: [],
            id: 0,
            stock: 0,
            updatestock: false
        }
    }
    componentWillMount() {
        this.getproducts()
    }
    getproducts() {
        axios.get('http://localhost:3000/products')
            .then(response => {
                var unorderproductList = []
                unorderproductList = response.data
                unorderproductList.sort(function (a, b) { return a.stock - b.stock })
                this.setState({ productList: unorderproductList, updatestock: !this.state.updatestock })
            }, Error => {
                console.log(Error.error)
            })
    }

    incStock = (productId) => {
        axios.get('http://localhost:3000/products/' + productId)
            .then(response => {
                axios.patch('http://localhost:3000/products/' + productId, { 'stock': parseInt(response.data.stock) + 1 })
                setTimeout(() => { this.getproducts() }, 50)
            }, error => {
                console.log(error.error)
            })
    }
    decStock = (productId) => {
        axios.get('http://localhost:3000/products/' + productId)
            .then(response => {
                axios.patch('http://localhost:3000/products/' + productId, { 'stock': parseInt(response.data.stock) - 1 })
                setTimeout(() => { this.getproducts() }, 50)
            }, error => {
                console.log(error.error)
            })
    }
    updatepdt = (productId) => {
        this.setState({ id: productId })
        this.props.history.push({ pathname: '/addeditproduct', state: { id: productId } })
    }
    deletepdt = (productId) => {
        axios.delete('http://localhost:3000/products/' + productId)
            .then(response => {
                console.log('Deleted ' + productId)
                this.getproducts()
            }, error => {
                console.log(error)
            })
    }
    stocktablecontent = () => {
        return this.state.productList.map(product => {
            return (
                <StockTableContent
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    stock={product.stock}
                    incrementStock={this.incStock}
                    decrementStock={this.decStock}
                    detetepdt={this.deletepdt}
                    updatepdt={this.updatepdt}
                ></StockTableContent>
            )
        })
    }
    render() {
        return (<Container fluid>
            <Row><Col xs={12} md={6} lg={6} >
                <Card className="table-wrapper-scroll-y my-custom-scrollbar">
                    <Table responsive="xl" hover='true' bordered='true'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Stock</th>
                                <th colSpan='2'>Manage Stock</th>
                                <th>Update</th>
                                <th>Required</th>
                            </tr>
                        </thead>
                        <tbody >
                            {this.stocktablecontent()}
                        </tbody>
                    </Table>
                </Card></Col>
                <Col xs={12} md={6} lg={6}>
                    <StockGraph stockupdated={this.state.updatestock} /></Col>
            </Row>
        </Container>);
    }
}

export default withRouter(StockTable);