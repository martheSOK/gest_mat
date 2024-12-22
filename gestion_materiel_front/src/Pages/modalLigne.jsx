
import PropTypes from 'prop-types';
const Modal = ({ isVisible, onClose, onSave, libelle, quantitePreter, setLibelle, setQuantitePreter }) => {

  if (!isVisible) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3">
        <div className="px-4 py-3 border-b border-gray-200 relative">
          <h2 className="text-lg font-semibold">Modifier la ligne</h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <form>
            <div className="mb-4">
              <label htmlFor="libelleInput" className="block text-sm font-medium text-gray-700">
                Libellé
              </label>
              <input
                type="text"
                id="libelleInput"
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={libelle}
                onChange={(e) => setLibelle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="quantiteInput" className="block text-sm font-medium text-gray-700">
                Quantité prêtée
              </label>
              <input
                type="number"
                id="quantiteInput"
                className="w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={quantitePreter}
                onChange={(e) => setQuantitePreter(Number(e.target.value))}
                required
              />
            </div>
          </form>
        </div>
        <div className="px-4 py-3 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    libelle: PropTypes.string.isRequired,
    quantitePreter: PropTypes.number.isRequired,
    setLibelle: PropTypes.func.isRequired,
    setQuantitePreter: PropTypes.func.isRequired,
  };

export default Modal;
