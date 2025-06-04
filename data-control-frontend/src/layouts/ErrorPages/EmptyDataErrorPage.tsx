import { Header } from "../../components/Header/Header";
import { Menu } from "../../components/Menu/Menu";

import "./EmptyDataErrorPage.css";

interface EmptyDataErrorPageProps {
  text: string;
  page: string;
  hrefText: string;
  href: string;
}

export const EmptyDataErrorPage: React.FC<EmptyDataErrorPageProps> = (props) => {
  return (
    <main className="emptydataerrorpage_background">
      <Header />
      <Menu page={props.page} hrefText={props.hrefText} href={props.href} />
      <div className="emptydataerrorpage_container">
        <h2 className="emptydataerrorpage_h2">{props.text}</h2>
      </div>
    </main>
  );
};
