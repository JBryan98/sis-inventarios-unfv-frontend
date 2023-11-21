import React, { Dispatch, SetStateAction } from 'react'
import { ApiResponse } from '../interface/ApiResponse';
import { TableFooter, TablePagination, TableRow } from '@mui/material';
import TablePaginationActions from './TablePaginationActions';

interface Props<T> {
  rowCount: number;
  page: number;
  rowsPerPage: number;
  params: Record<string, string>;
  setParams: Dispatch<SetStateAction<Record<string, string>>>
}

const CustomTableFooter = <T extends ApiResponse<T>>({rowCount, page, rowsPerPage, params, setParams}: Props<T>) => {
    const handlePageChange = (e: unknown, page: number) => {
      setParams({
        ...params,
        page: String(page + 1),
      });

    };
    const handleChangeRowsPerPage = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setParams({
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
          rowsPerPageOptions={Array.from(new Set([Number(params.size), 5, 10, 25, 50])).sort((a, b) => a - b)}
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