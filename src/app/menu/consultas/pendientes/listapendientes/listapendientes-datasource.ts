import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListapendientesItem {
  tipoCuenta: string;
  numeroCuentaRechazo: number;
  codigoTransaccion: number;
  fechaTransaccion: number;
  tipoIdentificacion: string;
  numeroDocumento: string;
  nombreCliente: string;
  valorDeuda: number;
  codigoOficinaOCeo: number;
  nombreOficinaOCeo:string;
  resultado: number;
  valorCobrado: string;
  valorPendiente: number;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: ListapendientesItem[] = [
  {tipoCuenta: 'Prueba', numeroCuentaRechazo: 100000, codigoTransaccion: 100000, fechaTransaccion: "Prueba", tipoIdentificacion: 'Cédula', numeroDocumento: 123, nombreCliente: 'Bj', valorDeuda: 100, codigoOficinaOCeo:1, nombreOficinaOCeo: 'Prueba', resultado: 'Pendiente' },
];*/

/**
 * Data source for the Listapendientes view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListapendientesDataSource extends DataSource<ListapendientesItem> {
  data: ListapendientesItem[];
  paginator: MatPaginator;
  sort: MatSort;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListapendientesItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListapendientesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListapendientesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'tipoCuenta': return compare(a.tipoCuenta, b.tipoCuenta, isAsc);
        case 'numeroCuentaRechazo': return compare(+a.numeroCuentaRechazo, +b.numeroCuentaRechazo, isAsc);
        case 'codigoTransaccion': return compare(+a.codigoTransaccion, +b.codigoTransaccion, isAsc);
        case 'fechaTransaccion': return compare(+a.fechaTransaccion, +b.fechaTransaccion, isAsc);
        case 'tipoIdentificacion': return compare(+a.tipoIdentificacion, +b.tipoIdentificacion, isAsc);
        case 'numeroDocumento': return compare(+a.numeroDocumento, +b.numeroDocumento, isAsc);
        case 'nombreCliente': return compare(+a.nombreCliente, +b.nombreCliente, isAsc);
        case 'valorDeuda': return compare(+a.valorDeuda, +b.valorDeuda, isAsc);
        case 'codigoOficinaOCeo': return compare(+a.codigoOficinaOCeo, +b.codigoOficinaOCeo, isAsc);
        case 'nombreOficinaOCeo': return compare(+a.nombreOficinaOCeo, +b.nombreOficinaOCeo, isAsc);
        case 'resultado': return compare(+a.resultado, +b.resultado, isAsc);
        case 'valorCobrado': return compare(+a.valorCobrado, +b.valorCobrado, isAsc);
        case 'valorPendiente': return compare(+a.valorPendiente, +b.valorPendiente, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
