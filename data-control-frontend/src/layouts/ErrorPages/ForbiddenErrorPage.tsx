import "./ForbiddenErrorPage.css";

export const ForbiddenErrorPage = () => {
  return (
    <main className="forbiddenerrorpage_background">
      <div className="forbiddenerrorpage_container">
        <h1 className="forbiddenerrorpage_h1">Ошибка 403</h1>
        <h2 className="forbiddenerrorpage_h2">У вас нет прав на просмотр этой страницы, попробуйте зайти в другой аккаунт</h2>
        <a href="/auth/login" className="forbiddenerrorpage_a">
          Войти в другой аккаунт
        </a>
      </div>
    </main>
  );
};
