import React from 'react';
import StockTable from './StockTable';
import Search from '../product/Search.js';
import ProductDisplay from '../product/ProductDisplay';
import OverallSaleGraph from './OverallSaleGraph';
import ProductSaleGraph from './ProductSaleGraph';
import axios from 'axios'
import { Row, Col, Container, Alert, CardDeck } from 'react-bootstrap'

class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            permanentproductList: [],
            productList: [],
            categoryproductList: [],
            deletestatus: false,
        }
    }
    componentWillMount() {
        if (this.state.permanentproductList.length === 0)
            this.getAllProducts()
    }
    getAllProducts() {
        axios.get(' http://localhost:3000/products')
            .then(response => {
                this.setState({
                    productList: response.data,
                    permanentproductList: response.data
                })
            }, error => {
                console.error(error)
            })
    }
    categoryfilter = (type) => {
        this.setState({ category: type })
        if (type === '') {
            this.setState({ productList: this.state.permanentproductList })
        } else {
            var categoryfilterproductList = this.state.permanentproductList.filter(product => product.category.toLowerCase().match(type.toLowerCase()))
            this.setState({ productList: categoryfilterproductList, categoryproductList: categoryfilterproductList })
        }
    }
    search = (word) => {
        if (word === '' && this.state.category === '') {
            this.setState({ productList: this.state.permanentproductList })
        } else {
            if (this.state.category === '') {
                var searchfilterproductList = this.state.permanentproductList.filter(product => product.name.toLowerCase().startsWith(word.toLowerCase()))
                this.setState({ productList: searchfilterproductList })
            } else {
                var searchproductList = this.state.categoryproductList.filter(product => product.name.toLowerCase().startsWith(word.toLowerCase()))
                this.setState({ productList: searchproductList })
            }
        }
    }
    productdisplay = () => {
        if (this.state.productList.length === 0) {
            return (<Alert variant='danger'><h3>  No Product Found !!! , Alter your Search</h3></Alert>)
        } else {
            return this.state.productList.map(product => {
                return (
                    <span key={product.id}>
                        <ProductDisplay
                            id={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            category={product.category}
                            stock={product.stock}
                            rating={product.rating}
                            description={product.description}
                            editproduct={this.editproduct}
                            deleteproduct={this.deleteproduct}>
                        </ProductDisplay>
                        <ProductSaleGraph
                            id={product.id} />
                    </span>
                )
            })
        }
    }
    editproduct = (productId) => {
        this.setState({ id: productId })
        this.props.history.push({ pathname: '/addeditproduct', state: { id: productId } })
    }
    deleteproduct = (id) => {
        axios.delete('http://localhost:3000/products/' + id)
            .then(response => {
                this.getAllProducts()
                this.setState({ deletestatus: true })
                setTimeout(() => {
                    this.setState({ deletestatus: false })
                }, 2000)
            }, error => {
                console.log(error)
            })
    }
    render() {
        return (
            <Container fluid>
                <Row><StockTable /></Row>
                <hr></hr>
                <Row><OverallSaleGraph /></Row>
                <br></br>&nbsp;
                <Row><Col><Search search={this.search} categoryfilter={this.categoryfilter} /></Col></Row>
                {this.state.deletestatus && <Alert variant='danger'><h3>Product Deleted Successfully !!!</h3></Alert>}
                <br></br>
                <CardDeck><Row>{this.productdisplay()}</Row></CardDeck>
            </Container >
        );
    }
}

export default DashBoard;