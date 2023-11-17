const Modal = ({ isOpen, onRequestClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={onRequestClose}
            ></div>
            <div className="-top-48 z-50 relative bg-white p-4 rounded-md shadow-lg">
                {children}
            </div>
        </div>
    );
};

export default Modal;
