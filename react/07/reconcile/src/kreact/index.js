import { TEXT } from "./const"

function createElement(type, config, ...children) {
    if (config) {
        delete config.__self;
        delete config.__source;
    }
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
        key: config.key,
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

function cloneElement(element, config, ...children) {
    const props = Object.assign({}, element.props, config)
    props.children = children.map(child => typeof child === 'object' ? child : createTextNode(child))
    const elementType = element.type
    if (elementType && elementType.defaultProps) {
        const defaultProps = elementType.defaultProps;
        for (let propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }
    return {
        key: element.key || config.key,
        type: element.type,
        props
    }
}

export default {
    createElement,
    cloneElement
}