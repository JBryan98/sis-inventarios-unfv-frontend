export function hasChildren(item: any) {  
    if (item.children === undefined) {
      return false;
    }
  
    if (item.children.constructor !== Array) {
      return false;
    }
  
    if (item.children.length === 0) {
      return false;
    }
  
    return true;
  }