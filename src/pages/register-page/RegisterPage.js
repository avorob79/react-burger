import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './RegisterPage.module.css';

function RegisterPage() {
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

  const register = (e) => {};

  return (
    <div className={styles.page}>
      <form className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type="text" name="name" placeholder="Имя" value={form.name} onChange={handleChange} extraClass="mt-6" />
        <EmailInput type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} extraClass="mt-6" />
        <PasswordInput name="password" placeholder="Пароль" icon="ShowIcon" value={form.password} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="button" type="primary" size="large" onClick={register} extraClass="mt-6">Зарегистрироваться</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
        <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
}

export default React.memo(RegisterPage);