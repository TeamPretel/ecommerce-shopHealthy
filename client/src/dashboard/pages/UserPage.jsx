import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
// import {getUsers} from '../helpers/getUsers';
// import myUsers from '../_mock/user';
import { useState, useEffect } from 'react';
import useFetch from "react-fetch-hook"
import { areIntervalsOverlapping } from 'date-fns';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'displayName', label: 'Nombre', alignRight: false },
  { id: 'email', label: 'Correo', alignRight: false },
  { id: 'created', label: 'Fecha de creación', alignRight: false },
  { id: 'role', label: 'Rol', alignRight: false },
  { id: 'promover', label: 'Promover', alignRight: false },
  { id: 'tokensValidAfterTime', label: 'Token expira', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}


export default function UserPage() {
  // const [allUsers, setAllUsers] = useState(null)
  const { isLoading, data } = useFetch("https://henryhealthy.shop/tresmiluno/dashboard")
  // useEffect(
  //   () => {
  //     let ignore = false
  //     const array = []
  //     async function getUsers () {
  //       // const allUsers = await (await fetch("http://127.0.0.1:3001/tresmiluno/dashboard")).json()
  //       // console.dir(allUsers)
  //       array.push(data)
  //       if (!ignore) setAllUsers(array)
  //     }
  //     getUsers()
  //     return () => { ignore = true }
  //   },
  //   [isLoading, data],
  // );  
  if ((data !== undefined && data !== null)) {
    // debugger
  
    return isLoading ? (
      <div>Loading...</div>
    ) : (<>
          <UserPageContent myUsers={data} />
    </>)
  }
  return ('💩')

}


function UserPageContent({myUsers}) {
  // const {myUsers} = props.data
  // console.dir(myUsers)
  // console.log(typeof myUsers)

  const [open, setOpen] = useState(null);

  const [first, setfirst] = useState('hola')

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('email');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePromote = (event) => {

  }
  const handleOpenMenu = (event) => {
    console.log(event.currentTarget)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = myUsers.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    console.dir({"event":event, "name":name})

    if (event.type === 'change') {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }
      setSelected(newSelected);
    } else {
      alert(`Seguro que quieres promover a ${name}?`)
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - myUsers.length) : 0;
  
  // if (!isLoading && (myUsers!==undefined)){
    // console.log("Estafuncion: " + myUsers)
    const filteredUsers = applySortFilter(myUsers, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;
  // debugger
// }


  return (
    <>
    
      <Helmet>
        <title> Dashboard: Usuarios </title>
      </Helmet>

      <Container  >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button>
        </Stack>

        <Card sx={{border:'1px solid black', maxWidth:800, height:'auto' }} > 
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={5}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                { 
                  filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      uid,
                      photoURL,
                      displayName,
                      email,
                      created,
                      role,
                      tokensValidAfterTime 
                    } = row
                    // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                    // (!metadata) && console.dir(metadata) 
                    const selectedUser = selected.indexOf(displayName) !== -1;

                    return (
                      <TableRow hover key={uid} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, email)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={.5}>
                            <Avatar alt={displayName} src={photoURL} />
                            <Typography variant="subtitle2" noWrap>
                              {displayName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{created}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">
                          <Label onClick={(event) => handleClick(event, email)} color={(role === 'Regular' && 'secondary') || (role === 'super_admin' && 'error')|| 'warning'}>{sentenceCase(role)}</Label>
                        </TableCell>
                        
                        <TableCell align="left">{tokensValidAfterTime}</TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={alert('coso')}>
                            <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                          </IconButton>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={alert('otro coso')}>
                            <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }}  />                            
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
                {
                  emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )
                }
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={myUsers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

    </>
  );
}

/*
  // const [myUsers, setMyUsers] = useState(null)

  // useEffect(
  //   () => {
  //     let ignore = false
  //     async function getUsers () {
  //       const allUsers = await (await fetch("http://127.0.0.1:3001/tresmiluno/dashboard")).json()
  //       console.dir(allUsers)
  //       if (!ignore) setMyUsers(allUsers)
  //     }
  //     getUsers()
  //     return () => { ignore = true }
  //   },
  //   [],
  // );
  // console.dir(myUsers)
*/