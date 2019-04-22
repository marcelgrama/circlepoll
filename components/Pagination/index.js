import React from 'react';
import PropTypes from 'prop-types';
import Table, { TablePagination, TableRow, TableBody } from 'material-ui/Table';

class PaginationController extends React.PureComponent {
  render() {
    return (
      <Table>
        <TableBody>
          <TableRow>
            <TablePagination
              colSpan={3}
              count={this.props.totalItems}
              rowsPerPage={this.props.rowsPerPage}
              rowsPerPageOptions={[this.props.rowsPerPage]}
              page={this.props.currentPage}
              onChangePage={this.props.onChangePage}
            />
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

PaginationController.propTypes = {
  totalItems: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};

export default PaginationController;
