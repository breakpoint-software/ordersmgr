import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orderAction";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { withRouter } from "react-router-dom";
import { formatDate, formatNumber } from "./helpers";

class Orders extends Component {
  componentWillMount() {
    this.props.fetchOrders();
  }

  handleRowClick = order => {
    this.props.history.push("orderDetails", { orderId: order.id });
  };

  constructor(props) {
    super(props);
    this.options = {
      page: 1,
      sizePerPageList: [
        {
          text: "5",
          value: 5
        },
        {
          text: "10",
          value: 10
        },
        {
          text: "All",
          value: this.props.orders.length
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
      paginationPosition: "both",
      onRowClick: this.handleRowClick,
      defaultSortName: "date",
      defaultSortOrder: "desc"
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <BootstrapTable
          data={this.props.orders}
          options={this.options}
          pagination={true}
        >
          <TableHeaderColumn isKey={true} dataField="id" hidden="true">
            id
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="description"
            dataAlign="left"
            headerAlign="left"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Description
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="customer"
            dataAlign="left"
            headerAlign="left"
            dataSort
            filter={{ type: "TextFilter", delay: 1000 }}
          >
            Customer
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="date"
            dataAlign="center"
            headerAlign="center"
            dataSort
            filter={{
              type: "DateFilter",
              delay: 1000,
              withoutEmptyComparatorOption: true
            }}
            dataFormat={this.props.formatDate}
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="quantity"
            dataAlign="right"
            headerAlign="right"
            dataSort
            filter={{
              type: "NumberFilter",
              delay: 1000,
              withoutEmptyComparatorOption: true
            }}
          >
            Quantity
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="total"
            dataAlign="right"
            headerAlign="right"
            dataSort
            dataFormat={this.props.formatNumber}
            filter={{
              type: "NumberFilter",
              delay: 1000,
              withoutEmptyComparatorOption: true
            }}
          >
            Total
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

Orders.propTypes = {
  fetchOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired
};
const MapOrdersToState = state => ({
  orders: state.orderReducer.items,
  formatDate: formatDate,
  formatNumber: number => {
    return formatNumber(number, 2);
  }
});
export default withRouter(
  connect(
    MapOrdersToState,
    { fetchOrders }
  )(Orders)
);
