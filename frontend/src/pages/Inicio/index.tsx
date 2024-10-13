import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import api from '../../services/api';
import { ProductDto } from '../../dtos';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Nome', width: 70 },
  { field: 'description', headerName: 'Descrição', width: 130 },
  { field: 'color', headerName: 'Cor', width: 130 },
  { field: 'categoryId', headerName: 'Categoria de produto', width: 160 },
  {
    field: 'price',
    headerName: 'Preço',
    // type: 'number',
    width: 90,
  },
  {
    field: 'promotionalPrice',
    headerName: 'Preço promocional',
    // type: 'number',
    width: 140,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

const Inicio: React.FC = () => {
  const [rows, setRows] = useState<ProductDto[]>([]);

  const loadingProducts = async () => {
    await api
      .get('/products', {
        params: {
          page: 1,
          limit: 100,
        },
      })
      .then(response => {
        var rows1: ProductDto[] = [];
        response.data.items.forEach(async (object: ProductDto) => {
          rows1.push({
            id: object.id,
            name: object.name,
            description: object.description,
            color: object.color,
            categoryId: object.category?.name,
            price: object.price,
            promotionalPrice: object.promotionalPrice,
          });
        });
        setRows(rows1);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadingProducts();
  }, []);

  return (
    <>
      <Paper sx={{ height: '100vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 100]}
          checkboxSelection
          sx={{ border: 0 }}
        />
        <Stack direction="row" spacing={2} position={'absolute'} right={10} top={10}>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              window.location.pathname = '/product';
            }}
          >
            Adicionar Produto
          </Button>
        </Stack>
      </Paper>
    </>
  );
};

export default Inicio;
