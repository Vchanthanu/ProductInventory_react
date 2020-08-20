import React from 'react';
import Search from './Search'
import ProductDisplay from './ProductDisplay'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import { CardDeck, Container, Col, Row, Button, Alert, Card, Table } from 'react-bootstrap'
import TableDisplay from './TableDisplay'
class AllProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            permanentproductList: [],
            productList: [],
            categoryproductList: [],
            deletestatus: false,
            category: '',
            sortby: 'atoz',
            view: 'card',
            date: ''
        }
    }
    componentWillMount() {
        if (this.state.permanentproductList.length === 0)
            this.getAllProducts()
    }
    getAllProducts() {
        axios.get(' http://localhost:3000/products')
            .then(response => {
                var productData = response.data
                productData.sort(this.compare)
                this.setState({ productList: productData, permanentproductList: productData })
            }, error => {
                console.error(error)
            })
    }

    compare = (a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        let comparison = 0;
        if (nameA > nameB) {
            comparison = 1;
        } else if (nameA < nameB) {
            comparison = -1;
        }
        return this.state.sortby === 'atoz' ? comparison : comparison * -1;
    }

    dosort = (productListForSorting) => {
        var sortedList = productListForSorting
        if (this.state.sortby === 'atoz' || this.state.sortby === 'ztoa') {
            sortedList = productListForSorting.sort(this.compare)
            return sortedList
        }
        if (this.state.sortby === 'lowstock') {
            sortedList = productListForSorting.sort(function (a, b) { return a.stock - b.stock })
            return sortedList
        }
        if (this.state.sortby === 'highstock') {
            sortedList = productListForSorting.sort(function (a, b) { return b.stock - a.stock })
            return sortedList
        }
        if (this.state.sortby === 'lowprice') {
            sortedList = productListForSorting.sort(function (a, b) { return a.price - b.price })
            return sortedList
        }
        if (this.state.sortby === 'highprice') {
            sortedList = productListForSorting.sort(function (a, b) { return b.price - a.price })
            return sortedList
        }
        if (this.state.sortby === 'lowrating') {
            sortedList = productListForSorting.sort(function (a, b) { return parseFloat(a.rating) - parseFloat(b.rating) })
            return sortedList
        }
        if (this.state.sortby === 'highrating') {
            sortedList = productListForSorting.sort(function (a, b) { return parseFloat(b.rating) - parseFloat(a.rating) })
            return sortedList
        }
        return sortedList
    }

    categoryfilter = (type) => {
        this.setState({ category: type })
        setTimeout(() => { this.dofilter() }, 100)
    }
    dofilter = () => {
        if (this.state.category === '') {
            if (this.state.date === '') {
                var sortedList = this.dosort(this.state.permanentproductList)
                this.setState({ productList: sortedList, categoryproductList: sortedList })
            } else {
                // let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
                // var tempDate = new Date();
                // var date = `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth() + 1)}-${formatTwoDigits(tempDate.getDate())}`
                var datebasedproduct = this.state.permanentproductList.filter(product => product.regDate === this.state.date)
                var sortedList = this.dosort(datebasedproduct)
                this.setState({ productList: sortedList, categoryproductList: sortedList })
            }
        } else {
            if (this.state.date === '') {
                var categoryfilterproductList = this.state.permanentproductList.filter(product => product.category.toLowerCase().match(this.state.category.toLowerCase()))
                categoryfilterproductList = this.dosort(categoryfilterproductList)
                this.setState({ productList: categoryfilterproductList, categoryproductList: categoryfilterproductList })
            } else {
                var categoryfilterproductList = this.state.permanentproductList.filter(product => product.category.toLowerCase().match(this.state.category.toLowerCase()))
                var datebasedproduct = categoryfilterproductList.filter(product => product.regDate === this.state.date)
                categoryfilterproductList = this.dosort(datebasedproduct)
                this.setState({ productList: categoryfilterproductList, categoryproductList: categoryfilterproductList })
            }
        }
    }
    search = (word) => {
        if (word === '' && this.state.category === '') {
            this.setState({ productList: this.state.categoryproductList })
        } else {
            var searchproductList = this.state.categoryproductList.filter(product => product.name.toLowerCase().startsWith(word.toLowerCase()))
            this.setState({ productList: searchproductList })
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
    contentDisplay = () => {
        return this.state.productList.map(product => {
            return (
                <TableDisplay
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    companyName={product.companyName}
                    name={product.name}
                    price={product.price}
                    category={product.category}
                    stock={product.stock}
                    rating={product.rating}
                    offer={product.offer}
                    regDate={product.regDate}
                    description={product.description}
                    editproduct={this.editproduct}
                    deleteproduct={this.deleteproduct}>
                </TableDisplay>)
        })
    }
    tabledisplay = () => {
        if (this.state.productList.length === 0) {
            return (<h3 className='error'>  No Product Found !!! , Alter your Search</h3>)
        } else {
            return (
                <Col xs={12} md={12} lg={12} className='justify-content-center'>
                    <Card className="table-wrapper-scroll-y product-scrollbar">
                        <Table responsive="xl" hover='true' bordered='true' >
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Company Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Rating</th>
                                    <th>Offer</th>
                                    <th>Reg.Date</th>
                                    <th colSpan='2'>Description</th>
                                    <th colSpan='2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.contentDisplay()}
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            )
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
    getSortby = (event) => {
        this.setState({ sortby: event.target.value })
        setTimeout(() => { this.dofilter() }, 300)
    }
    getView = (event) => {
        this.setState({ view: event.target.value })
    }
    getDate = (event) => {
        this.setState({ date: event.target.value })
        console.log(event.target.value)
        setTimeout(() => { this.dofilter() }, 300)
    }
    render() {
        return (
            <Container fluid>
                <Row >
                    <Link className="addproductbutton ml-auto " to='/addeditproduct'><Button variant='primary'>Add Product</Button></Link>
                </Row>
                <br></br>
                <Row className='mx-auto'>
                    <Col xl={4} md={4} xs={12}><Row className='mx-auto'><Col><label htmlFor="sort"><b>Sort By :</b></label>&nbsp;&nbsp;
                        <select id="sort" name="sort" onChange={this.getSortby}>
                            <option value="atoz">Title: A to Z</option>
                            <option value="ztoa">Title: Z to A</option>
                            <option value="lowstock">Stock: Low to High</option>
                            <option value="highstock">Stock: High to Low</option>
                            <option value="lowprice">Price: Low to High</option>
                            <option value="highprice">Price: High to Low</option>
                            <option value="lowrating">Rating :Low to High</option>
                            <option value="highrating">Rating :High to Low</option>
                        </select></Col></Row></Col>
                    <Col xl={4} md={4} xs={12}>
                        <label htmlFor="dateofpdt"><b>Date of Registration</b></label>&nbsp;&nbsp;
                            <input type="date" onChange={this.getDate}></input>
                    </Col>
                    <Col xl={4} md={4} xs={12}><b><lable>View :</lable></b>&nbsp;&nbsp;
                        <input type="radio" id="card" name="card" onClick={this.getView} checked={this.state.view === 'card'} value='card'></input>
                        <label htmlFor="card">Card View</label>&nbsp;&nbsp;
                        <input type="radio" id="table" name="table" onClick={this.getView} checked={this.state.view === 'table'} value='table'></input>
                        <label htmlFor="table">Table</label>
                    </Col>
                </Row>
                <Row><Col><Search search={this.search} categoryfilter={this.categoryfilter} /></Col></Row>
                <br></br>
                <Row><Col>{this.state.deletestatus && <Alert variant='danger'><h3>Product Deleted Successfully !!!</h3></Alert>} </Col></Row>
                <br></br>
                {this.state.view === 'card' && <CardDeck><Row>{this.productdisplay()}</Row></CardDeck>}
                {this.state.view === 'table' && <Row>{this.tabledisplay()}</Row>}
            </Container>
        );
    }
}

export default withRouter(AllProduct);