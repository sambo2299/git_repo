import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';


const table = (props) => {  

  return (
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 750 }} size="small" aria-label="a dense table">
        <TableBody>
          {props.datas.map((row) => (
            <TableRow
              hover
              key={row.id}>
              <TableCell onClick={() => props.showDetail(row)}>
                <h3>{row.name}</h3>
                <h4>{row.author}</h4>
                stars: {row.stars} &nbsp;&nbsp;
                forks: {row.forks ? row.forks : 0} &nbsp;&nbsp;
                watcher: {row.watchers ? row.watchers : 0}
                <p>{row.description}</p>
                update: {row.last_update ? row.last_update : 0}                
              </TableCell>              
            </TableRow>
          ))}
        </TableBody>
       

      </Table>
    </TableContainer>    
    <TablePagination
    rowsPerPageOptions={props.rowsperPageOptions}
    component="div"
    count={props.count}
    rowsPerPage={props.limit}
    page={props.page}
    onPageChange={props.handleChangePage}
    onRowsPerPageChange={props.handleChangeRowsPerPage}
  />
</div>
  );
}

export default table;