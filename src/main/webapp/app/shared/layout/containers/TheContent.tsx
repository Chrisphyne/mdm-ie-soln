import React from 'react';
import { CContainer } from '@coreui/react';
import ErrorBoundary from 'app/shared/error/error-boundary';
import AppRoutes from 'app/routes';

// routes config
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = () => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
