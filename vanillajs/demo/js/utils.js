/**
 * 
 * @param {*} list 
 * @param  {...any} rest 
 * @rest [{key, value}, {key, value}]
 */

export const findInList = (list, ...rest) => {
    let next = list.head;
    while(next) {
        let flag = 0
        rest.forEach(item => {
            if (next[item.key] === item.value) flag++;
        })
        if (flag === rest.length) return true;
        next = next.next
    }
    return false;
}