import React from 'react';
import axios from 'axios'
import ProductDisplay from './ProductDisplay'
class Offers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productList: []
        }
    }
    componentWillMount() {
        this.offerDisplay()
    }
    offerDisplay = () => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                this.setState({ productList: response.data })
            }, error => { console.error(error); })
    }
    productdisplay = () => {
        if (this.state.productList.length === 0) {
            return (<h3 className='error'>  No Product Found !!! </h3>)
        } else {
            var product = this.state.productList.find(product => product.offer === true)
            if (product === undefined) {
                return (<h3 className='error'>  No Offers Today !!! </h3>)
            } else {
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
                        deleteproduct={this.deleteproduct}
                        nodescription={true}>
                    </ProductDisplay>
                )
            }
        }
    }
    render() {
        return (
            <span><b>Today Offers</b><br></br>
                {this.productdisplay()}
            </span>
        );
    }
}

export default Offers;