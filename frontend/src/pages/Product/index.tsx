import * as React from 'react';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { Container, Input, Label, ViewInput, ViewForm, ViewSelect } from './style';
import { Button, Stack } from '@mui/material';
import Select from 'react-select';

import { CategoryDto } from '../../dtos/category.dto';

const schema = yup.object().shape({
  name: yup.string().required('Por  favor, digite o nome do produto!'),
  description: yup.string().required('Por  favor, digite a descrição do produto!'),
  price: yup.number().required('Por favor, informe o preço'),
  categoryId: yup.string().required('Por favor, informe a categoria'),
  color: yup.string().required('Por favor, informe a cor do produto'),
});

const Product: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [categories, setCategories] = React.useState<CategoryDto[]>([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [isClearable] = React.useState(true);
  const [isSearchable] = React.useState(true);
  const [isDisabled] = React.useState(false);
  const [isLoading] = React.useState(false);
  const [isRtl] = React.useState(false);

  const onSubmitHandler = handleSubmit(async (data: any) => {
    try {
      api.post('/product', {
        name: data.name,
        description: data.description,
        color: data.color,
        categoryId: categoryId,
        price: data.price,
      });
      reset();
      toast.success('Produto criado com sucesso');
    } catch (error) {
      toast.error('Não foi possível criar o produto');
    }
  });

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

  React.useEffect(() => {
    loadingCategories();
  }, []);

  return (
    <Container>
      <ViewForm>
        <form onSubmit={onSubmitHandler}>
          <ViewInput>
            <Label>Nome *</Label>
            <Input {...register('name', { required: true })} />
            {errors.name?.message && <p style={{ color: '#000' }}>{errors.name?.message}</p>}
          </ViewInput>
          <ViewInput>
            <Label>Descrição *</Label>
            <Input {...register('description', { required: true })} />
            {errors.description?.message && (
              <p style={{ color: '#000' }}>{errors.description?.message}</p>
            )}
          </ViewInput>
          <ViewInput>
            <Label>Cor *</Label>
            <Input {...register('color', { required: true })} />
            {errors.color?.message && <p style={{ color: '#000' }}>{errors.color?.message}</p>}
          </ViewInput>
          <ViewInput>
            <Label>Categoria *</Label>
            <ViewSelect>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={filterCategories[0]}
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
                    setValue('categoryId', e!.value);
                    register('categoryId', { required: true });
                    setCategoryId(Number(e?.value));
                  }
                }}
              />
            </ViewSelect>
            {errors.categoryId?.message && (
              <p style={{ color: '#000' }}>{errors.categoryId?.message}</p>
            )}
          </ViewInput>
          <ViewInput>
            <Label>Preço *</Label>
            <Input {...register('price', { required: true })} />
            {errors.price?.message && <p style={{ color: '#000' }}>{errors.price?.message}</p>}
          </ViewInput>
          <Stack direction="row" spacing={2} justifyContent={'flex-end'} marginTop={2}>
            <Button variant="contained" color="success" onClick={onSubmitHandler}>
              Enviar
            </Button>
          </Stack>
        </form>
        <ToastContainer autoClose={4000} position="top-right" theme="colored" closeOnClick />
      </ViewForm>
    </Container>
  );
};

export default Product;
