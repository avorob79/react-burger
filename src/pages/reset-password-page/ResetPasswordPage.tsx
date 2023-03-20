import React, { FC, FormEvent } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm, useDispatch, useSelector } from '../../hooks';
import { resetPassword } from '../../services/actions/auth';
import { selectors } from '../../services';
import styles from './ResetPasswordPage.module.css';

const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectors.user);

  const { values, handleChange } = useForm<{ password: string; code: string }>({
    password: "",
    code: ""
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword(values.password, values.code))
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
        <PasswordInput name="password" placeholder="Введите новый пароль" icon="ShowIcon" value={values.password} onChange={handleChange} extraClass="mt-6" />
        <Input type="text" name="code" placeholder="Введите код из письма" value={values.code} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">Сохранить</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?
        <Link to="/login" replace={true} className="text text_type_main-default pl-2">Войти</Link>
      </p>
    </div>
  );
}

export default React.memo(ResetPasswordPage);