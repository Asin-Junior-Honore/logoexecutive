import PropTypes from 'prop-types';
import {IoIosCloseCircleOutline} from 'react-icons/io';
import './Modal.css';

const Modal = ({modalOpen, children, setModal, showButtons}) => {
	const closeModal = () => setModal(false);
	const stopPropagation = (event) => event.stopPropagation();

	if (modalOpen) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'scroll';
	}

	return modalOpen ? (
		<div className='modal-bg' onClick={closeModal}>
			<div className='modal-container' onClick={stopPropagation}>
				<IoIosCloseCircleOutline className='modal-close' onClick={closeModal} />
				<div className='modal-content'>{children}</div>
				{showButtons && (
					<footer className='modal-buttons-container'>
						<button className='modal-button' onClick={closeModal}>
							Cancel
						</button>
						<button className='modal-button modal-ok-button'>Okay</button>
					</footer>
				)}
			</div>
		</div>
	) : null;
};

Modal.propTypes = {
	modalOpen: PropTypes.bool,
	children: PropTypes.node,
	setModal: PropTypes.func,
	showButtons: PropTypes.bool,
};

export default Modal;
