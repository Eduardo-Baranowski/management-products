import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/named
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import api from '../../services/api';
import { ProductDto } from '../../dtos';
import Select from 'react-select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CustomTabPanel from '../components/CustomTabPanel';
import { Input } from '@mui/material';
import { CategoryDto } from '../../dtos/category.dto';
import { DivSearch, ViewSelect } from './style';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'Nome', width: 100 },
  { field: 'description', headerName: 'Descrição', width: 200 },
  { field: 'color', headerName: 'Cor', width: 130 },
  { field: 'categoryId', headerName: 'Categoria de produto', width: 160 },
  {
    field: 'price',
    headerName: 'Preço',
    width: 90,
  },
  {
    field: 'promotionalPrice',
    headerName: 'Preço promocional',
    width: 140,
  },
];

const paginationModel = { page: 0, pageSize: 10 };

const Inicio: React.FC = () => {
  const [cnpjOrName, setCnpjOrName] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rows, setRows] = useState<ProductDto[]>([]);
  const [categories, setCategories] = React.useState<CategoryDto[]>([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [isClearable] = React.useState(true);
  const [isSearchable] = React.useState(true);
  const [isDisabled] = React.useState(false);
  const [isLoading] = React.useState(false);
  const [isRtl] = React.useState(false);

  console.log(selectedRows);
  const loadingProducts = async (filter?: string) => {
    setLoading(true);
    await api
      .get('/products', {
        params: {
          page: 1,
          limit: 100,
          name: filter ? filter : '',
          categoryId: categoryId > 0 ? Number(categoryId) : null,
        },
      })
      .then(response => {
        setLoading(false);
        setCategoryId(0);
        var rows1: ProductDto[] = [];
        response.data.items.forEach(async (object: ProductDto) => {
          rows1.push({
            id: object.id,
            name: object.name,
            description: object.description,
            color: object.color,
            categoryId: object.category?.name,
            price: Number(object.price.toFixed(2)),
            promotionalPrice: Number(object.promotionalPrice.toFixed(2)),
          });
        });
        setRows(rows1);
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
      });
  };

  const loadingCategories = async () => {
    await api
      .get('/categories', {
        params: {
          page: 1,
          limit: 100,
        },
      })
      .then(response => {
        setCategories(response.data.items);
      })
      .catch(error => console.log(error));
  };

  const filterCategories = categories.map((category: CategoryDto) => ({
    label: category.name,
    value: String(category.id),
  }));

  useEffect(() => {
    loadingCategories();
    loadingProducts();
  }, []);

  return (
    <>
      <Paper sx={{ height: '100vh', width: '100%' }}>
        <CustomTabPanel>
          <Stack
            sx={{ width: '100%' }}
            style={{ marginRight: 20 }}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <DivSearch>
              <Input
                style={{ marginRight: 20, flex: 0.5 }}
                placeholder="Digite o nome do produto"
                value={cnpjOrName}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setCnpjOrName(event.target.value);
                }}
              />
              <ViewSelect>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  defaultValue={filterCategories[0]}
                  placeholder={'Selecione uma categoria'}
                  isDisabled={isDisabled}
                  isLoading={isLoading}
                  isClearable={isClearable}
                  isRtl={isRtl}
                  isSearchable={isSearchable}
                  name="categoryId"
                  options={filterCategories}
                  onChange={e => {
                    if (e === null) {
                      e = {
                        value: '',
                        label: '',
                      };
                    } else {
                      setCategoryId(Number(e?.value));
                    }
                  }}
                />
              </ViewSelect>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={() => {
                  loadingProducts(cnpjOrName);
                }}
                disabled={loading}
              >
                Pesquisar
              </Button>
            </DivSearch>
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
        </CustomTabPanel>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[10, 100]}
          checkboxSelection
          onRowSelectionModelChange={(ids: any) => {
            //const selectedIDs = new Set(ids);
            //let selected = rows.filter(row => selectedIDs.has(row.id));

            console.log(ids);
            setSelectedRows(ids);
          }}
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default Inicio;
