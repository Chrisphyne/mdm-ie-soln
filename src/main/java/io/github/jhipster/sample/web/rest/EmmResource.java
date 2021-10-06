package io.github.jhipster.sample.web.rest;

import com.google.api.services.androidmanagement.v1.model.Device;
import com.google.api.services.androidmanagement.v1.model.EnrollmentToken;
import com.google.api.services.androidmanagement.v1.model.WebToken;
import com.google.api.services.androidmanagement.v1.model.Policy;
import io.github.jhipster.sample.service.EmmServiceInterface;
import io.github.jhipster.sample.utils.JsonRequestMapping;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Optional;

import static io.github.jhipster.sample.utils.constants.ENTERPRISE_ID;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("/api/emm")
@Transactional
public class EmmResource {

    private final Logger log= LoggerFactory.getLogger(EmmResource.class);

    private EmmServiceInterface emmService;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private static final String ENTITY_NAME_POLICY = "policy";
    private static final String ENTITY_NAME_ENROLLMENT_TOKEN = "enrollmentToken";
    private static final String ENROLLMENT_TOKEN_TYPE = "ENROLLMENT_TOKEN_TYPE";
    private static final String IFRAME_WEB_TOKEN = "webToken";


    @Autowired
    public EmmResource(EmmServiceInterface emmService) {
        this.emmService = emmService;
    }

    /* Get all device belonging the enterprise */
    @JsonRequestMapping(value = "/devices", method = GET)
    public ResponseEntity<String> deviceListing() throws IOException{
        String enterpriseName = ENTERPRISE_ID;
        String result = emmService.getDevices(enterpriseName);

        final HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(result, httpHeaders, HttpStatus.OK);
    }

    /* Get a single device */
    @JsonRequestMapping(value = "/devices/{deviceId}", method = GET)
    public ResponseEntity<Device> getDevice(@PathVariable("deviceId") String deviceId) throws IOException {
        Optional<Device> result = emmService.getDevice(deviceId);
        return ResponseUtil.wrapOrNotFound(result);
    }

    @JsonRequestMapping(value = "/devices/{deviceId}/lock", method = POST)
    public ResponseEntity<String> lockDevice(@PathVariable("deviceId") String deviceId) throws IOException {
        String result = emmService.lockDevice(deviceId);

        final HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(result, httpHeaders, HttpStatus.OK);

    }

    @JsonRequestMapping(value = "/devices/{deviceId}/relinquish", method = POST)
    public ResponseEntity<String> relinquishDevice(@PathVariable("deviceId") String deviceId) throws IOException {
        String result = emmService.relinquishDevice(deviceId);

        final HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(result, httpHeaders, HttpStatus.OK);

    }

    @JsonRequestMapping(value = "/devices/{deviceId}/reboot", method = POST)
    public ResponseEntity<String> rebootDevice(@PathVariable("deviceId") String deviceId) throws IOException {
        String result = emmService.rebootDevice(deviceId);

        final HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(result, httpHeaders, HttpStatus.OK);

    }

    @JsonRequestMapping(value = "/devices/{deviceId}/delete", method = POST)
    public ResponseEntity<String> deleteDevice(@PathVariable("deviceId") String deviceId) throws IOException {
        String result = emmService.deleteDevice(deviceId);

        final HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(result, httpHeaders, HttpStatus.OK);

    }


    /* Get all policies belonging the enterprise */
    @JsonRequestMapping(value = "/policies", method = GET)
    public ResponseEntity<String> policyListing() throws IOException{
        String enterpriseId = ENTERPRISE_ID; //todo save this in DB allowing creation of more than one enterprise for different organizations/departments
        String result = emmService.getPolicies(enterpriseId);

        final HttpHeaders httpHeaders= new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);
        return new ResponseEntity<String>(result, httpHeaders, HttpStatus.OK);
    }

    /* Get a single policy */
    @JsonRequestMapping(value = "/policies/{policyId}", method = GET)
    public ResponseEntity<Policy> getPolicy(@PathVariable("policyId") String policyId) throws IOException {
        Optional<Policy> result = emmService.getPolicy(policyId);
        return ResponseUtil.wrapOrNotFound(result);
    }

    /* Update a policy */
    @JsonRequestMapping(value = "/policies/{policyId}", method = PUT)
    public ResponseEntity<Policy> updatePolicy(@RequestBody Policy policy, @PathVariable("policyId") String policyId) throws IOException {
        log.debug("REST Request to update Policy: {}}", policy);
        Policy result = emmService.updatePolicy(policy,policyId);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME_POLICY, result.getName()))
            .body(result);
    }

    /* Create an enrollment token for any user */
    @JsonRequestMapping(value = "/users/enroll", method = GET)
    public ResponseEntity<EnrollmentToken> generateEnrollmentToken(@RequestBody EnrollmentToken token) throws IOException {
        log.debug("REST Request to generate enrollment toke for user: {}}");
        EnrollmentToken enrollmentToken = emmService.generateEnrollmentToken(token);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME_ENROLLMENT_TOKEN, enrollmentToken.getName()))
            .body(enrollmentToken);
    }

    /* Create an iframe web token */
    @JsonRequestMapping(value = "/iframe_web_token", method = GET)
    public ResponseEntity<WebToken> generateIframeWebToken(@RequestBody WebToken token) throws IOException {
        log.debug("REST Request to generate web token for iframe: {}}");
        WebToken webToken = emmService.generateIframeWebToken(token);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, IFRAME_WEB_TOKEN, webToken.getParentFrameUrl()))
            .body(webToken);
    }


}
