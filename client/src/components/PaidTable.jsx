import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Stack, Skeleton } from '@mui/material';
import { fCurrency } from '../dashboard/utils/formatNumber';
import { Contador } from '../components/Contador';

export const PaiadTable = ({ cart, isLoading, subtotal })=> {
  
  return (
    <>
    <TableContainer component={Paper}>
        <Table >
            <TableHead  >
                <TableRow >
                    <TableCell align='center' sx={{bgcolor:t=>t.palette.primary.main, color:'white'}}>Desc</TableCell>
                    <TableCell align='center' sx={{bgcolor:t=>t.palette.primary.main, color:'white'}}></TableCell>
                    <TableCell align="right" sx={{textAlign:'center',bgcolor:t=>t.palette.primary.main, color:'white'}} >SubTotal</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
  
            {
                isLoading
                    ? 
                    <>
                    <TableRow >{/* esto es solo carga no le metas mucho cerebro.. son solo skeletons */}
                    <TableCell> <Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    <TableCell ><Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    <TableCell ><Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    </TableRow>
                    <TableRow >
                    <TableCell > <Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    <TableCell ><Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    <TableCell ><Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    </TableRow>
                    <TableRow >
                    <TableCell><Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    <TableCell > <Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    <TableCell > <Skeleton variant="rounded" width={50} height={60} /></TableCell>
                    </TableRow>
                    </>
                    :
                cart.map((row) => (
                <TableRow key={ row.id }>
                    <TableCell>{ row.nombre } </TableCell>
                    <TableCell align='center' sx={{ m:0, p:0, border:'1px slid black' }} > { row.quantity } </TableCell>
                    <TableCell align="right" sx={{textAlign:'center'}} >{fCurrency(row.precio * row.quantity)}</TableCell>
                </TableRow>
            ))
            }

                <TableRow sx={{bgcolor:t=>t.palette.primary.light}} >
                    <TableCell ></TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right" sx={{textAlign:'center'}} >{fCurrency(subtotal) }</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    </>
  );
}