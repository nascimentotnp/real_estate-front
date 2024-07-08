declare module 'sweetalert2-react-content' {
    import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
    import Swal from 'sweetalert2';
    import * as React from 'react';
  
    export default function withReactContent(
      swal: typeof Swal
    ): {
      fire: (
        options: SweetAlertOptions
      ) => Promise<SweetAlertResult>;
    };
  }
  