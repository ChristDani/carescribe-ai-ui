import Header from "./header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-h-screen h-full flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 p-4 overflow-x-hidden overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

export default Layout;