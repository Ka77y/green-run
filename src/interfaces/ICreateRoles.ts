import { Observable } from "rxjs";

/**
 * Connect handler with service.
 */
export interface ICreateRoles {
  /**
   *  search for merchant
   */
  roles(
      request: string
  ): Observable<string>;
}
