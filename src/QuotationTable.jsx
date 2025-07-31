

import { 
  Container, 
  Button, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableFooter,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

function QuotationTable({ data, deleteByIndex, clearAll }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container maxWidth={false} sx={{ px: 0 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>Quotation</Typography>
        <Typography variant="body1">
          <CiShoppingCart /> No items
        </Typography>
      </Container>
    );
  }

  const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - v.discount), 0);
  const totalDiscount = data.reduce((acc, v) => acc + v.discount, 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Container maxWidth={false} sx={{ px: 0 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>Quotation</Typography>
      <Box sx={{ mb: 1 }}>
        <Button variant="outlined" color="inherit" startIcon={<MdClear />} onClick={clearAll}>
          Clear
        </Button>
      </Box>
      <Table 
        size="small"
        sx={{ 
          border: '1px solid #dee2e6',
          borderCollapse: 'collapse',
          width: '100%',
          tableLayout: 'fixed',
          '& .MuiTableCell-root': {
            border: '1px solid #dee2e6',
            padding: '0.2rem 0.3rem',
            fontSize: '0.7rem',
            lineHeight: 1.1,
          },
          '& .MuiTableRow-root:nth-of-type(odd) .MuiTableCell-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)', // striped effect
          },
          '& .MuiTableRow-root:hover .MuiTableCell-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.075)', // hover effect
          },
          '& .MuiTableHead-root .MuiTableCell-root': {
            backgroundColor: '#f8f9fa',
            fontWeight: 'bold',
            borderBottom: '2px solid #dee2e6',
            fontSize: '0.7rem',
            lineHeight: 1.1,
            padding: '0.2rem 0.3rem',
          }
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ width: '6%' }}>-</TableCell>
            <TableCell align="center" sx={{ width: '8%' }}>Qty</TableCell>
            <TableCell align="center" sx={{ width: '28%' }}>Item</TableCell>
            <TableCell align="center" sx={{ width: '18%' }}>Price/Unit</TableCell>
            <TableCell align="center" sx={{ width: '18%' }}>Discount</TableCell>
            <TableCell align="center" sx={{ width: '22%' }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{
          data.map((v, i) => {
            let amount = v.qty * v.ppu - v.discount;
            return (
              <TableRow key={i}>
                <TableCell align="center">
                  <IconButton onClick={() => handleDelete(i)} size="small">
                    <BsFillTrashFill />
                  </IconButton>
                </TableCell>
                <TableCell align="center">{v.qty}</TableCell>
                <TableCell>{v.item}</TableCell>
                <TableCell align="center">{v.ppu.toFixed(2)}</TableCell>
                <TableCell align="center">{v.discount || 0}</TableCell>
                <TableCell align="right">{amount.toFixed(2)}</TableCell>
              </TableRow>
            );
          })
        }</TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}></TableCell>
            <TableCell align="center">
              <Typography variant="subtitle1" fontWeight="bold">
                Total Discount
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                {totalDiscount.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                Total
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1" fontWeight="bold">
                {total.toFixed(2)}
              </Typography>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Container>
  );
}

export default QuotationTable;
