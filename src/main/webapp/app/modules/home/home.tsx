import './home.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import {Alert, Button, Row, Col } from 'reactstrap';

import {
  CChartPie,
  CChartBar,
  CChartDoughnut
} from '@coreui/react-chartjs'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCardGroup,
  CSpinner,
  CWidgetProgressIcon,
  CWidgetSimple
} from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, RouteComponentProps } from 'react-router-dom';



export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  return (
    <CRow>

      {account && account.login ? (
         <CCol>
                <div className="card-header-actions">
                <Button tag={Link} to="/admin/audits" replace color="#FFFFFF">
                <FontAwesomeIcon icon="bell" />{' '}
                <span className="d-none d-md-inline">
              View Audit Log
            </span>
              </Button> &nbsp;
                </div>
                <br/><br/>
          <CCardGroup className="mb-4">
            <CWidgetSimple
              color="gradient-success"
              text="Enrolled Devices"
            >
              <CIcon name="cil-check-circle" height="36"/>
              <div className="small text-muted">
                <br/>
                        <span>
                            <b>
                                <h1>140</h1>
                            </b>
                            {/* {deviceEntity.managementMode} */}
                        </span>
              </div>
            </CWidgetSimple>
            <CWidgetSimple
              color="gradient-success"
              text="Inactive Devices"
            >
              <CIcon name="cil-settings" height="36"/>
              <div className="small text-muted">
                <br/>
                        <span>
                            <b>
                                <h1>10</h1>
                            </b>
                            {/* {deviceEntity.deviceSettings && deviceEntity.deviceSettings.encryptionStatus} */}
                        </span>
              </div>
                </CWidgetSimple>

                <CWidgetSimple
              color="gradient-success"
              text="Enrolled Users"
            >
              <CIcon name="cil-check-circle" height="36"/>
              <div className="small text-muted">
                <br/>
                        <span>
                            <b>
                                <h1>10</h1>
                            </b>
                            {/* {deviceEntity.managementMode} */}
                        </span>
              </div>
                </CWidgetSimple>

            <CWidgetSimple
              color="gradient-success"
              text="Locked Devices"
            >
              <CIcon name="cil-shield-alt" height="36"/>
              <div className="small text-muted">
                <br/>
                        <span>
                            <b>
                                <h1>0</h1>
                            </b>
                            {/* {deviceEntity && deviceEntity.securityPosture && deviceEntity.securityPosture.devicePosture} */}
                        </span>
              </div>

            </CWidgetSimple>

            </CCardGroup>


          <CCardGroup columns={true} className = "cols-2" >


          <CCard>
            <CCardHeader>
                        <b>Device Geofences </b>
                        <br />
                        <small>Summary of managed devices Geofences </small>
            </CCardHeader>
            <CCardBody>
            <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
            <tr>
              <th>Geofence ID</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Radius </th>
            </tr>
            </thead>
            <tbody>

              <tr>

                <td >
                  <div>
                    <p>Lower Kabete Police Station Geofence</p>
                </div>

                </td>

                  <td>
                  <div className="c-avatar">
                      <p>-1.2558224</p>
                  </div>
                </td>

                <td>
                  <div>
                    <p>36.7871681</p>
                  </div>
                  </td>

                 <td>
                  <div className="clearfix">
                    <div className="float-left">
                      </div>
                      <p>90</p>
                  </div>
                </td>

              </tr>
            </tbody>
            </table>
            </CCardBody>
          </CCard>


      <CCard>
        <CCardHeader>
          <b>Device Type</b>
          <br />
          <small>Summary of managed devices based on device type</small>
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [40, 20, 80]
              }
            ]}
            labels={['VPS 19" STATION DEVICE', 'VPS 8" TABLET DEVICE', 'VPS 5.5" MOBILE DEVICE']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <b>App Summary</b>
          <br />
          <small>Summary of Active and Inactive Devices</small>
        </CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#00D8FF'

                ],
                data: [130, 10]
              }
            ]}
            labels={['ACTIVE DEVICES', 'INACTIVE DEVICES']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <b>Application Summary</b>
          <br />
          <small>Summary of managed devices based on installed Apps</small>
        </CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DD1B16'
                ],
                data: [30, 10, 10, 30, 30]
              }
            ]}
            labels={['VPS App Devices', 'Secom App Devices', 'I-Intelligence App Devices', 'Kikao App Devices', 'Geolocation App Devices']}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>


    </CCol>
          ) : (
            <Alert color="warning">
              <p>Kindly log in to proceed</p>
            </Alert>
          )}

    </CRow>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
