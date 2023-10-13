import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
import {
    // Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    // TableSortLabel,
    // Toolbar,
    // Typography,
    Paper,
    Box,
    // Checkbox,
    // IconButton,
    // Tooltip,
    // FormControlLabel,
    // Switch,
  } from '@mui/material';
  
//   import {
//     Delete as DeleteIcon,
//     FilterList as FilterListIcon,
//   } from '@mui/icons-material';
  
// import { visuallyHidden } from '@mui/utils';

function createData(username, email, country, city, state) {
  return {
    username, email, country, city, state
  };
}

const rows = [
  createData('Kashish', 'kashish123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Rawish', 'rawish123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Usama', 'usama123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Zehra', 'zehra123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Hania', 'hania123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Ali', 'ali123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Efshal', 'efshal123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Ariba', 'ariba123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Mehwish', 'mehwish123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Talha', 'talha123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Rabaat', 'rabaat123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Khadija', 'khadija123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Sundus', 'sundus123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Neha', 'neha123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Abdullah', 'abdullah123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Minhaj', 'minhaj123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Kapil', 'kapil123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Rahul', 'rahul123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Sanjinee', 'sanjinee123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Karim', 'karim123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),
  createData('Daniyal', 'daniyal123@gmail.com', 'Pakistan', 'Karachi', 'Sindh'),

];


const Users=()=>{
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    //   };

    //   const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    //   };
    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }
      
      function getComparator(order, orderBy) {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }
      
      // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
      // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
      // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
      // with exampleArray.slice().sort(exampleComparator)
      function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }

    const visibleRows = React.useMemo(
        () =>
          stableSort(rows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
          ),
        [order, orderBy, page, rowsPerPage],
      );
    
    return(
        <Box>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Username</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>State</TableCell>
          <TableCell>City</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.username}
            >
              {/* sx={{ '&:last-child td, &:last-child th': { border: 0 } }} */}
            <TableCell component="th" scope="row">
              {row.username}
            </TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.country}</TableCell>
            <TableCell>{row.state}</TableCell>
            <TableCell>{row.city}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>

  {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
  </Box>
    )
}

export default Users