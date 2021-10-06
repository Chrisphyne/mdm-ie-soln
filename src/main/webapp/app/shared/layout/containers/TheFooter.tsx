import React from 'react'
import { CFooter, CLink } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        © Copyright 2020 &nbsp;&nbsp;
        <CLink href="https://intelligentso.com" target="_blank">
          Intelligent
        </CLink>
      </div>
      <div className="ml-auto">
        <span className="mr-1">All Rights Reserved</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
