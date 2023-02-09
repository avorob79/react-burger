import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { login } from '../../services/actions/auth';
import useForm from '../../hooks/useForm';
import styles from './LoginPage.module.css';

function LoginPage() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const { values, handleChange } = useForm({
    email: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values.email, values.password));
  };

  console.log("LoginPage");
  console.log(user);

  if (!!user) {
    return (
      <Navigate to="/" replace={true} />
    );
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={`${styles.form} mb-20`}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput name="email" placeholder="E-mail" value={values.email} onChange={handleChange} extraClass="mt-6" />
        <PasswordInput name="password" placeholder="Пароль" icon="ShowIcon" value={values.password} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">Войти</Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
        <Link to="/register" replace={true} className="text text_type_main-default pl-2">Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">Забыли пароль?
        <Link to="/forgot-password" replace={true} className="text text_type_main-default pl-2">Восстановить пароль</Link>
      </p>
    </div>
  );
}

export default React.memo(LoginPage);