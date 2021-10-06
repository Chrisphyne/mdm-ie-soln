import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './device.reducer';
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
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { IDevice } from 'app/shared/model/devices/device.model';
import { IMemoryEvent } from 'app/shared/model/devices/memory-event.model';
import 'spinkit/spinkit.min.css'
import LoadingBar from 'react-redux-loading-bar';
import { IPowerManagementEvent } from 'app/shared/model/devices/power-management-event.model';

export interface IDeviceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Device = (props: IDeviceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { deviceList, match, loading } = props;

  function getLastExternalStorageMeasuredEvent(device: IDevice) : IMemoryEvent{
    let latestEvent, index = device.memoryEvents.length - 1;
    for ( ; index >= 0; index--) {
      if (device.memoryEvents[index]["eventType"] === "EXTERNAL_STORAGE_MEASURED") {
        latestEvent = device.memoryEvents[index];
        break;
      }
    }

    return latestEvent
  }

  function getLastExternalStorageDetectedEvent(device: IDevice) : IMemoryEvent{
    let latestEvent, index = device.memoryEvents.length - 1;
    for ( ; index >= 0; index--) {
      if (device.memoryEvents[index]["eventType"] === "EXTERNAL_STORAGE_DETECTED") {
        latestEvent = device.memoryEvents[index];
        break;
      }
    }

    return latestEvent
  }

  function getLastBatteryLevelCollectedEvent(device: IDevice) : IPowerManagementEvent{
    if (device.powerManagementEvents) {
      let latestEvent, index = device.powerManagementEvents.length - 1;
      for (; index >= 0; index--) {
        if (device.powerManagementEvents[index].eventType === "BATTERY_LEVEL_COLLECTED") {
          latestEvent = device.powerManagementEvents[index];
          break;
        }
      }
      return latestEvent
    }else{
      return null;
    }
  }

  function getBatteryColor(batteryLevel: number) : string {
    if (batteryLevel > 50) {
      return "gradient-success";
    }else if (batteryLevel <50 && batteryLevel >=15){
      return "gradient-warning"
    }else if (batteryLevel < 15){
      return "gradient-danger"
    }else{
      return "gradient-danger"
    }
  }

  return(
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>
            Enrolled Devices
            <div className="card-header-actions">
              { loading &&
              <div className="sk-wave">
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
                <div className="sk-wave-rect"></div>
              </div>
              }
            </div>
          </CCardHeader>
          <CCardBody>
            {deviceList && deviceList.length > 0 ? (
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
            <tr>
              <th></th>
              <th>Current State</th>
              <th>API Level</th>
              <th>Battery Level</th>
              <th>Storage Usage </th>
              <th>Network</th>
              <th>Security Posture</th>
            </tr>
            </thead>
            <tbody>
            {deviceList.map((device, i) => (
              <tr key={`entity-${i}`} onClick={() => props.history.push(`/devices/${/[^/]*$/.exec(device.name)[0]}`)}>
                <td className="text-center">
                  {/[^/]*$/.exec(device.policyName)[0] === 'dedicated_device_policy' &&
                  <div className="c-avatar">
                    <img src={'../../content/images/kiosk.png'} className="c-avatar-img" alt="Workstation Image" />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                  }
                  {/[^/]*$/.exec(device.policyName)[0] === 'multiapp_kiosk_mode_policy' &&
                  <div className="c-avatar">
                    <img src={'../../content/images/tablet.png'} className="c-avatar-img" alt="8 Inch Image" />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                  }
                  {/[^/]*$/.exec(device.policyName)[0] === 'policy1' &&
                  <div className="c-avatar">
                    <img src={'../../content/images/smartphone.png'} className="c-avatar-img" alt="5 Inch Image" />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                  }
                </td>
                <td>
                  <div>{device.appliedState}</div>
                  <div className="small text-muted">
                    <span>{device.ownership}</span> <br/>
                    <span>Synced @ {new Date(device.lastStatusReportTime).toLocaleDateString('en-gb', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      timeZone: 'utc',
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    })} </span>
                  </div>
                </td>
                <td>
                  <div>{device.systemProperties["ro.product.first_api_level"]}</div>
                  <div className="small text-muted">
                    <span>{device.systemProperties["ro.serialno"]}</span>
                  </div>
                </td>
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>{getLastBatteryLevelCollectedEvent(device) ? getLastBatteryLevelCollectedEvent(device).batteryLevel+"%" : "No power event reported"}</strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">{getLastBatteryLevelCollectedEvent(device) ? new Date(getLastBatteryLevelCollectedEvent(device).createTime).toLocaleDateString('en-gb', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      timeZone: 'utc',
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true
                    }) : "Current Policy might not have power events enabled"}</small>
                    </div>
                  </div>
                  {
                    getLastBatteryLevelCollectedEvent(device)
                    && getLastBatteryLevelCollectedEvent(device).batteryLevel > 50
                    && <CProgress className="progress-xs" color="success" value={getLastBatteryLevelCollectedEvent(device).batteryLevel} />
                  }
                  {
                    getLastBatteryLevelCollectedEvent(device)
                    && (getLastBatteryLevelCollectedEvent(device).batteryLevel <= 50 && getLastBatteryLevelCollectedEvent(device).batteryLevel >= 15)
                    && <CProgress className="progress-xs" color="warning" value={getLastBatteryLevelCollectedEvent(device).batteryLevel} />
                  }
                  {
                    getLastBatteryLevelCollectedEvent(device)
                    && getLastBatteryLevelCollectedEvent(device).batteryLevel < 15
                    && <CProgress className="progress-xs" color="danger" value={getLastBatteryLevelCollectedEvent(device).batteryLevel} />
                  }
                </td>
                
                <td>
                  <div className="clearfix">
                    <div className="float-left">
                      <strong>
                        ff
                        {device.memoryEvents && device.memoryEvents.length > 0 ? (parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / (1024 * 1024 * 1024)).toFixed(2) + ' GB Available' : ""}
                      </strong>
                    </div>
                    <div className="float-right">
                      <small className="text-muted">
                        {device.memoryEvents && device.memoryEvents.length > 0 ? (parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10) / (1024 * 1024 * 1024)).toFixed(2) + ' GB Total' : "Applied Policy doesn't have memory events"}
                      </small>
                    </div>
                  </div>
                  {
                    device.memoryEvents && device.memoryEvents.length > 0
                    && ( Math.floor((parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10)) * 100) > 50)
                    && <CProgress className="progress-xs" color="success" value={Math.floor((parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10)) * 100)} />
                  }
                  {
                    device.memoryEvents && device.memoryEvents.length > 0
                    && ( Math.floor((parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10)) * 100) <= 50
                    && Math.floor((parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10)) * 100) >= 15 )
                    && <CProgress className="progress-xs" color="warning" value={Math.floor((parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10)) * 100)} />
                  }
                  {
                    device.memoryEvents && device.memoryEvents.length > 0
                    && ( Math.floor((parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10)) * 100) < 15 )
                    && <CProgress className="progress-xs" color="danger" value={Math.floor((parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10)) * 100)} />
                  }
                </td>
                
                <td>
                  <div>IMEI : {device.networkInfo.imei}</div>
                  <div className="small text-muted">
                    <span>Wifi Mac Address: {device.networkInfo.wifiMacAddress}</span>
                  </div>
                </td>
                <td>
                  <div>{device.securityPosture.devicePosture}</div>
                  <div className="small text-muted">
                    <span>{device.securityPosture.postureDetails && device.securityPosture.postureDetails.length > 0 && device.securityPosture.postureDetails[0].securityRisk}</span>
                    <br/>
                    <span>{device.securityPosture.postureDetails && device.securityPosture.postureDetails.length > 0 &&
                    device.securityPosture.postureDetails[0].advice && device.securityPosture.postureDetails[0].advice.length > 0 && device.securityPosture.postureDetails[0].advice[0].defaultMessage}</span>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
            </table>
            ) : (
            !loading && (
            <div className="alert alert-warning">
              No Devices found
            </div>
            )
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )


}

const mapStateToProps = ({ device }: IRootState) => ({
  deviceList: device.entities,
  loading: device.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps; 

export default connect(mapStateToProps, mapDispatchToProps)(Device);
