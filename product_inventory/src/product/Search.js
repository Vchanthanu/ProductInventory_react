import React from 'react';
import { Row,Col } from 'react-bootstrap';
class Search extends React.Component {
    search = (event) => {
        this.props.search(event.target.value)
    }
    getCategory = (event) => {
        this.props.categoryfilter(event.target.value)
    }
    render() {
        return (
            <Row><Col xs={12} md={4} lg={3}>
                <label htmlFor="category"><b>Category</b></label>&nbsp;&nbsp;
                <select id="category" name="category" onChange={this.getCategory}>
                    <option value="">All</option>
                    <option value="Machinery">Machinery</option>
                    <option value="Seed/sapling">Seed/Sapling</option>
                    <option value="Tools">Tools</option>
                </select>&nbsp;&nbsp;</Col>
                <Col xs={12} md={8} lg={9}><input className='searchbar' type="text" name='productname' onChange={this.search} placeholder="Search for Product using Name..."></input></Col>
            </Row>
        );
    }
}

export default Search;