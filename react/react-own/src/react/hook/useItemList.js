import React, { useState, useEffect } from 'react'
function useItemList(params = { id: 1, page: 1, pageSize: 10 }) {
    const [id, setId] = useState(params.id)
    const [page, setPage] = useState(params.page)
    const [pageSize, setPageSize] = useState(params.pageSize)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({ items: [] })

    useEffect(() => {
        setLoading(true)
        ListItems({ id, page, pageSize }).then(res => {
            setData(res)
            setLoading(false)
        })
    }, [id, page, pageSize])
    return {
        loading,
        data,
        page,
        pageSize,
        setId,
        setPage,
        setPageSize
    }
}

const ListItems = async (p) => api('/', 'get', p)

const api = (path, method, params) => new Promise(resolve => {
    const { page, pageSize } = params
    setTimeout(() => {
        resolve({
            items: Array.from({ length: pageSize }).map(() => `${page} - ${Math.random()}`),
            page,
            pageSize
        })
    }, 500)
})


function Page() {
    const { loading, data, setPage, setPageSize } = useItemList({ id: 1, page: 1, pageSize: 5 })

    return (
        <div>
            <h3>test page list</h3>
            <div>
                <button onClick={() => setPage(page => page - 1)}>上一页</button>
                <button onClick={() => setPage(page => page + 1)}>下一页</button>
                <input onInput={(e) => setPageSize(e.target.value)}></input> 条/页
            </div>
            {
                loading ? <p>loading....</p> :
                    data.items.map(item => <p key={item}>{item}</p>)
            }

        </div>
    )
}

export default Page