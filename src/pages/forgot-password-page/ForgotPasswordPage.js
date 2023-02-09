import React from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../../services/actions/auth';
import useForm from '../../hooks/useForm';
import styles from './ForgotPasswordPage.module.css';

function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(state => state.auth.user);

  const { values, handleChange } = useForm({ email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(values.email))
      .then(() => navigate("/reset-password", { replace: true, state: { prevPathName: location.pathname } }));
  };

  if (!!user) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput type="email" name="email" placeholder="Укажите e-mail" value={values.email} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">Восстановить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to="/login" replace={true} className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
}

export default React.memo(ForgotPasswordPage);