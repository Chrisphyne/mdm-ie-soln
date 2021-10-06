import { Link, RouteComponentProps } from 'react-router-dom';
import React, { useEffect } from 'react';
import { IRootState } from 'app/shared/reducers';
import { getEntity } from './device.reducer';
import { lockDevice } from './device.reducer';
import { rebootDevice } from './device.reducer';
import { deleteDevice } from './device.reducer';
import { connect } from 'react-redux';
import {
  CCard,
  CButton,
  CButtonGroup,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CCardGroup,
  CWidgetProgressIcon,
  CProgress,
  CWidgetSimple,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate } from 'react-jhipster';
import { Button, Row, Col } from 'reactstrap';
import CIcon from '@coreui/icons-react';
import { IDevice } from 'app/shared/model/devices/device.model';
import { IMemoryEvent } from 'app/shared/model/devices/memory-event.model';
import { IPowerManagementEvent } from 'app/shared/model/devices/power-management-event.model';
import { CChartLine, CChartDoughnut } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';


const brandSuccess = getStyle('success') || '#4dbd74';
const brandInfo = getStyle('info') || '#20a8d8';
const brandDanger = getStyle('danger') || '#f86c6b';

export interface IDeviceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ name: string }> {}

export const DeviceDetail = (props: IDeviceDetailProps) => {


  useEffect(() => {
    props.getEntity(props.match.params.name);
  }, []);

  const { deviceEntity, loading } = props;


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

  function getBatteryIcon(batteryLevel: number) : string{
    if (batteryLevel > 60) {
      return "cil-battery-full";
    }else if (batteryLevel >30 && batteryLevel <=60){
      return "cil-battery3"
    }else if (batteryLevel >5 && batteryLevel <=30){
      return "cil-battery-alert"
    }else if (batteryLevel >=0 && batteryLevel <=5){
      return "cil-battery-empty"
    }else if (batteryLevel < 0){
      return "cil-battery-slash"
    }else{
      return "cil-battery-slash"
    }
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

  function getLastRamMeasuredEvent(device: IDevice) : IMemoryEvent{
    let latestEvent, index = device.memoryEvents && device.memoryEvents.length - 1;
    for ( ; index >= 0; index--) {
      if (device.memoryEvents[index]["eventType"] === "RAM_MEASURED") {
        latestEvent = device.memoryEvents[index];
        break;
      }
    }

    return latestEvent
  }

  function getRemainingStorage(device: IDevice): number{
    return device.memoryEvents && device.memoryEvents.length > 0 ? parseInt(getLastExternalStorageMeasuredEvent(device).byteCount, 10) / (1024*1024*1024) : 0;
  }

  function getTotalStorage(device: IDevice): number{
    return device.memoryEvents && device.memoryEvents.length > 0 ? parseInt(getLastExternalStorageDetectedEvent(device).byteCount, 10) / (1024*1024*1024) : 0;
  }

  function getTotalRam(device: IDevice) : number{
    return device.memoryInfo && device.memoryInfo.totalRam && parseInt(device.memoryInfo.totalRam, 10)
  }

  function calculateStorageRemainingPercentage(device: IDevice): number{
    return getRemainingStorage(device) / getTotalStorage(device) * 100;
  }

  function getStorageColor(remainingPercentage: number) : string {
    if (remainingPercentage > 50) {
      return "gradient-success";
    }else if (remainingPercentage <50 && remainingPercentage >=15){
      return "gradient-warning"
    }else if (remainingPercentage < 15){
      return "gradient-danger"
    }else{
      return "gradient-danger"
    }
  }

  const random = (min, max)=>{
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  function getBatteryLevels(device: IDevice) : number[]{
    const batteryLevel = [];
    if(device.powerManagementEvents && device.powerManagementEvents.length >0 ){
      for (let index=0; index<device.powerManagementEvents.length; index++) {
        if (device.powerManagementEvents[index].eventType === "BATTERY_LEVEL_COLLECTED") {
          batteryLevel.push(device.powerManagementEvents[index].batteryLevel)
        }
      }
    }

    return batteryLevel.slice(-20); // to return only last 20 items
  }

  function getBatteryReportCreateTime(device: IDevice) : string[]{
    const createTimes = [];
    if(device.powerManagementEvents && device.powerManagementEvents.length >0 ){
      for (let index=0; index<device.powerManagementEvents.length; index++) {
        if (device.powerManagementEvents[index].eventType === "BATTERY_LEVEL_COLLECTED") {
          createTimes.push(new Date(device.powerManagementEvents[index].createTime).toLocaleDateString('en-gb', {
            weekday: 'short',
            day: 'numeric',
            timeZone: 'utc',
            hour: "numeric",
            minute: "numeric"
          }))
        }
      }
  }

    return createTimes.slice(-20); // to return only first 10 items
  }

  function getRamUsed(device: IDevice) : number[]{
    const ramUsed = [];
    if(device.memoryEvents && device.memoryEvents.length > 0){
      for(let index=0; index<device.memoryEvents.length;index ++){
        if(device.memoryEvents[index]["eventType"] === "RAM_MEASURED"){
          const usedStorage = (getTotalRam(device) - parseInt(device.memoryEvents[index].byteCount, 10)) / (1024*1024)
          ramUsed.push( usedStorage ? usedStorage : 0 )
        }
      }
    }

    return ramUsed.slice(-50); // to return only last 50 items
  }

  function getRamReportTime(device: IDevice) : string[]{
    const createTimes = [];
    if(device.memoryEvents && device.memoryEvents.length > 0){
      for(let index=0; index<device.memoryEvents.length;index ++){
        if(device.memoryEvents[index]["eventType"] === "RAM_MEASURED"){
          createTimes.push(new Date(device.memoryEvents[index].createTime).toLocaleDateString('en-gb', {
            weekday: 'short',
            day: 'numeric',
            timeZone: 'utc',
            hour: "numeric",
            minute: "numeric"
          }))
        }
      }
    }

    return createTimes.slice(-50); // to return only last 50 items
  }

  const batteryLevelDatasets = (()=>{  
    return [
      {
        fill: false,
        lineTension: 0.1,
        label: 'Battery Level %',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: getBatteryLevels(deviceEntity)
      }
    ]
  })()

  const ramDatasets = (() =>{
    return [
      {
        fill: true,
        lineTension: 1,
        label: 'RAM Utilization in MegaBytes (MB)',
        backgroundColor: hexToRgba(brandDanger, 10),
        borderColor: brandDanger,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: getRamUsed(deviceEntity)
      }
    ]

  })()

  const batteryLevelGraphOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 20,
              stepSize: Math.ceil(100 / 10),
              max: 100
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  const ramUtilizationGraphOptions = (()=>{
    return {
        maintainAspectRatio: false,
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: true
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 20,
              stepSize: Math.ceil(( getTotalRam(deviceEntity) / 10) / (1024*1024) / 100)*100,
              max:  Math.ceil(getTotalRam(deviceEntity) / (1024*1024) / 100)*100
            },
            gridLines: {
              display: true
            }
          }]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    }
  )()

  return(
    <CRow>
      <CCol>
        <Button tag={Link} to="/devices" replace color="#FFFFFF">
                <FontAwesomeIcon icon="arrow-left" />{' '}
                <span className="d-none d-md-inline">
              All Devices
            </span>
              </Button> &nbsp;
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
                  {!loading &&
                  "DEVICE ID: "+/[^/]*$/.exec(deviceEntity.name)[0]
                  }
                </div>
                <br/><br/>
        <CCardGroup className="mb-4">
        <CWidgetSimple
              color="gradient-success"
              text=" "
            >
              <CIcon name="cil-shield-alt" height="36"/>
              <div>
                <br/>
                Security Status :
               {deviceEntity && deviceEntity.securityPosture && deviceEntity.securityPosture.devicePosture === "SECURE" ?  <p style={{ color: 'green' }}>{deviceEntity && deviceEntity.securityPosture && deviceEntity.securityPosture.devicePosture} </p> :
                <p style={{ color: 'red' }}>{deviceEntity && deviceEntity.securityPosture && deviceEntity.securityPosture.devicePosture} </p>}
              </div>

            </CWidgetSimple>
           <CWidgetSimple
              color="gradient-success"
              text=" "
            >
              <CIcon name="cil-check-circle" height="36"/>
              <div>
                <br/>
                Encryption Status : 
                <p>{deviceEntity.deviceSettings && deviceEntity.deviceSettings.encryptionStatus}</p>
              </div>
            </CWidgetSimple>

            <CWidgetSimple
              color="gradient-success"
              text=" "
            >
              <CIcon name="cil-settings" height="36"/>
              <div>
                <br/>
                Management Mode : 
                <p>{deviceEntity.managementMode}</p>
              </div>
            </CWidgetSimple>
            <CWidgetProgressIcon
              header={getLastBatteryLevelCollectedEvent(deviceEntity) ? getLastBatteryLevelCollectedEvent(deviceEntity).batteryLevel+"%" : "No power event reported"}
              text="Battery Level"
              progressSlot={
                <CProgress color={getBatteryColor(getLastBatteryLevelCollectedEvent(deviceEntity) ? getLastBatteryLevelCollectedEvent(deviceEntity).batteryLevel : -1)} size="xs" value={getLastBatteryLevelCollectedEvent(deviceEntity) ? getLastBatteryLevelCollectedEvent(deviceEntity).batteryLevel : 0} animated className="my-3"
                />}
            >
              <CIcon name={getBatteryIcon(getLastBatteryLevelCollectedEvent(deviceEntity) ? getLastBatteryLevelCollectedEvent(deviceEntity).batteryLevel : -1)} height="36"/>
            </CWidgetProgressIcon>
            <CWidgetProgressIcon
              header={getRemainingStorage(deviceEntity).toFixed(2)+" GB Available"}
              text={"Storage ( Total: "+getTotalStorage(deviceEntity).toFixed(2)+" GB)"}
              progressSlot={
                <CProgress color={getStorageColor(calculateStorageRemainingPercentage(deviceEntity))} size="xs" value={calculateStorageRemainingPercentage(deviceEntity)} animated className="my-3"
                />}
            >
              <CIcon name="cil-storage" height="36"/>
            </CWidgetProgressIcon>
        </CCardGroup>
        
        <CCol>
          <CDropdown>
              <CDropdownToggle color="#FFFFFF">
                <CIcon name="cil-settings"/>&nbsp;
              Actions  
                  
                </CDropdownToggle>
                <CDropdownMenu className="pt-0" placement="right-start">
                  <CDropdownItem onClick = {  deviceEntity ?  () => props.lockDevice(`${/[^/]*$/.exec(deviceEntity.name)[0]}` )  : null }>Remote Lock</CDropdownItem>
                  <CDropdownItem onClick = {  deviceEntity ?  () => props.rebootDevice(`${/[^/]*$/.exec(deviceEntity.name)[0]}` )  : null }>Remote Reboot</CDropdownItem>
                  <CDropdownItem onClick = {  deviceEntity ?  () => props.deleteDevice(`${/[^/]*$/.exec(deviceEntity.name)[0]}` )  : null }>Remote Factory Reset</CDropdownItem>
                  <CDropdownItem>Enable Lost Mode</CDropdownItem>
                  <CDropdownItem onClick={() => props.history.push(`/devices/${/[^/]*$/.exec(deviceEntity.name)[0]}/device-geolocation`)}>Geolocate Device</CDropdownItem>
                </CDropdownMenu>
          </CDropdown>
                <div className="card-header-actions">
                </div>
        </CCol>
                <br/><br/>

        <CRow>
          
            <CCol lg={6}>
              <CCard>
                <CCardHeader>
                <b><h4>Device Summary</h4></b> 
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                      <tbody>
                              <tr >
                                <td><strong> Device ID : </strong> {deviceEntity.name && /[^/]*$/.exec(deviceEntity.name)[0]}</td>
                              </tr>
                              <tr >
                                <td><strong> Device Model : </strong> {deviceEntity.hardwareInfo && deviceEntity.hardwareInfo.model}</td>
                              </tr>
                              <tr >
                                <td><strong> Device IMEI : </strong> {deviceEntity.networkInfo && deviceEntity.networkInfo.imei}</td>
                              </tr>
                              <tr >
                                <td><strong> Product Name : </strong> {deviceEntity.hardwareInfo && deviceEntity.hardwareInfo.hardware}</td>
                              </tr>
                              <tr >
                                <td><strong> Device Manufacturer : </strong> {deviceEntity.hardwareInfo && deviceEntity.hardwareInfo.manufacturer}</td>
                              </tr>
                              <tr >
                                <td><strong> Management Type : </strong> {deviceEntity.managementMode}</td>
                              </tr>
                      </tbody>
                    </table>
                </CCardBody>
              </CCard>
          </CCol>

          <CCol lg={6}>
              <CCard>
                <CCardHeader>
                <b><h4>Network Summary</h4></b> 
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                      <tbody>
                        
                              <tr >
                                <td><strong> Device ID : </strong> {deviceEntity.name && /[^/]*$/.exec(deviceEntity.name)[0]}</td>
                              </tr>
                              <tr >
                                <td><strong> WiFi MAC Address : </strong> {deviceEntity.networkInfo && deviceEntity.networkInfo.wifiMacAddress}</td>
                              </tr>
                              <tr >
                                <td><strong> Network Operator : </strong> {deviceEntity.networkInfo && deviceEntity.networkInfo.networkOperatorName}</td>
                              </tr>
                              <tr >
                                <td><strong> Bluetooth MAC Address : </strong> {deviceEntity.networkInfo && deviceEntity.networkInfo.wifiMacAddress}</td>
                              </tr>
                              <tr >
                                <td><strong> Last Update Time : </strong> {deviceEntity.softwareInfo && deviceEntity.softwareInfo.systemUpdateInfo.updateReceivedTime}</td>
                              </tr>
                              <tr >
                                <td><strong> Update Status : </strong> {deviceEntity.softwareInfo && deviceEntity.softwareInfo.systemUpdateInfo.updateStatus}</td>
                              </tr>
                      </tbody>
                    </table>
                </CCardBody>
              </CCard>
          </CCol>
          
         </CRow>

        
                 <CRow>
                  <CCol lg={6}>
                    <CCard>
                      <CCardHeader>
                      <b><h4>OS Summary</h4></b> 
                      </CCardHeader>
                      <CCardBody>
                          <table className="table table-striped table-hover">
                            <tbody>
                              
                                    <tr >
                                      <td><strong> OS : </strong> Android </td>
                                    </tr>
                                    <tr >
                                      <td><strong> OS Version : </strong> {deviceEntity.softwareInfo && deviceEntity.softwareInfo.androidVersion}</td>
                                    </tr>
                                    <tr >
                                      <td><strong> Build Number : </strong> {deviceEntity.softwareInfo && deviceEntity.softwareInfo.androidBuildNumber}</td>
                                    </tr>
                                    <tr >
                                      <td><strong> Serial Number : </strong> {deviceEntity.hardwareInfo && deviceEntity.hardwareInfo.serialNumber}</td>
                                    </tr>
                                    <tr >
                                      <td><strong> Kernel Version : </strong> {deviceEntity.softwareInfo && deviceEntity.softwareInfo.deviceKernelVersion}</td>
                                    </tr>
                                    <tr >
                                      <td><strong> Primary Language Code : </strong> {deviceEntity.softwareInfo && deviceEntity.softwareInfo.primaryLanguageCode}</td>
                                    </tr>
                            </tbody>
                          </table>
                      </CCardBody>
                    </CCard>
                </CCol>

                <CCol lg={6}>
                    <CCard>
                      <CCardHeader>
                      <b><h4>Memory Info</h4></b> 
                      </CCardHeader>
                      <CCardBody>
                          <CChartDoughnut
                            datasets={[
                              {
                                backgroundColor: [
                                  '#41B883',
                                  '#00D8FF'
                                ],
                                data: [2, 24]
                              }
                            ]}
                            labels={['Used Storage(GB)', 'Free Storage(GB)']}
                            options={{
                              tooltips: {
                                enabled: true
                              }
                            }}
                          />
                      </CCardBody>
                    </CCard>
                </CCol>
                
        </CRow>
        
        <CRow>

        <CCol lg={6}>

        <CCard>
              <CCardHeader>
                <h4 id="traffic" className="card-title mb-0">Battery Usage</h4>
          </CCardHeader>
              <CCardBody>
                 <CRow>
                  <CCol sm="5">
                  <p className="text-muted">{getLastBatteryLevelCollectedEvent(deviceEntity) ? "Last Synced at "+new Date(getLastBatteryLevelCollectedEvent(deviceEntity).createTime).toLocaleDateString('en-gb', {
                          year: 'numeric',
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                          timeZone: 'utc',
                          hour: "numeric",
                          minute: "numeric"
                        }) : <p  style={{ color: 'orange' }}>Current Policy might not have power events enabled</p>}</p>
                </CCol>
              </CRow>
          
          <CChartLine
            style={{height: '300px', marginTop: '40px'}}
            datasets={batteryLevelDatasets}
            options={batteryLevelGraphOptions}
            labels={getBatteryReportCreateTime(deviceEntity)}
          />
          </CCardBody>
        </CCard>
        
        </CCol>

        <CCol lg={6}>
        
            <CCard>
              <CCardHeader>
                <h4 id="traffic" className="card-title mb-0">RAM Utilization</h4>
              </CCardHeader>
          <CCardBody>
          <CRow>
                  <CCol sm="5">
                    <p className="text-muted">{getLastRamMeasuredEvent(deviceEntity) ? "Last Synced at "+new Date(getLastRamMeasuredEvent(deviceEntity).createTime).toLocaleDateString('en-gb', {
                            year: 'numeric',
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                            timeZone: 'utc',
                            hour: "numeric",
                            minute: "numeric"
                          }) : <p  style={{ color: 'orange' }}>Current Policy might not have memory events enabled</p>}</p>
                  </CCol>
                </CRow>
          <CChartLine
            style={{height: '300px', marginTop: '40px'}}
            datasets={ramDatasets}
            options={ramUtilizationGraphOptions}
            labels={getRamReportTime(deviceEntity)}
          />
          </CCardBody>
        </CCard>
      
      </CCol>
      
      </CRow>  
      </CCol>
    </CRow>
  );


}



const mapStateToProps = ({ device }: IRootState) => ({
  deviceEntity: device.entity,
  loading: device.loading,

});

const mapDispatchToProps = {
  getEntity,
  lockDevice,
  rebootDevice,
  deleteDevice
};



type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeviceDetail);
