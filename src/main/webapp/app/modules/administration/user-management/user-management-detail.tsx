import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col,Badge,Alert } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { languages } from 'app/config/translation';
import { getUser } from './user-management.reducer';
import { IRootState } from 'app/shared/reducers';
import { CCard, CCardHeader } from '@coreui/react';
import QRCode from "react-qr-code";

export interface IUserManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {}

export const UserManagementDetail = (props: IUserManagementDetailProps) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
  }, []);

  const { user } = props;
  const style = {
    'paddingLeft':'10px',
    'paddingRight':'10px'
  }

  return (
    <CCard>
      <div style={style}>

        <CCardHeader>
          <h2>
            <Translate contentKey="userManagement.detail.title">User</Translate> [<b>{user.login}</b>]
          </h2>
          <p>
            <Alert color="success">
              To enroll this user, follow the steps below: <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;1. On a new or factory-reset device, tap the screen six times in the same spot.
              This triggers the device to prompt you to scan a QR code. <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;2.Scan the QR code below   to enroll and provision the device.<br/>
            </Alert>
          </p>
        </CCardHeader>
        <Row>
          <Col sm="12">
            <Row>
              <Col md="4">
                <dl className="jh-entity-details">
                  <dt>
                    <Translate contentKey="userManagement.login">Login</Translate>
                  </dt>
                  <dd>
                    <span>{user.login}</span>&nbsp;
                    {user.activated ? (
                      <Badge color="success">
                        <Translate contentKey="userManagement.activated">Activated</Translate>
                      </Badge>
                    ) : (
                      <Badge color="danger">
                        <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                      </Badge>
                    )}
                  </dd>
                  <dt>
                    <Translate contentKey="userManagement.firstName">First Name</Translate>
                  </dt>
                  <dd>{user.firstName}</dd>
                  <dt>
                    <Translate contentKey="userManagement.lastName">Last Name</Translate>
                  </dt>
                  <dd>{user.lastName}</dd>
                  <dt>
                    <Translate contentKey="userManagement.email">Email</Translate>
                  </dt>
                  <dd>{user.email}</dd>
                  <dt>
                    <Translate contentKey="userManagement.langKey">Lang Key</Translate>
                  </dt>
                  <dd>{user.langKey ? languages[user.langKey].name : undefined}</dd>
                  <dt>
                    <Translate contentKey="userManagement.createdBy">Created By</Translate>
                  </dt>
                  <dd>{user.createdBy}</dd>
                  <dt>
                    <Translate contentKey="userManagement.createdDate">Created Date</Translate>
                  </dt>
                  <dd>{user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}</dd>
                  <dt>
                    <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                  </dt>
                  <dd>{user.lastModifiedBy}</dd>
                  <dt>
                    <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                  </dt>
                  <dd>
                    {user.lastModifiedDate ? (
                      <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                    ) : null}
                  </dd>
                  <dt>
                    <Translate contentKey="userManagement.profiles">Profiles</Translate>
                  </dt>
                  <dd>
                    <ul className="list-unstyled">
                      {user.authorities
                        ? user.authorities.map((authority, i) => (
                          <li key={`user-auth-${i}`}>
                            <Badge color="info">{authority}</Badge>
                          </li>
                        ))
                        : null}
                    </ul>
                  </dd>
                </dl>
                <Button tag={Link} to="/admin/user-management" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              </Col>
              <Col md="4">
                <QRCode value='{"android.app.extra.PROVISIONING_DEVICE_ADMIN_COMPONENT_NAME":"com.google.android.apps.work.clouddpc/.receivers.CloudDeviceAdminReceiver","android.app.extra.PROVISIONING_DEVICE_ADMIN_SIGNATURE_CHECKSUM":"I5YvS0O5hXY46mb01BlRjq4oJJGs2kuUcHvVkAPEXlg","android.app.extra.PROVISIONING_DEVICE_ADMIN_PACKAGE_DOWNLOAD_LOCATION":"https://play.google.com/managed/downloadManagingApp?identifier=setup","android.app.extra.PROVISIONING_ADMIN_EXTRAS_BUNDLE":{"com.google.android.apps.work.clouddpc.EXTRA_ENROLLMENT_TOKEN":"XZKMILGMXCUSEMOOQTMJ"}' />
              </Col>
            </Row>

          </Col>
        </Row>
      </div>
    </CCard>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
});

const mapDispatchToProps = { getUser };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDetail);
