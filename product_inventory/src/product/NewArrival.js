import React from 'react';
import axios from 'axios'
import ProductDisplay from './ProductDisplay'
class NewArrival extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            productList: []
        }
    }
    componentWillMount() {
        this.arrival()
    }
    arrival = () => {
        axios.get('http://localhost:3000/products')
            .then(response => {
                this.setState({ productList: response.data })
            }, error => { console.error(error); })
    }
    productdisplay = () => {
        if (this.state.productList.length === 0) {
            return (<h3 className='error'>  NO New Arrivals Today !!! </h3>)
        } else {
            let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
            var tempDate = new Date();
            var date = `${tempDate.getFullYear()}-${formatTwoDigits(tempDate.getMonth() + 1)}-${formatTwoDigits(tempDate.getDate())}`
            var product = this.state.productList.find(product => product.regDate === date)
            if (product === undefined) {
                return (<h3 className='error'>  No New Arrivals Today !!! </h3>)
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
            <span>
                <b>New Arrival's</b><br></br>
                {this.productdisplay()}
            </span>
        );
    }
}

export default NewArrival;

