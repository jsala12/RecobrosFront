import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListatransaccionesItem {
  codigoTransaccion: number;
  valorCobrosExitosos: number;
  cobrosExitosos: number;
  valorDeudasIncobrables: number;
  deudasIncobrables: number;
  valorDeudasExcepcionadas: number;
  deudasExcepcionadas: number;
  valorDeudasPendientes: number;
  deudasPendientes: number;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: ListatransaccionesItem[] = [
  {
    codigoTransaccion: 1,
    valorCobrosExitosos: 2,
    cobrosExitosos: 3,
    valorDeudasIncobrables: 4,
    deudasIncobrables: 5,
    valorDeudasExcepcionadas: 6,
    deudasExcepcionadas: 7,
    valorDeudasPendientes: 8,
    deudasPendientes: 9,
  },
];*/

/**
 * Data source for the Listatransacciones view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListatransaccionesDataSource extends DataSource<ListatransaccionesItem> {
  data: ListatransaccionesItem[] /*= EXAMPLE_DATA*/;
  paginator: MatPaginator;
  sort: MatSort;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListatransaccionesItem[]> {
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
  private getPagedData(data: ListatransaccionesItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListatransaccionesItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'codigoTransaccion': return compare(a.codigoTransaccion, b.codigoTransaccion, isAsc);
        case 'valorCobrosExitosos': return compare(+a.valorCobrosExitosos, +b.valorCobrosExitosos, isAsc);
        case 'cobrosExitosos': return compare(a.cobrosExitosos, b.cobrosExitosos, isAsc);
        case 'valorDeudasIncobrables': return compare(+a.valorDeudasIncobrables, +b.valorDeudasIncobrables, isAsc);
        case 'deudasIncobrables': return compare(a.deudasIncobrables, b.deudasIncobrables, isAsc);
        case 'valorDeudasExcepcionadas': return compare(+a.valorDeudasExcepcionadas, +b.valorDeudasExcepcionadas, isAsc);
        case 'deudasExcepcionadas': return compare(a.deudasExcepcionadas, b.deudasExcepcionadas, isAsc);
        case 'valorDeudasPendientes': return compare(+a.valorDeudasPendientes, +b.valorDeudasPendientes, isAsc);
        case 'deudasPendientes': return compare(+a.deudasPendientes, +b.deudasPendientes, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
