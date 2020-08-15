import React from 'react';
import axios from 'axios';
class AddEditProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "id": 0,
            "image": "",
            "name": "",
            "companyName": "",
            "offer": undefined,
            "price": 0,
            "regDate": "",
            "category": "",
            "stock": 0,
            "rating": 0,
            "description": "",
            "validation": true
        }
    }
    componentWillMount() {
        if (this.props.location.state !== undefined) {
            axios.get('http://localhost:3000/products/' + this.props.location.state.id)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        image: response.data.image,
                        name: response.data.name,
                        companyName: response.data.companyName,
                        offer: response.data.offer,
                        price: response.data.price,
                        regDate: response.data.regDate,
                        category: response.data.category,
                        stock: parseInt(response.data.stock),
                        rating: response.data.rating,
                        description: response.data.description
                    })
                    this.validationfn()
                }, error => {
                    console.error(error)
                })

        }

    }
    validationfn = () => {
        setTimeout(() => {
            if ((this.state.image === "") || (this.state.name === "") || this.state.companyName === "" || this.state.offer === undefined || this.state.price <= 0 || this.state.stock <= 0 || this.state.regDate === "" || this.state.description === "" || this.state.category === "") {
                this.setState({ validation: true })
            } else {
                this.setState({ validation: false })
            }
        }, 10)


    }
    addproduct = () => {
        let productrequestbody = {
            "id": this.state.id,
            "image": this.state.image,
            "name": this.state.name,
            "companyName": this.state.companyName,
            "offer": this.state.offer,
            "price": this.state.price,
            "regDate": this.state.regDate,
            "category": this.state.category,
            "stock": this.state.stock,
            "rating": this.state.rating,
            "description": this.state.description
        }
        axios.post('http://localhost:3000/products', productrequestbody)
            .then(response => {
                console.log('Product Added Successfully')
                this.props.history.push('/product')
            }, error => {
                console.error(error)
            })
    }
    editproduct = () => {
        let editRequestBody = {
            "image": this.state.image,
            "name": this.state.name,
            "companyName": this.state.companyName,
            "offer": Boolean(this.state.offer),
            "price": this.state.price,
            "regDate": this.state.regDate,
            "category": this.state.category,
            "stock": this.state.stock,
            "rating": this.state.rating,
            "description": this.state.description
        }
        axios.put('http://localhost:3000/products/' + this.state.id, editRequestBody)
            .then(response => {
                this.props.history.push('/product')
            }, error => {
                console.error(error)
            })
    }
    getName = (event) => {
        this.setState({ name: event.target.value })
        this.validationfn()

    }
    getCompanyName = (event) => {
        this.setState({ companyName: event.target.value })
        this.validationfn()

    }
    getImage = (event) => {
        this.setState({ image: event.target.value })
        this.validationfn()

    }
    getPrice = (event) => {
        this.setState({ price: event.target.value })
        this.validationfn()

    }
    getStock = (event) => {
        this.setState({ stock: event.target.value })
        this.validationfn()
    }
    getCategory = (event) => {
        this.setState({ category: event.target.value })
        this.validationfn()
    }
    getDescription = (event) => {
        this.setState({ description: event.target.value })
        this.validationfn()
    }
    getDate = (event) => {
        this.setState({ regDate: event.target.value })
        this.validationfn()
    }
    getOfferYes = (event) => {
        this.setState({ offer: true })
        this.validationfn()
    }
    getOfferNo = (event) => {
        this.setState({ offer: false })
        this.validationfn()
    }
    render() {
        return (
            <div className="section">
                <div className="container">
                    <span className="loginarea">
                        <h1>Product Details</h1>
                        {this.state.validation && <h3 className="error">All the below details are required </h3>}
                        <form className="addpdtform" >
                            <div className="formalign">
                                <span className="left"><label htmlFor='name'>Name</label>
                                    <input type="text" id='name' name="name" value={this.state.name} onChange={this.getName}></input></span>
                                <span className="right"><label htmlFor='Manufacturename'>Company Name</label>
                                    <input type="text" id='Manufacturename' name="Manufacturename" value={this.state.companyName} onChange={this.getCompanyName}></input></span>
                            </div>
                            <div className="formalign">
                                <span className="left"><label htmlFor="price">Price</label>
                                    <input type="number" id='price' value={this.state.price} onChange={this.getPrice}></input></span>
                                <span className="right"><label htmlFor='stock'>Stock</label>
                                    <input type="number" id="stock" value={this.state.stock} onChange={this.getStock}></input></span>
                            </div>
                            <div className="formalign">
                                <span className="left"><label htmlFor="category">Category</label>
                                    <select className="right" id="category" name="category" value={this.state.category} onChange={this.getCategory}>
                                        <option value=""></option>
                                        <option value="Machinery">Machinery</option>
                                        <option value="Seed/sapling">Seed/Sapling</option>
                                        <option value="Tools">Tools</option>
                                    </select></span>
                            </div>
                            <div className="formalign">
                                <span className="left"><label htmlFor="imageurl">Imageurl</label>
                                    <input type="text" id="imageurl" value={this.state.image} onChange={this.getImage}></input></span>
                                <span className="right"><label htmlFor="">Today's Offer</label>
                                    <input type="radio" id="yes" name="Inoffer" onClick={this.getOfferYes} checked={this.state.offer === true} value='true'></input>
                                    <label htmlFor="yes">Yes</label>
                                    <input type="radio" id="no" name="Inoffer" onClick={this.getOfferNo} checked={this.state.offer === false} value='false'></input>
                                    <label htmlFor="no">No</label></span>
                            </div>
                            <div className="formalign"><span className="left"><label htmlFor="description">Description</label>
                                <input type="text" id="description" value={this.state.description} onChange={this.getDescription}></input></span>
                                <span className="right">
                                    <label htmlFor="dateofpdt">Date of Registration</label>
                                    <input type="date" value={this.state.regDate} onChange={this.getDate}></input>
                                </span>
                            </div>
                            <br></br><br></br>
                            {this.props.location.state === undefined && <input type="button" value="AddProduct" disabled={this.state.validation} onClick={this.addproduct}></input>}
                            {this.props.location.state !== undefined && <input type="button" value="SaveProduct" disabled={this.state.validation} onClick={this.editproduct}></input>}
                        </form>
                    </span>
                </div>
            </div>
        );
    }
}

export default AddEditProduct;