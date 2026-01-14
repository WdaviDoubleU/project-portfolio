
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import { portfolioData } from './data/content';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {portfolioData.projects.map(project => (
            <Route
              key={project.id}
              path={project.path}
              element={<ProjectPage />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
