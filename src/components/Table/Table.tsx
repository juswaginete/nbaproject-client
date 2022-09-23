import React, { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';

import NbaCover from '../../assets/images/nba-cover.png';

interface TeamTableProps {
  tableHeader: string[];
  tableRow: any[];
}

const TeamTable = ({
  tableHeader,
  tableRow,
}: TeamTableProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: 'auto', overflow: 'hidden', margin: '50px', padding: '100px' }}>
      <div style={{ height: '200px' }}>
        <CardMedia
          component="img"
          height="100%"
          image={NbaCover}
          alt="nba-cover-image"
          style={{ height: '100%', objectFit: 'cover', objectPosition: '50% 9%' }}
        />
      </div>
      <TableContainer sx={{ maxHeight: 440, border: '1px solid #E8E8E8' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeader ? (
                <>
                  {tableHeader?.map((headerName: string) => (
                    <>
                      <TableCell align="center" style={{ minWidth: 170, backgroundColor: '#1572A1', color: '#ffffff' }}>{headerName}</TableCell>
                    </>
                  ))}
                </>
              ) : ""}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRow
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <>
                    {row?.map((data: any, index: number) => (
                      <TableCell key={`tableRow-${index}`} align="center">{data}</TableCell>
                    ))}
                  </>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={tableRow.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TeamTable;
