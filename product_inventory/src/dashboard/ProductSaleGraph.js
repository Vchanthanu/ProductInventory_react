import React from 'react';
import { Chart } from 'react-google-charts'
import axios from 'axios'
import { Alert, Card,Col} from 'react-bootstrap';
class ProductSaleGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            saleList: [],
            productsale: {
                id: undefined,
                name: '',
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 0
            },
            norecord: false
        }
    }
    componentWillMount() {
        this.saledata()
    }
    saledata = () => {
        axios.get('http://localhost:3000/sales')
            .then(response => {
                this.setState({ saleList: response.data })
                this.findproductsale()
            }, error => {
                console.error(error);
            })
    }
    findproductsale = () => {
        var productsale = this.state.saleList.find(product => (product.id === this.props.id))
        if (productsale === undefined) {
            this.setState({ norecord: true })
        } else
            this.setState({
                productsale: {
                    id: productsale.id,
                    name: productsale.name,
                    monday: productsale.monday,
                    tuesday: productsale.tuesday,
                    wednesday: productsale.wednesday,
                    thursday: productsale.thursday,
                    friday: productsale.friday
                }
            })
    }
    render() {
        return (
            <Col xs={12} md={6} xl={6}>
                <Card className='mb-4 mr-2 ml-2' >
                    {this.state.norecord && <Alert variant='danger'><h3>No Record Found ...</h3></Alert>}
                    {(this.state.norecord === false) && <Chart
                        chartType="Bar"
                        loader={<span>Loading Chart...</span>}
                        data={[
                            ['Weekdays', this.state.productsale.name],
                            ['Monday', this.state.productsale.monday],
                            ['Tuesday', this.state.productsale.tuesday],
                            ['Wednesday', this.state.productsale.wednesday],
                            ['Thusday', this.state.productsale.thursday],
                            ['Friday', this.state.productsale.friday]
                        ]}
                        options={{
                            chart: {
                                title: this.state.productsale.name + ' Sales per Week'
                            },
                        }}
                    />}
                </Card>
            </Col>
        );
    }
}

export default ProductSaleGraph;