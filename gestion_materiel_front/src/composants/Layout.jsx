
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
    return (
      <div>
        <header>
          <Navbar />
        </header>
        <div className="flex">
          <main className="ml-64 p-4 w-full">
            {/* Sidebar without children */}
            <Sidebar /> 
            {/* Children rendered in the main section */}
            {children}
          </main>
        </div>
      </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired, // Déclaration de children comme prop obligatoire
  };
