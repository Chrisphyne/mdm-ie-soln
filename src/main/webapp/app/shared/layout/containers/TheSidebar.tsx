import React from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../reducers/coreui'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const paddingTop = {
  "marginTop" : "67px"
}

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useTypedSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      style={paddingTop}
      show={show}
      unfoldable
      onShowChange={(val: boolean) => dispatch({type: 'set', sidebarShow: val })}
    >

      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
          />

      </CSidebarNav>

      <CSidebarMinimizer className="c-d-md-down-none">
      <div>
        <img src="content/images/intelligentso.png" alt="Logo" />
      </div>
      </CSidebarMinimizer>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
