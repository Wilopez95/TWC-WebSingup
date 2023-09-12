import Modal from '../modal';
import Button from '../button.js';

const ChargeModal = ({ isOpen, onClose, historyData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="charge-modal">
        <p className="charge-modal__title">Charges</p>
        <div className="charge-modal__container">
          <table className="charge-modal__table">
            <thead>
              <tr>
                <th className="charge-modal__table__header">Date</th>
                <th className="charge-modal__table__header">Plan</th>
                <th className="charge-modal__table__header">Status</th>
                <th className="charge-modal__table__header">Amount*</th>
              </tr>
            </thead>
            <tbody className="charge-modal__table__body">
              <tr>
                <td colSpan="4">
                  <div className="charge-modal__table__content">
                    <table>
                      <tbody>
                        {historyData.map((item, key) => {
                          return (
                            <tr key={key}>
                              <td className="charge-modal__table__data">{item.date}</td>
                              <td className="charge-modal__table__data">{item.plan}</td>
                              <td className="charge-modal__table__data">{item.status}</td>
                              <td
                                className={`charge-modal__table__data ${
                                  item.status === 'credit'
                                    ? 'charge-modal__green-color'
                                    : 'charge-modal__red-color'
                                }`}
                              >
                                {item.amount}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="charge-modal__button-container">
          <div>
            <Button
              text="Close"
              modifier="charge-modal__button-container__button"
              clickEvent={onClose}
            />
          </div>
        </div>
        <p className="charge-modal__disclaimer">*All prices are exclusive of tax.</p>
      </div>
    </Modal>
  );
};

export default ChargeModal;
