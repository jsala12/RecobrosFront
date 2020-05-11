import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ListausuariosItem {
  login: string;
  nombreRol: string;
  email: string;
  fechaModificacion: string;
  nombre: string;
  estado: string;
}

// TODO: replace this with real data from your application
/*const EXAMPLE_DATA: ListausuariosItem[] = [
  {login: 'Prueba', nombreRol: 'PruebaRol', email: 'prueba@BdB.com.co', fechaModificacion: '17/01/1996', nombre: 'Prueba', estado: 'Activo'},
];*/

/**
 * Data source for the Listausuarios view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListausuariosDataSource extends DataSource<ListausuariosItem> {
  data: ListausuariosItem[]/* = EXAMPLE_DATA*/;
  paginator: MatPaginator;
  sort: MatSort;

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ListausuariosItem[]> {
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
  private getPagedData(data: ListausuariosItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListausuariosItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'login': return compare(a.login, b.login, isAsc);
        case 'nombreRol': return compare(+a.nombreRol, +b.nombreRol, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'fechaModificacion': return compare(+a.fechaModificacion, +b.fechaModificacion, isAsc);
        case 'nombre': return compare(+a.nombre, +b.nombre, isAsc);
        case 'estado': return compare(+a.estado, +b.estado, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
