import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import css from './ConfirmModal.module.css';

const ConfirmModal = ({
  text,
  confirmLabel = 'Yes',
  cancelLabel = 'No',
  onConfirm,
  onCancel,
}) => (
  <Modal onClose={onCancel}>
    <div className={css.wrap}>
      <p className={css.text}>{text}</p>
      <div className={css.actions}>
        <button className={css.cancel} type="button" onClick={onCancel}>
          {cancelLabel}
        </button>
        <Button type="button" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  </Modal>
);

export default ConfirmModal;
