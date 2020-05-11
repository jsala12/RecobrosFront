import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListalogsItem {
  usuario: string;
  accion: string;
  fecha: string;
  nombreMenu: string;
  descripcion: string;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: ListalogsItem[] = [
  {usuario: 'recobro', accion: 'crear', fecha: '16/01/1996', nombreMenu: 'Configuración -> Excepciones', descripcion: 'Se ha creado la excepción del cliente con identificación'},
];*/

/**
 * Data source for the Listalogs view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListalogsDataSource extends DataSource<ListalogsItem> {
  data: ListalogsItem[]/* = EXAMPLE_DATA*/;
  paginator: MatPaginator;
  sort: MatSort;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListalogsItem[]> {
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
  private getPagedData(data: ListalogsItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListalogsItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'usuario': return compare(a.usuario, b.usuario, isAsc);
        case 'accion': return compare(+a.accion, +b.accion, isAsc);
        case 'fecha': return compare(+a.fecha, +b.fecha, isAsc);
        case 'nombreMenu': return compare(+a.nombreMenu, +b.nombreMenu, isAsc);
        case 'descripcion': return compare(+a.descripcion, +b.descripcion, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
