import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ClienteItem {
  documento: string;
  tipo: string;
  detalle: string;
  estado: string;
  fechaCreacion: string;
  usrautorizo: string;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: ClienteItem[] = [
  {documento: '1082478406', tipo: 'Cédula de ciudadanía', detalle: 'Se excepciona de todo', estado: 'Activo'},
];*/

/**
 * Data source for the Cliente view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ClienteDataSource extends DataSource<ClienteItem> {
  data: ClienteItem[] /*= EXAMPLE_DATA*/;
  paginator: MatPaginator;
  sort: MatSort;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ClienteItem[]> {
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
  private getPagedData(data: ClienteItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ClienteItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'documento': return compare(a.documento, b.documento, isAsc);
        case 'tipo': return compare(+a.tipo, +b.tipo, isAsc);
        case 'detalle': return compare(+a.detalle, +b.detalle, isAsc);
        case 'estado': return compare(+a.estado, +b.estado, isAsc);
        case 'fechaCreacion': return compare(+a.fechaCreacion, +b.fechaCreacion, isAsc);
        case 'usrautorizo': return compare(+a.usrautorizo, +b.usrautorizo, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
