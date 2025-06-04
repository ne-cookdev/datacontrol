import "./NoFoundErrorPage.css";

export const NoFoundErrorPage = () => {
  return (
    <>
      <main className="nofounderrorpage_background">
        <div className="nofounderrorpage_container">
          <h1 className="nofounderrorpage_h1">Ошибка 404</h1>
          <h2 className="nofounderrorpage_h2">Такой страницы нет</h2>
          <a href="/" className="nofounderrorpage_a">
            Главная
          </a>
        </div>
      </main>
    </>
  );
};
