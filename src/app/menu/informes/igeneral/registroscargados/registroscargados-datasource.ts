import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface RegistroscargadosItem {
  codigoTransaccion: string;
  nombreTransaccion: string;
  cantidad: number;
  valor: string;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: RegistroscargadosItem[] = [
  {codigoTransaccion: "1", nombreTransaccion: 'Prueba', cantidad: 15, valor:'100000'},
];*/

/**
 * Data source for the Registroscargados view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RegistroscargadosDataSource extends DataSource<RegistroscargadosItem> {
  data: RegistroscargadosItem[]/* = EXAMPLE_DATA*/;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<RegistroscargadosItem[]> {
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
  private getPagedData(data: RegistroscargadosItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: RegistroscargadosItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'codigoTransaccion': return compare(a.codigoTransaccion, b.codigoTransaccion, isAsc);
        case 'nombreTransaccion': return compare(+a.nombreTransaccion, +b.nombreTransaccion, isAsc);
        case 'cantidad': return compare(a.cantidad, b.cantidad, isAsc);
        case 'valor': return compare(+a.valor, +b.valor, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}