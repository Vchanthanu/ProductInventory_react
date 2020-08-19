import React from 'react';
import { Chart } from 'react-google-charts'
import axios from 'axios'
import { Col } from 'react-bootstrap';
class OverallSaleGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            salesList: [],
            seedSapling: {
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 0
            },
            machinery: {
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 0
            },
            tool: {
                monday: 0,
                tuesday: 0,
                wednesday: 0,
                thursday: 0,
                friday: 0
            }
        }
    }
    componentWillMount() {
        this.salesData()
    }
    salesData = () => {
        axios.get('http://localhost:3000/sales')
            .then(response => {
                this.setState({ salesList: response.data })
                this.salecal()
            }, error => { console.error(error) })

    }
    salecal = () => {
        this.state.salesList.map(product => {
            if (product.category === 'Seed/sapling') {
                this.setState({
                    seedSapling: {
                        monday: this.state.seedSapling.monday + product.monday,
                        tuesday: this.state.seedSapling.tuesday + product.tuesday,
                        wednesday: this.state.seedSapling.wednesday + product.wednesday,
                        thursday: this.state.seedSapling.thursday + product.thursday,
                        friday: this.state.seedSapling.friday + product.friday
                    }
                })
            }
            if (product.category === 'Machinery') {
                this.setState({
                    machinery: {
                        monday: this.state.machinery.monday + product.monday,
                        tuesday: this.state.machinery.tuesday + product.tuesday,
                        wednesday: this.state.machinery.wednesday + product.wednesday,
                        thursday: this.state.machinery.thursday + product.thursday,
                        friday: this.state.machinery.friday + product.friday
                    }
                })
            }
            if (product.category === 'Tools') {
                this.setState({
                    tool: {
                        monday: this.state.tool.monday + product.monday,
                        tuesday: this.state.tool.tuesday + product.tuesday,
                        wednesday: this.state.tool.wednesday + product.wednesday,
                        thursday: this.state.tool.thursday + product.thursday,
                        friday: this.state.tool.friday + product.friday
                    }
                })
            }
            return null
        })
    }
    render() {

        return (
            <Col xs={12} md={6} lg={6} className='text-center'>
                <Chart
                    chartType="Bar"
                    loader={<span>Loading Chart</span>}
                    data={[
                        ['Weekdays', 'Seed/Sapling', 'Machinery', 'Tool'],
                        ['Monday', this.state.seedSapling.monday, this.state.machinery.monday, this.state.tool.monday],
                        ['Tuesday', this.state.seedSapling.tuesday, this.state.machinery.tuesday, this.state.tool.tuesday],
                        ['Wednesday', this.state.seedSapling.wednesday, this.state.machinery.wednesday, this.state.tool.wednesday],
                        ['Thusday', this.state.seedSapling.thursday, this.state.machinery.thursday, this.state.tool.thursday],
                        ['Friday', this.state.seedSapling.friday, this.state.machinery.friday, this.state.tool.friday]
                    ]}
                    options={{
                        chart: {
                            title: 'OverAll Sales per Week',
                            subtitle: 'Sales based on the category',
                        },
                    }}
                />
            </Col>
        );

    }
}

export default OverallSaleGraph;