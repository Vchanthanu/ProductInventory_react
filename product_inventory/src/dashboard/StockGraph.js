import React from 'react';
import { Chart } from 'react-google-charts'
import axios from 'axios'
class StockGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            seedSapling: 0,
            machinery: 0,
            tool: 0,
            update : undefined
        }
    }
    componentWillReceiveProps(){
        this.getAllProducts()
    }
    getAllProducts() {
        axios.get(' http://localhost:3000/products')
            .then(response => {
                this.setState({
                    productList: response.data,
                })
                this.data()
            }, error => {
                console.error(error)
            })
    }
    data = () => {
        this.setState({seedSapling:0,machinery:0,tool:0})
        this.state.productList.map(product => {
            if (product.category === 'Seed/sapling') {
                this.setState({
                    seedSapling: parseInt(this.state.seedSapling) + parseInt(product.stock)
                })
            }
            if (product.category === 'Machinery') {
                this.setState({
                    machinery: parseInt(this.state.machinery) + parseInt(product.stock)
                })
            }
            if (product.category === 'Tools') {
                this.setState({
                    tool: parseInt(this.state.tool) + parseInt(product.stock)
                })
            }
            return null
        })
    }
    render() {
        return (
            <span className='chart'>
                <Chart
                    chartType="Bar"
                    loader={<span>Loading Chart...</span>}
                    data={[
                        ['Category', 'stock'],
                        ['seedSapling', this.state.seedSapling],
                        ['machinery', this.state.machinery],
                        ['tool', this.state.tool]
                    ]}
                    options={{
                        chart: {
                            title: 'Stock Based on category'
                        },
                    }}
                />
            </span>

        );
    }
}

export default StockGraph;