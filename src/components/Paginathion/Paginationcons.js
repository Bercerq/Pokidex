import React, { useEffect } from 'react'
import Pokemon_body_css from '../Pokemon_body/Pokemon_body.module.css'
import ReactPaginate from 'react-paginate'
import './PaginathionStyles.css'

const Paginationcons = ({
  setCurPages,
  totalCount,
  limitList,
  setChangeLimit,
  changeLimit
}) => {
  useEffect(() => {
    if (totalCount && limitList) {
      let CeilsNums = Math.ceil(totalCount / limitList)
      const totalCountLimit = new Array(CeilsNums).fill(' ')

      let ind = 0
      const temp = totalCountLimit.reduce(acc => {
        ind++
        return [...acc, ind]
      }, [])
      setCurPages(temp)
    }
  }, [totalCount,setCurPages, limitList])

  const limitsArr = [10, 50, 100]

  const handlePageClick = data => {
    setCurPages(data.selected * 10)
  }

  return (
    <div className={Pokemon_body_css.paginathion}>
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        pageClassName={'pagination'}
        breakClassName={'break-me'}
        pageCount={totalCount / changeLimit}
        marginPagesDisplayed={1}
        pageRangeDisplayed={5}
        pageLinkClassName={'pageLinkClassName'}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'activeClassName'}
        activeLinkClassName={'activeLinkClassName'}
        onPageChange={handlePageClick}
        previousClassName={'previousClassName'}
        breakLinkClassName={'break-me'}
        nextClassName={'nextClassName'}
      />
      <span className={Pokemon_body_css.fullLimitList}>
        <span className={Pokemon_body_css.textlimit}> limit list</span>
        <span className={Pokemon_body_css.LimitList}>
          {limitsArr &&
            limitsArr.map(item => (
              <button
                key={Math.random()}
                className={Pokemon_body_css.limitPagi}
                onClick={() => setChangeLimit(item)}
              >
                {item}
              </button>
            ))}
        </span>
      </span>
    </div>
  )
}

export default Paginationcons
