import React, { FC, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/auth';
import useForm from '../../hooks/useForm';
import { IUser } from '../../utils/types';
import styles from './RegisterPage.module.css';

const RegisterPage: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.auth.user as IUser);

  const { values, handleChange } = useForm<IUser & { password: string }>({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(register(values.name, values.email, values.password) as any);
  };

  if (!!user) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type="text" name="name" placeholder="Имя" value={values.name} onChange={handleChange} extraClass="mt-6" />
        <EmailInput name="email" placeholder="E-mail" value={values.email} onChange={handleChange} extraClass="mt-6" />
        <PasswordInput name="password" placeholder="Пароль" icon="ShowIcon" value={values.password} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">Зарегистрироваться</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
        <Link to="/login" replace={true} className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
};

export default React.memo(RegisterPage);