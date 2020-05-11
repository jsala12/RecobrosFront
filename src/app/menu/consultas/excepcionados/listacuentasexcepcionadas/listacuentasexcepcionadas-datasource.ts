import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListacuentasexcepcionadasItem {
  /*id:number;
  name:string;*/
  tipoCuenta: string;
  numeroCuentaRechazo: string;
  codigoTransaccion: string;
  fechaDeuda: string;
  tipoIdentificacion: string;
  numeroDocumento: string;
  nombreCliente: string;
  valorDeuda: string;
  valorPendiente: string;
  detalleCatalogo: string;
  detalleExcepcion: string;
  codigoOficinaOCeo:string;
  nombreOficinaOCeo:string;
  resultado: string;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: ListacuentasexcepcionadasItem[] = [
  {
    tipoCuenta: "string",
    numeroCuentaRechazo: "number",
    codigoTransaccion: "number",
    fechaDeuda: "number",
    tipoIdentificacion: "string",
    numeroDocumento: "string",
    nombreCliente: "string",
    valorDeuda: "number",
    valorPendiente: "ber",
    detalleCatalogo: "string",
    detalleExcepcion: "string",
    codigoOficinaOCeo:"number",
    nombreOficinaOCeo:"string",
    resultado: "string"},
];*/
/**
 * Data source for the Listacuentasexcepcionadas view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListacuentasexcepcionadasDataSource extends DataSource<ListacuentasexcepcionadasItem> {
  data: ListacuentasexcepcionadasItem[]/*= EXAMPLE_DATA*/;
  paginator: MatPaginator;
  sort: MatSort;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListacuentasexcepcionadasItem[]> {
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
  private getPagedData(data: ListacuentasexcepcionadasItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListacuentasexcepcionadasItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'tipoCuenta': return compare(a.tipoCuenta, b.tipoCuenta, isAsc);
        case 'numeroCuentaRechazo': return compare(+a.numeroCuentaRechazo, +b.numeroCuentaRechazo, isAsc);
        case 'codigoTransaccion': return compare(+a.codigoTransaccion, +b.codigoTransaccion, isAsc);
        case 'fechaDeuda': return compare(+a.fechaDeuda, +b.fechaDeuda, isAsc);
        case 'tipoIdentificacion': return compare(+a.tipoIdentificacion, +b.tipoIdentificacion, isAsc);
        case 'numeroDocumento': return compare(+a.numeroDocumento, +b.numeroDocumento, isAsc);
        case 'nombreCliente': return compare(+a.nombreCliente, +b.nombreCliente, isAsc);
        case 'valorDeuda': return compare(+a.valorDeuda, +b.valorDeuda, isAsc);
        case 'valorPendiente': return compare(+a.valorPendiente, +b.valorPendiente, isAsc);
        case 'detalleCatalogo': return compare(+a.detalleCatalogo, +b.detalleCatalogo, isAsc);
        case 'detalleExcepcion': return compare(+a.detalleExcepcion, +b.detalleExcepcion, isAsc);
        case 'codigoOficinaOCeo': return compare(+a.codigoOficinaOCeo, +b.codigoOficinaOCeo, isAsc);
        case 'nombreOficinaOCeo': return compare(+a.nombreOficinaOCeo, +b.nombreOficinaOCeo, isAsc);
        case 'resultado': return compare(+a.resultado, +b.resultado, isAsc); 
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
