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

export const Enrollment = (props: IEnrollmentProps) => {
  const { account } = props;

  const style = {
    'paddingLeft':'10px',
    'paddingRight':'10px',
    'paddingTop':'10px',
    'paddingBottom':'10px'
  }

  return (
    <CCard>
      <CCardHeader>
        Enrollment & Provisioning
      </CCardHeader>
      <div style={style}>
          <p>
            <Alert color="success">
              Follow the steps below to enroll and provision a device: <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;1. On a new or factory-reset device, tap the screen six times in the same spot.
              This triggers the device to prompt you to scan a QR code. <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;2.Scan the QR code below   to enroll and provision the device.<br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp; NB: To enroll with specific/existing user ID go to the specific Device Details page
            </Alert>
          </p>
        <Row>
          <Col sm="12">
            <Row>
              <Col md="4">
              </Col>
              <Col md="4">
                <QRCode value='{"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME\":\"com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver\",\"android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM\":\"I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg\",\"android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION\":\"https://play.google.com/managed/downloadManagingApp?identifier=setup\",\"android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE\":{\"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN\":\"WINFPMWZHDMYATCYIHVK"}' />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </CCard>
    );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Enrollment);
