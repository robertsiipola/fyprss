import Header from "./Header";
import Main from "./Main";

interface LayoutProps {
    children?: JSX.Element;
}

function Layout({ children }: LayoutProps): JSX.Element {
    return (
        <div>
            <Header />
            <Main>{children}</Main>
        </div>
    );
}

export default Layout;
