import React, { useEffect, useState } from "react";
import { List, arrayMove } from "react-movable";
import { useAuth } from "../provider/AuthProvider";

export const DragDropContainer = ({items, onReordered, isMovable, children}) =>{
    const [values, setValues] = useState(items);
  
    const handleMove = ({oldIndex, newIndex})=>{
      setValues((prevValues)=>arrayMove(prevValues, oldIndex, newIndex));
    }

    useEffect(()=>{
        onReordered?.(values);
    }, [values]);
    
    return (
        <>
            {
                isMovable ?
                <List
                    values={values}
                    onChange={handleMove}
                    isOutOfBounds={false}
                    renderList={({children, props})=><div {...props} key={'parent'}>{children}</div>}
                    renderItem={({value, props, index})=><div {...props} key={index}>{children(value, index)}</div>}
                /> :
                values.map((value, key)=><div key={key}>{children(value, key)}</div>)
            }
            
        </>
    )
}
