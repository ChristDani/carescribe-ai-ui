import "./App.css";
import Layout from "./components/layout/layout";
import DashboardPage from "./pages/dashboard";

function App() {
  return (
    <Layout>
      <div className="p-4">
        <DashboardPage />
      </div>
    </Layout>
  );
}

export default App;
