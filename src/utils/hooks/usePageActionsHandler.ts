import { ApiResponse } from "../interface/ApiResponse";
import { Pageable } from "../interface/Pageable";
import { useParamsHandler } from "./useParamsHandler";

/**
 * Custom hook para actualizar los datos de la tabla y la página actual
 * Si se inserta una nueva entidad, entonces se redirige a la página 1
 * Si se actualiza una entidad, se mantiene la página actual
 * @param urlSearchParams son los params de la URL que trae la propiedad searchParams de Nextjs
 * @param data data que se trae de la api, necesario para actualizar la información de la tabla
 */

export const usePageActionsHandler = <E extends {id: number | string}, T extends Pageable>(urlSearchParams: T, data: ApiResponse<E> | null) => {
  const { pushParamsToUrl } = useParamsHandler();
  const currentPage = Number(urlSearchParams.page) || 1;

  /**
   * Método para eliminar datos de la tabla
   * @param id Identificador de la fila a eliminar
   * @param key Key del identificador de la fila
   * @example {nombre:: "1"} entonces la key sería 'nombre'
   */
  const setPageAfterDelete = (id: string | number, key: string) => {
    let newPage = data?.content.length == 1 ? currentPage - 1 : currentPage;
    if (newPage < 1) {
      newPage = 1;
    }
    updateDataAfterDelete(id, key)
    pushParamsToUrl({
      ...urlSearchParams,
      page: newPage,
    });
  };

  /**
   * Método que maneja el param "page" de la url luego de una actualizar o crear un registro|
   * @param insert True si se creo un nuevo registro, false si se actualizo un registro
   * @param entityPersisted Respuesta de la api con el registro creado o modificado
   */
  const setPageOnPersist = (insert: boolean, entityPersisted: E) => {
    if (insert) {
      updateDataAfterCreate(entityPersisted);
      pushParamsToUrl({
        ...urlSearchParams,
        page: "1",
      });
    } else {
      updateDataAfterUpdate(entityPersisted);
      pushParamsToUrl({
        ...urlSearchParams,
        page: currentPage,
      });
    }
  };

  /**
   * Método para actualizar los datos de la tabla luego de crear un nuevo registro
   * Si el total de elementos actuales en la tabla no supera al máximo permitido,
   * se añade el neuvo registro al arreglo de datos
   * Si el total de elementos actuales en la tabla es igual al máximo permitido,
   * solo se cambia el total de elementos de la página en +1
   * @param entityPersisted Respuesta de la api con el registro creado
   */
  const updateDataAfterCreate = (entityPersisted: E) => {
    const tableRowsPerPage = Number(urlSearchParams.size) || 10;
    if (data) {
      if (data.content.length < tableRowsPerPage) {
        data.content.push(entityPersisted);
        data.totalElements = data.totalElements + 1
      } else {
        data.totalElements = data.totalElements + 1;
      }
    }
  };

  /**
   * Método para actualizar los datos de la tabla luego de actualizar un registro
   * @param entityPersisted Respuesta de la api con el registro actualizado
   */
  const updateDataAfterUpdate = (entityPersisted: E) => {
    if (data) {
      let index = data.content.findIndex(
        (item) => item.id === entityPersisted.id
      );
      if (index !== -1) {
        data.content[index] = entityPersisted;
      }
    }
  };

  const updateDataAfterDelete = (id: string | number, key: string) => {
    if(data) {
      let index = data.content.findIndex(item => item[key as keyof typeof item] === id);
      if(index !== -1) {
        data.content.splice(index, 1)
      }
    }
  }

  return { setPageAfterDelete, setPageOnPersist };
}