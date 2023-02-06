import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [form, setValue] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const login = (e) => {};

  return (
    <div className={styles.page}>
      <form className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput name="email" placeholder="E-mail" value={form.email} onChange={handleChange} extraClass="mt-6" />
        <PasswordInput name="password" placeholder="Пароль" icon="ShowIcon" value={form.password} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="button" type="primary" size="large" onClick={login} extraClass="mt-6">Войти</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
        <Link to="/register" className="text text_type_main-default pl-2">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Link to="/forgot-password" className="text text_type_main-default pl-2">Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default React.memo(LoginPage);