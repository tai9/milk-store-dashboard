// icons
import { AddCircle, ContentCopyTwoTone, FilterList, PrintTwoTone, SearchOutlined } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DateAdapter from '@mui/lab/AdapterMoment';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Chip, Drawer, InputAdornment, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
// assets
import productEmptyImg from 'assets/images/products/product-empty.png';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ProductForm from './ProductForm';

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
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
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

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'price',
        numeric: false,
        disablePadding: false,
        label: 'Price'
    },
    {
        id: 'quantity',
        numeric: false,
        disablePadding: false,
        label: 'Quantity'
    },
    {
        id: 'preview',
        numeric: false,
        disablePadding: false,
        label: 'Preview'
    },
    {
        id: 'created_date',
        numeric: false,
        disablePadding: false,
        label: 'Created Date'
    },
    {
        id: 'updated_date',
        numeric: false,
        disablePadding: false,
        label: 'Updated Date'
    },
    {
        id: 'expiry_date',
        numeric: false,
        disablePadding: false,
        label: 'Expiry Date'
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action'
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'center'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
};

const EnhancedTableToolbar = ({ date, handleDateChange, handleAddProduct }) => (
    <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
            // ...(numSelected > 0 && {
            //     bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
            // })
        }}
    >
        <Stack direction="row" spacing={2}>
            <TextField
                placeholder="Search Product"
                id="outlined-start-adornment"
                sx={{ width: '30ch' }}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlined />
                        </InputAdornment>
                    )
                }}
            />
            <LocalizationProvider dateAdapter={DateAdapter}>
                <DesktopDatePicker
                    label="Expiry Date"
                    inputFormat="DD/MM/YYYY"
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField size="small" {...params} />}
                />
            </LocalizationProvider>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" width="100%">
            <Tooltip title="Copy">
                <IconButton>
                    <ContentCopyTwoTone />
                </IconButton>
            </Tooltip>
            <Tooltip title="Print">
                <IconButton>
                    <PrintTwoTone />
                </IconButton>
            </Tooltip>
            <Tooltip title="Filter list">
                <IconButton>
                    <FilterList />
                </IconButton>
            </Tooltip>
            <Tooltip title="Add">
                <IconButton color="primary" onClick={handleAddProduct}>
                    <AddCircle />
                </IconButton>
            </Tooltip>
        </Stack>
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    date: PropTypes.string,
    handleDateChange: PropTypes.func.isRequired,
    handleAddProduct: PropTypes.func.isRequired
};

export default function ProductList({ data }) {
    const theme = useTheme();

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const [productItem, setProductItem] = useState({
        name: '',
        price: 0,
        quantity: 0,
        preview: []
    });
    const [filters, setFilters] = useState({
        search: '',
        expiry_date: moment().format()
    });

    const initialValues = {
        name: '',
        price: 0,
        quantity: 0,
        preview: [],
        ...productItem
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleOpenActions = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, row) => {
        const { name } = row;
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
        setProductItem({ ...row });
        handleToggle();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty data.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleSubmitUserForm = async (formValues) => {
        console.log(formValues);
    };

    const handleDateChange = (date) => {
        setFilters((prev) => ({
            ...prev,
            expiry_date: date
        }));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar
                    date={filters.expiry_date}
                    handleDateChange={handleDateChange}
                    handleAddProduct={() => {
                        setProductItem({
                            name: '',
                            price: 0,
                            quantity: 0,
                            preview: []
                        });
                        handleToggle();
                    }}
                />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 data.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="normal"
                                                onClick={(event) => handleClick(event, row)}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center" onClick={(event) => handleClick(event, row)}>
                                                {row.price}
                                            </TableCell>
                                            <TableCell align="center" onClick={(event) => handleClick(event, row)}>
                                                {row.quantity}
                                            </TableCell>
                                            <TableCell align="center" onClick={(event) => handleClick(event, row)}>
                                                <Box width="100px">
                                                    <img src={row.preview || productEmptyImg} alt={row} width="50%" />
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center" onClick={(event) => handleClick(event, row)}>
                                                {moment(row.created_date).format('DD-MM-YYYY, h:mm A')}
                                            </TableCell>
                                            <TableCell align="center" onClick={(event) => handleClick(event, row)}>
                                                {moment(row.updated_date).format('DD-MM-YYYY, h:mm A')}
                                            </TableCell>
                                            <TableCell align="center" onClick={(event) => handleClick(event, row)}>
                                                {moment(row.expiry_date).format('DD-MM-YYYY, h:mm A')}
                                            </TableCell>
                                            <TableCell align="center" onClick={(event) => handleClick(event, row)}>
                                                <Chip
                                                    size="small"
                                                    label={row.status || 'Active'}
                                                    sx={{
                                                        color: theme.palette.background.default,
                                                        bgcolor:
                                                            row.status === 'Deactivate'
                                                                ? theme.palette.error.main
                                                                : theme.palette.success.dark
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-controls="menu-earning-card"
                                                    aria-haspopup="true"
                                                    onClick={handleOpenActions}
                                                >
                                                    <MoreHorizIcon fontSize="inherit" />
                                                </IconButton>
                                                <Menu
                                                    id="menu-action"
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={Boolean(anchorEl)}
                                                    onClose={handleClose}
                                                    variant="selectedMenu"
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right'
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                >
                                                    {row.status === 'Deactivate' ? (
                                                        <MenuItem onClick={handleClose}>
                                                            <DoneIcon fontSize="small" sx={{ mr: 1 }} /> Active
                                                        </MenuItem>
                                                    ) : (
                                                        <MenuItem onClick={handleClose}>
                                                            <BlockIcon fontSize="small" sx={{ mr: 1 }} /> Deactivate
                                                        </MenuItem>
                                                    )}
                                                </Menu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <Box px={2} py={4}>
                    <Typography component="h3" variant="h3">
                        Product Information
                    </Typography>
                </Box>
                <ProductForm initialValues={initialValues} onSubmit={handleSubmitUserForm} />
            </Drawer>
        </Box>
    );
}

ProductList.defaultProps = {
    data: []
};

ProductList.propTypes = {
    data: PropTypes.array.isRequired || []
};
