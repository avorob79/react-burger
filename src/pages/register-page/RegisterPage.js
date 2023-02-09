import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/auth';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const [form, setValue] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form.name, form.email, form.password));
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
        <Input type="text" name="name" placeholder="Имя" value={form.name} onChange={handleChange} extraClass="mt-6" />
        <EmailInput type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} extraClass="mt-6" />
        <PasswordInput name="password" placeholder="Пароль" icon="ShowIcon" value={form.password} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">Зарегистрироваться</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
        <Link to="/login" replace={true} className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
}

export default React.memo(RegisterPage);