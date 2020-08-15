import React from 'react';
class StockTableContent extends React.Component {
    constructor(props){
        super(props)
        this.state={
            productId:''
        }
    }
    deletepdt=()=>{
        this.props.detetepdt(this.props.id)
    }
    updatepdt=()=>{
        this.props.updatepdt(this.props.id)
    }
    incrementStock=()=>{
        this.props.incrementStock(this.props.id)
    }
    decrementStock=()=>{
        this.props.decrementStock(this.props.id)
    }
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.stock}</td>
                <td><input type='button' onClick={this.incrementStock} value='Stock ++'></input></td>
                <td><input type='button' onClick={this.decrementStock} value='Stock --'></input></td>
                <td><button onClick={this.updatepdt}>Update</button></td>
                <td><button onClick={this.deletepdt}>Delete</button></td>
            </tr>
        );
    }
}

export default StockTableContent;