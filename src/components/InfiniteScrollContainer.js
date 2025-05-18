import React, { useState, useEffect, useRef, Fragment } from 'react';
import { api } from '../request/Api';
import $ from "jquery";

export const InfiniteScrollContainer = ({className, defaultItems, apiPath, children, batchSize, loadingInfoOff}) => {
    const [items, setItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const loaderRef = useRef();

    const callByPath = (root, data) =>{
        const parts = apiPath.split('.');
        const methodName = parts.pop();
        const context = parts.reduce((o, key) => o?.[key], root);
      
        if (context && typeof context[methodName] === 'function') {
            return context[methodName](data);
        }
        throw new Error(`"${apiPath}" can only be an array using "." to seperate methods and classes.`);
    }

    useEffect(()=>{
        if(!Array.isArray(defaultItems)) return;
        setItems(defaultItems);
    }, [defaultItems]);
  
    useEffect(() => {
        const container = $('[data-layout-scroll-container]').length 
            ? $('[data-layout-scroll-container]').get(0) 
            : window;

        const observer = new IntersectionObserver(
            ([entry])=>{
                if (entry.isIntersecting && hasMore) {
                    if (!hasMore) return;
                    setOffset((prev)=>prev + batchSize);
                    callByPath({api}, {offset: offset, limit: batchSize}).then((response)=>{
                        setItems((prev)=>[...prev, ...response.data.data]);
                        if(response.data.data.length < batchSize) setHasMore(false);
                    }).catch((error) => {
                        setHasMore(false);
                    });
                }
            },
            {threshold: 1, root: null}
        );

        let lastScrollTop = 0;
        const triggerScroll = () => {
            const scrollTop = $(container).scrollTop();
            if(scrollTop < lastScrollTop) setHasMore(true);
            lastScrollTop = scrollTop;
        }
        $(container).on('scroll', triggerScroll);
    
        const node = loaderRef.current;
        if (node) observer.observe(node);
        return ()=>{
            node && observer.unobserve(node);
            $(container).off('scroll', triggerScroll);
        }
    }, []);
  
    return (
      <div className={className}>
            {items.map((item, key)=>(children(item, key)))}
            <div ref={loaderRef} hidden={!hasMore}>
                <div className="d-flex justify-content-center">
                    <div className="three-dot-loader text-center">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
                </div>
                <div className="text-center py-2">Loading more...</div>
            </div>
            {!hasMore && <div className="text-center py-4 text-gray-500">No more data</div>}
      </div>
    )
}
