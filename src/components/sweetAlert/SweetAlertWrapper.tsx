import React from 'react';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface SweetAlertWrapperProps {
  show: boolean;
  title?: string;
  titleText?: string;
  text?: string;
  html?: string;
  icon?: SweetAlertOptions['icon'];
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onConfirm?: (result: SweetAlertResult) => void;
  onCancel?: (result: SweetAlertResult) => void;
}

const SweetAlertWrapper: React.FC<SweetAlertWrapperProps> = ({
  show,
  onConfirm,
  onCancel,
  ...props
}) => {
  React.useEffect(() => {
    if (show) {
      MySwal.fire(props).then((result) => {
        if (result.isConfirmed && onConfirm) {
          onConfirm(result);
        } else if (result.dismiss && onCancel) {
          onCancel(result);
        }
      });
    }
  }, [show, onConfirm, onCancel, props]);

  return null;
};

export default SweetAlertWrapper;
