import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

interface Props {
  item: any;
  handleDrawerClose: () => void;
  isChildren?: boolean;
}

const SingleItem = ({ item, handleDrawerClose, isChildren }: Props) => {
  const pathName = usePathname();

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Link href={item.href} onClick={() => handleDrawerClose()}>
      <ListItemButton
        sx={{
          display: "flex",
          minHeight: 48,
          justifyContent: "initial",
          px: 2.5,
          pl: isChildren ? 4 : "",
          borderLeft: pathName === item.href ? "4px solid #f07613" : "",
          backgroundColor: pathName === item.href ? "#fff7ed" : "",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={"overline"}
              sx={{
                wordBreak: "break-word",
                lineHeight: "16px",
                fontWeight: pathName === item.href ? "600" : "" 
              }}
            >
              {item.label}
            </Typography>
          }
          sx={{
            width: "93px",
            display: "flex",
            paddingX: "4px",
            whiteSpace: "pre-line",
          }}
        />
      </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default SingleItem