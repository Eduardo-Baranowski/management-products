import * as React from 'react';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../services/api';

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
    <>
      <form onSubmit={onSubmitHandler}>
        <input {...register('name', { required: true })} />
        {errors.name?.message && <p style={{ color: '#000' }}>{errors.name?.message}</p>}
        <input {...register('description', { required: true })} />
        {errors.description?.message && (
          <p style={{ color: '#000' }}>{errors.description?.message}</p>
        )}
        <input {...register('color', { required: true })} />
        {errors.color?.message && <p style={{ color: '#000' }}>{errors.color?.message}</p>}
        <input {...register('categoryId', { required: true })} />
        {errors.categoryId?.message && (
          <p style={{ color: '#000' }}>{errors.categoryId?.message}</p>
        )}
        <input {...register('price', { required: true })} />
        {errors.price?.message && <p style={{ color: '#000' }}>{errors.price?.message}</p>}
        <input type="submit" />
      </form>
      <ToastContainer autoClose={4000} position="top-right" theme="colored" closeOnClick />
    </>
  );
};

export default Product;
