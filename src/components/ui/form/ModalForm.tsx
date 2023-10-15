import React from 'react'
import { Card, CardContent, CardHeader, Modal } from "@mui/material";
import { modalCardStyle } from './modalCardStyle';

interface Props {
    children: React.ReactNode;
    open: boolean;
    modalFormCardStyle?: object;
    title: string;
    handleClose: () => void;
}

const ModalForm = ({children, open, modalFormCardStyle, title, handleClose}: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Card sx={modalFormCardStyle || modalCardStyle}>
        <CardHeader title={title} />
        <hr />
        <CardContent>{children}</CardContent>
      </Card>
    </Modal>
  );
}

export default ModalForm