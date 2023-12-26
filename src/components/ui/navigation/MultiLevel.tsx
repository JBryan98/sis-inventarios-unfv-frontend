import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuItem from './SidebarItem';

interface Props {
    item: any;
    handleDrawerClose: () => void;
}

const MultiLevel = ({item, handleDrawerClose}: Props) => {
    const [openChildren, setOpenChildren] = useState(false);
    const handleClick = () => {
        setOpenChildren((prev) => !prev);
    };

  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }} component={"div"}>
        <ListItemButton
          sx={{
            display: "flex",
            minHeight: 48,
            justifyContent: "initial",
            px: 2.5,
          }}
          onClick={handleClick}
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
          {openChildren ? (
            <ExpandLess />
          ) : (
            <ExpandMore/>
          )}
        </ListItemButton>
        <Collapse in={openChildren} timeout="auto" unmountOnExit>
          {item.children?.map((child: any, index: number) => (
            <MenuItem key={index} item={child} handleDrawerClose={handleDrawerClose} isChildren={true}/>
          ))}
        </Collapse>
      </ListItem>
    </>
  );
}

export default MultiLevel