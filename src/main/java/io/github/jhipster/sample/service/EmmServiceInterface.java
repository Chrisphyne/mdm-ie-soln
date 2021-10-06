package io.github.jhipster.sample.service;

import com.google.api.services.androidmanagement.v1.model.Device;
import com.google.api.services.androidmanagement.v1.model.EnrollmentToken;
import com.google.api.services.androidmanagement.v1.model.Policy;
import com.google.api.services.androidmanagement.v1.model.WebToken;


import java.io.IOException;
import java.util.Optional;

public interface EmmServiceInterface {
    String NAME = "vps_EmmService";

    String lockDevice(String deviceID) throws IOException;

    String getDevices(String enterpriseName) throws IOException;

    String getPolicies(String enterpriseID) throws IOException;

    Optional<Policy> getPolicy(String policyId) throws IOException;

    Policy updatePolicy(Policy policy, String policyId) throws IOException;

    String relinquishDevice(String deviceId) throws IOException;

    String rebootDevice(String deviceId) throws IOException;

    String deleteDevice(String deviceId) throws IOException;

    EnrollmentToken generateEnrollmentToken(EnrollmentToken token);

    WebToken generateIframeWebToken(WebToken token);

    Optional<Device> getDevice(String deviceId) throws IOException;
}
