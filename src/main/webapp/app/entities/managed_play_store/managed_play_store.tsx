import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col,Badge,Alert } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { IRootState } from 'app/shared/reducers';
import { CCard, CCardHeader } from '@coreui/react';
import QRCode from "react-qr-code";
export type IEnrollmentProps = StateProps;

export const ManagedPlayStore = () => {

  const style = {
    'paddingLeft':'10px',
    'paddingRight':'10px',
    'paddingTop':'10px',
    'paddingBottom':'10px'
  }

  return (
    <CCard>
      <CCardHeader>
        Managed Google Play Store
      </CCardHeader>
      <div style={style}>
          <p>
            <Alert color="success">
              Click the link below to access The Managed google Play Store: <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<a href='https://storage.googleapis.com/android-management-api-samples/managed_play_iframe.html?mode=SELECT&token=WAP_6YqrvLcK4VYfWegT_ga2Thx7yzYI76VGYP_3lIBx-E5gYZ2l2ayWg6shratJAXnaArc1_B5XuWYjsHVNKm2Mp6SDpvu8mHeMQLuagfmvuFTrupHn7l7neeUdPVjgwVa-2IE0IBgAs79ivSv6lAtRwcsAUX7ewqJElt6z_r2toN-b_pi3cNt8wzaEnzDdeBMKvpR89nFD5rOlN2kWyg4ecPWvKZ3v7YY_-5wt95jq-rsSBf1PtDnxUcMtR-MTamlqb1cUROQlE' target='_blank' rel='noopener noreferrer'> Managed Play Store Link </a> <br/>
             </Alert>
          </p>
      </div>
    </CCard>
    );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ManagedPlayStore);
