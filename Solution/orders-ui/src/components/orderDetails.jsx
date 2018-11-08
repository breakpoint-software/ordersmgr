import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchFullOrder, updateProductOrder } from "../actions/orderAction";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { FaPlus, FaMinus } from "react-icons/fa";
import { formatDate, formatNumber } from "./helpers";

class OrderDetails extends Component {
  componentWillMount() {
    this.props.fetchFullOrder(this.props.location.state.orderId);
  }
  handleIncrementItem = (cell, row, rowIndex) => {
    this.props.updateProductOrder({
      productId: row.productId,
      orderId: row.orderId,
      quantity: row.quantity + 1,
      price: row.unitaryPrice
    });
  };

  handleDecrementItem = (cell, row, rowIndex) => {
    this.props.updateProductOrder({
      productId: row.productId,
      orderId: row.orderId,
      quantity: row.quantity > 0 ? row.quantity - 1 : 0,
      price: row.unitaryPrice
    });
  };

  cellButton = (cell, row, enumObject, rowIndex) => {
    return (
      <div className="container-fluid">
        <button
          type="button"
          className="btn btn-default btn-sm"
          onClick={() => this.handleIncrementItem(cell, row, rowIndex)}
        >
          <FaPlus />
        </button>{" "}
        <button
          type="button"
          className="btn btn-default btn-sm"
          onClick={() => this.handleDecrementItem(cell, row, rowIndex)}
        >
          <FaMinus color="red" />
        </button>
      </div>
    );
  };

  render() {
    const options = {
      page: 1,
      sizePerPage: [
        {
          text: "10",
          value: "10"
        }
      ],
      sizePerPage: 10,
      pageStartIndex: 1,
      paginationSize: 3,
      prePage: "Prev",
      nextPage: "Next",
      firstPage: "First",
      lastPage: "Last",
      paginationShowsTotal: this.renderShowsTotal,
      paginationPosition: "both"
    };

    return (
      <div className="container-fluid">
        <br />
        <h4>Order</h4>
        <hr />
        <div className="panel panel-default ">
          <div className="panel-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-6">
                  <b>Description:&nbsp;</b>
                  {this.props.selectedOrder.description}
                </div>
                <div className="col-6">
                  <b>Date:&nbsp;</b>
                  {this.props.formatDate(this.props.selectedOrder.date)}
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <b> Quantity:</b>
                  &nbsp;
                  {this.props.selectedOrder.quantity}
                </div>
                <div className="col-6">
                  <b>Total:&nbsp;</b>
                  {formatNumber(this.props.selectedOrder.total, 2)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h4>Detail</h4>
        <hr />
        <div className="panel panel-default ">
          <div className="panel-body">
            <div className="container-fluid ">
              <BootstrapTable
                data={this.props.selectedOrder.details}
                striped
                hover
                options={options}
                pagination={true}
                version="4"
              >
                <TableHeaderColumn isKey={true} hidden dataField="id">
                  id
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="product"
                  dataAlign="left"
                  headerAlign="left"
                >
                  Product
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="unitaryPrice"
                  dataAlign="right"
                  headerAlign="right"
                  formatNumber={this.props.formatNumber}
                >
                  Unitary Price
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="quantity"
                  dataAlign="right"
                  headerAlign="right"
                >
                  Quantity
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataField="subtotal"
                  dataAlign="right"
                  headerAlign="right"
                  dataFormat={this.props.formatNumber}
                >
                  Subtotal
                </TableHeaderColumn>
                <TableHeaderColumn
                  dataAlign="center"
                  headerAlign="center"
                  dataFormat={this.cellButton}
                  width="120"
                >
                  &nbsp;
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OrderDetails.propTypes = {
  fetchFullOrder: PropTypes.func.isRequired,
  updateProductOrder: PropTypes.func.isRequired,
  selectedOrder: PropTypes.object.isRequired
};
const MapOrdersToState = state => ({
  selectedOrder: state.orderReducer.selectedOrder,
  formatDate: formatDate,
  formatNumber: number => {
    return formatNumber(number, 2);
  }
});

export default connect(
  MapOrdersToState,
  { fetchFullOrder, updateProductOrder }
)(OrderDetails);
