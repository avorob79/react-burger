import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/auth';
import styles from './ProfileForm.module.css';

function ProfileForm() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user) || { name: "", email: "" };

  const [form, setValue] = useState({
    ...user,
    password: ""
  });

  useEffect(() => {
    setValue({
      ...user,
      password: ""
    })
  }, [user]);

  const handleChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(form.name, form.email, form.password));
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setValue({
      ...user,
      password: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input type="text" name="name" placeholder="Имя" icon="EditIcon" value={form.name} onChange={handleChange} />
      <EmailInput name="email" placeholder="Логин" isIcon={true} value={form.email} onChange={handleChange} extraClass="mt-6" />
      <PasswordInput name="password" placeholder="Пароль" icon="EditIcon" value={form.password} onChange={handleChange} extraClass="mt-6" />
      {(form.name !== user.name || form.email !== user.email || !!form.password) && (
        <React.Fragment>
          <Button htmlType="submit" type="primary" size="large" extraClass={`${styles.button} mt-6 mr-5`}>Сохранить</Button>
          <Button htmlType="button" type="primary" size="large" onClick={handleCancel} extraClass={`${styles.button} mt-6 ml-5`}>Отмена</Button>
        </React.Fragment>
      )}
    </form>
  );
}

export default React.memo(ProfileForm);