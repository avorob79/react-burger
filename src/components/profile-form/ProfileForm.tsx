import React, { FC, FormEvent, SyntheticEvent, useEffect } from 'react';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm, useDispatch, useSelector } from '../../hooks';
import { updateUser } from '../../services/actions/auth';
import { IUser } from '../../services/types';
import { selectors } from '../../services';
import styles from './ProfileForm.module.css';

const emptyUser = { email: "", name: "" };

const ProfileForm: FC = () => {
  const dispatch = useDispatch();

  const user: IUser = useSelector(selectors.user) || emptyUser;

  const { values, setValues, handleChange } = useForm<IUser & { password: string }>({
    ...user,
    password: ""
  });

  useEffect(() => {
    setValues({
      ...user,
      password: ""
    })
  }, [setValues, user]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateUser(values.name, values.email, values.password));
  }

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setValues({
      ...user,
      password: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input type="text" name="name" placeholder="Имя" icon="EditIcon" value={values?.name} onChange={handleChange} />
      <EmailInput name="email" placeholder="Логин" isIcon={true} value={values?.email} onChange={handleChange} extraClass="mt-6" />
      <PasswordInput name="password" placeholder="Пароль" icon="EditIcon" value={values.password} onChange={handleChange} extraClass="mt-6" />
      {(values?.name !== user.name || values?.email !== user.email || !!values.password) && (
        <React.Fragment>
          <Button htmlType="button" type="secondary" size="large" onClick={handleCancel} extraClass={`${styles.button} mt-6`}>Отмена</Button>
          <Button htmlType="submit" type="primary" size="large" extraClass={`${styles.button} mt-6`}>Сохранить</Button>
        </React.Fragment>
      )}
    </form>
  );
};

export default React.memo(ProfileForm);