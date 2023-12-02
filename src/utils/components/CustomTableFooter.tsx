import React from 'react'
import { TableFooter, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from './TablePaginationActions';
import { Pageable } from '../interface/Pageable';
import { useParamsHandler } from '../hooks/useParamsHandler';

interface Props<T> {
  rowCount: number;
  page: number;
  rowsPerPage: number;
  params: T;
}

const CustomTableFooter = <T extends Pageable>({rowCount, page, rowsPerPage, params}: Props<T>) => {
  const {pushParamsToUrl} = useParamsHandler();
    const handlePageChange = (e: unknown, page: number) => {
      pushParamsToUrl({
        ...params,
        page: String(page + 1)
      })
    };
    const handleChangeRowsPerPage = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        pushParamsToUrl({
            ...params,
            page: "1",
            size: String(parseInt(e.target.value, 10)),
          });
    };
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          count={rowCount}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={Array.from(new Set([+params.size || 10, 5, 10, 25, 50])).sort((a, b) => a - b)}
          page={!rowCount || rowCount <= 0 ? 0: page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
}

export default CustomTableFooter