import React from 'react';
import Search from './Search'
import ProductDisplay from './ProductDisplay'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { CardDeck, Container, Col, Row, Button, Alert } from 'react-bootstrap'
class AllProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            permanentproductList: [],
            productList: [],
            categoryproductList: [],
            deletestatus: false,
            category: ''
        }
    }
    componentWillMount() {
        if (this.state.permanentproductList.length === 0)
            this.getAllProducts()
    }
    getAllProducts() {
        axios.get(' http://localhost:3000/products')
            .then(response => {
                this.setState({ productList: response.data, permanentproductList: response.data })
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
            return (<h3 className='error'>  No Product Found !!! , Alter your Search</h3>)
        } else {
            return this.state.productList.map(product => {
                return (
                    <ProductDisplay
                        key={product.id}
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
                console.log('Deleted ' + id)
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
                <Row >
                    <Link className="addproductbutton ml-auto " to='/addeditproduct'><Button variant='primary'>Add Product</Button></Link>
                </Row>
                <br></br>
                <Row><Col><Search search={this.search} categoryfilter={this.categoryfilter} /></Col></Row>
                {this.state.deletestatus && <Alert variant='danger'><h3>Product Deleted Successfully !!!</h3></Alert>}
                <br></br>
                <CardDeck><Row>{this.productdisplay()}</Row></CardDeck>
            </Container>
        );
    }
}

export default withRouter(AllProduct);