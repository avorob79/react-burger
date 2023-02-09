import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../../services/actions/auth';
import styles from './ResetPasswordPage.module.css';

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(state => state.auth.user);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(form.password, form.code))
      .then(() => navigate("/login", { replace: true }));
  };

  if (location.state?.prevPathName !== "/forgot-password" || !!user) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput name="password" placeholder="Введите новый пароль" icon="ShowIcon" value={form.password} onChange={handleChange} extraClass="mt-6" />
        <Input type="text" name="code" placeholder="Введите код из письма" value={form.code} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">Сохранить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to="/login" replace={true} className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
}

export default React.memo(ResetPasswordPage);