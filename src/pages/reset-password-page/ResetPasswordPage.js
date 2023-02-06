import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ResetPasswordPage.module.css';

function ResetPasswordPage() {
  const [form, setValue] = useState({
    password: "",
    code: ""
  });

  const handleChange = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const save = (e) => {};

  return (
    <div className={styles.page}>
      <form className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput name="password" placeholder="Введите новый пароль" icon="ShowIcon" value={form.password} onChange={handleChange} extraClass="mt-6" />
        <Input type="text" name="code" placeholder="Введите код из письма" value={form.code} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="button" type="primary" size="large" onClick={save} extraClass="mt-6">Сохранить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
}

export default React.memo(ResetPasswordPage);