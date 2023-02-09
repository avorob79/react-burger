import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="p-10">
      <h1 className="text text_type_main-large mb-10">Страница не найдена</h1>
      <Link to="/" className="text text_type_main-default">Перейти на главную страницу</Link>
    </div>
  );
}

export default React.memo(NotFoundPage);