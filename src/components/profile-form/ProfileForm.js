import React, { useState } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfileForm.module.css';

function ProfileForm() {
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

  return (
      <form className={`${styles.form} mb-20`}>
        <Input type="text" name="name" placeholder="Имя" icon="EditIcon" value={form.name} onChange={handleChange} extraClass="mt-6" />
        <EmailInput name="email" placeholder="Логин" isIcon={true} value={form.email} onChange={handleChange} extraClass="mt-6" />
        <PasswordInput name="password" placeholder="Пароль" icon="EditIcon" value={form.password} onChange={handleChange} extraClass="mt-6" />
        <Button htmlType="button" type="primary" size="large" extraClass="mt-6">Сохранить</Button>
      </form>
  );
}

export default React.memo(ProfileForm);