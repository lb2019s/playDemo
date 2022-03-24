import { TEXT } from "./const"

function createElement(type, config, ...children) {
    const props = {
        ...config,
        children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
    }
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (let propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    return {
        type,
        props
    }
}

function createTextNode(text) {
    return {
        type: TEXT,
        props: {
            children: [],
            nodeValue: text
        }
    }
}

export default {
    createElement
}