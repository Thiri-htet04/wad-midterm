
import { useState, useRef } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Box,
  Typography
} from '@mui/material';
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price)

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code)
    const qty = parseInt(qtyRef.current.value);
    const price = parseFloat(ppuRef.current.value);
    const discount = parseFloat(discountRef.current.value || 0);

    const existingIndex = dataItems.findIndex(
      (dataItem) => dataItem.item === item.name && parseFloat(dataItem.ppu) === price
    );

    if (existingIndex !== -1) {
      // Merge redundant item
      const newItems = [...dataItems];
      newItems[existingIndex].qty += qty;
      newItems[existingIndex].discount += discount;
      setDataItems(newItems);
    } else {
      const newItem = {
        item: item.name,
        ppu: price,
        qty: qty,
        discount: discount,
      };
      setDataItems([...dataItems, newItem]);
    }
  }

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const clearAll = () => setDataItems([]);

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code)
    setPpu(item.price)
  }

  return (
    <Container maxWidth={false} sx={{ mt: 1, px: 1, maxWidth: '1800px', mx: 'auto' }}>
      <Grid container spacing={1.5} sx={{ flexWrap: 'nowrap' }}>
        <Grid item xs={5} sm={4} md={3.5} lg={2.5} xl={2} sx={{ flexShrink: 0 }}>
          <Box
            sx={{
              backgroundColor: '#e4e4e4',
              p: 1.5,
              borderRadius: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 1.2,
              height: 'fit-content',
              width: '100%',
              minWidth: '200px',
              maxWidth: '280px'
            }}
          >
            <FormControl fullWidth size="small">
              <InputLabel>Item</InputLabel>
              <Select
                inputRef={itemRef}
                defaultValue={products[0].code}
                label="Item"
                onChange={productChange}
                sx={{ backgroundColor: '#fff', borderRadius: 1, height: '36px' }}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Price Per Unit"
              type="number"
              size="small"
              inputRef={ppuRef}
              value={ppu}
              onChange={() => setPpu(ppuRef.current.value)}
              sx={{ backgroundColor: '#fff', borderRadius: 1, '& .MuiOutlinedInput-root': { height: '36px' } }}
            />

            <TextField
              fullWidth
              label="Quantity"
              type="number"
              size="small"
              inputRef={qtyRef}
              defaultValue={1}
              sx={{ backgroundColor: '#fff', borderRadius: 1, '& .MuiOutlinedInput-root': { height: '36px' } }}
            />

            <TextField
              fullWidth
              label="Discount"
              type="number"
              size="small"
              inputRef={discountRef}
              defaultValue={0}
              sx={{ backgroundColor: '#fff', borderRadius: 1, '& .MuiOutlinedInput-root': { height: '36px' } }}
            />

            <Divider sx={{ my: 0.5 }} />

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#007bff',
                textTransform: 'none',
                fontWeight: 'bold',
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#0069d9',
                },
              }}
              onClick={addItem}
            >
              Add
            </Button>
          </Box>
        </Grid>

        <Grid item xs={7} sm={8} md={8.5} lg={9.5} xl={10} sx={{ flexGrow: 1, minWidth: 0 }}>
          <QuotationTable data={dataItems} deleteByIndex={deleteByIndex} clearAll={clearAll} />
        </Grid>
      </Grid>
    </Container>
  );

}

export default App;
