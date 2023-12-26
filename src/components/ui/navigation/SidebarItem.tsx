import React from 'react'
import MultiLevel from './MultiLevel';
import SingleItem from './SingleItem';
import { hasChildren } from '@/utils/HasChildren';

interface Props {
    item: any;
    handleDrawerClose: () => void;
    isChildren?: boolean;
}

const SidebarItem = ({item, handleDrawerClose, isChildren}: Props) => {
    const Component = hasChildren(item) ? MultiLevel : SingleItem
    return (
        <Component item={item} handleDrawerClose={handleDrawerClose} isChildren={isChildren}/>
  )
}

export default SidebarItem