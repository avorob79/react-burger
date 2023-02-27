import { ChangeEvent, useState } from 'react';

export default function useForm<T>(inputValues: T) {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  return { values, setValues, handleChange };
}