import React from 'react';
import { Button } from 'react-bootstrap'
class TableDisplay extends React.Component {
    deleteproduct = () => {
        this.props.deleteproduct(this.props.id)
    }
    editproduct = () => {
        this.props.editproduct(this.props.id)
    }
    render() {
        return (
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.companyName}</td>
                <td>{this.props.price}</td>
                <td>{this.props.category}</td>
                <td>{this.props.stock}</td>
                <td>{this.props.rating}</td>
                <td>{this.props.offer ? 'Yes' : 'No'}</td>
                <td>{this.props.regDate}</td>
                <td colSpan='2'>{this.props.description}</td>
                <td><Button variant="primary" onClick={this.editproduct}>Edit</Button></td>
                <td><Button variant="danger ml-auto" onClick={this.deleteproduct}>Delete</Button></td>
            </tr>
        );
    }
}

export default TableDisplay;