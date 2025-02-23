import React, { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";

export const DragDropContainer = ({items, onReordered, children}) =>{
    const [values, setValues] = useState(items);
  
    const handleMove = ({oldIndex, newIndex})=>{
      setValues(arrayMove(items, oldIndex, newIndex));
    }

    useEffect(()=>{
        onReordered?.(values);
    }, [values]);
    
    return (
        <List
            values={values}
            onChange={handleMove}
            isOutOfBounds={false}
            renderList={({children, props})=><div {...props} key={'parent'}>{children}</div>}
            renderItem={({value, props, index})=><div {...props} key={index}>{console.log(value)}{children(value, index)}</div>}
        />
    )
}
