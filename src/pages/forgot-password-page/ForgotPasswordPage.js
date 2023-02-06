import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ForgotPasswordPage.module.css';

function ForgotPasswordPage() {
  const [form, setValue] = useState({
    email: ""
  });

  const handleChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const recover = (e) => {};

  return (
    <div className={styles.page}>
      <form className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput type="email" name="email" placeholder="Укажите e-mail" value={form.email} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="button" type="primary" size="large" onClick={recover} extraClass="mt-6">Восстановить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to="/login" className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
}

export default React.memo(ForgotPasswordPage);