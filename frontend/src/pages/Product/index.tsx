import * as React from 'react';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';
import { Container, Input, Label, ViewInput, ViewForm } from './style';
import { Button, Stack } from '@mui/material';

const schema = yup.object().shape({
  name: yup.string().required('Por  favor, digite o nome do produto!'),
  description: yup.string().required('Por  favor, digite a descrição do produto!'),
  price: yup.number().required('Por favor, informe o preço'),
  categoryId: yup.number().required('Por favor, informe a categoria'),
  color: yup.string().required('Por favor, informe a cor do produto'),
});

const Product: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = handleSubmit(async (data: any) => {
    try {
      api.post('/product', {
        name: data.name,
        description: data.description,
        color: data.color,
        categoryId: data.categoryId,
        price: data.price,
      });
      reset();
      toast.success('Produto criado com sucesso');
    } catch (error) {
      toast.error('Não foi possível criar o produto');
    }
  });

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
            <Input {...register('categoryId', { required: true })} />
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
