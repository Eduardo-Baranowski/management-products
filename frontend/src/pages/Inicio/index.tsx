import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import api from '../../services/api';
import { ProductDto } from '../../dtos';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Nome', width: 70 },
  { field: 'description', headerName: 'Descrição', width: 130 },
  { field: 'color', headerName: 'Cor', width: 130 },
  { field: 'categoryId', headerName: 'Categoria de produto', width: 130 },
  {
    field: 'price',
    headerName: 'Preço',
    type: 'number',
    width: 90,
  },
  {
    field: 'promotionalPrice',
    headerName: 'Preço promocional',
    type: 'number',
    width: 90,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const Inicio: React.FC = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [rows, setRows] = useState<ProductDto[]>([]);

  const loadingProducts = async () => {
    await api
      .get('/products', {
        params: {
          page: 1,
          limit: 5,
        },
      })
      .then(response => {
        var rows1: ProductDto[] = [];
        response.data.items.forEach(async (object: ProductDto) => {
          console.log(object.promotionalPrice);
          rows1.push({
            id: object.id,
            name: object.name,
            description: object.description,
            color: object.color,
            categoryId: object.categoryId,
            price: object.price,
            promotionalPrice: object.promotionalPrice,
          });
        });
        setRows(rows1);
        console.log('kkkkk', response.data.items);
        setProducts(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    loadingProducts();
  }, []);

  console.log(products, 'llll');
  console.log(rows, '----');

  return (
    <Paper sx={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default Inicio;
