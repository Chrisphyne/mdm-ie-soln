package io.github.jhipster.sample.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.androidmanagement.v1.AndroidManagement;
import com.google.api.services.androidmanagement.v1.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static io.github.jhipster.sample.utils.constants.ENTERPRISE_ID;
import static io.github.jhipster.sample.utils.constants.PARENT_FRAME_URL;

@Service(EmmServiceInterface.NAME)
public class EmmServiceBean implements EmmServiceInterface {

    private final Logger log= LoggerFactory.getLogger(EmmServiceBean.class);


    /** The id of the Google Cloud Platform project. */
    private static final String PROJECT_ID = "vpsmdm";

    /** The JSON credential file for the service account. */
    private static final String SERVICE_ACCOUNT_CREDENTIAL_FILE =
            "/home/chrisphyne/Documents/JhipsterApps/client_secret.json";

    /** The id of the policy for the COSU device. */
    private static final String POLICY_ID = "samplePolicy";

    /** The package name of the COSU app. */
    private static final String COSU_APP_PACKAGE_NAME =
            "com.google.android.apps.youtube.gaming";

    /** The OAuth scope for the Android Management API. */
    private static final String OAUTH_SCOPE =
            "https://www.googleapis.com/auth/androidmanagement";

    /** The name of this app. */
    private static final String APP_NAME = "Android Management API sample app";

    /** The Android Management API client. */
    private final AndroidManagement androidManagementClient;


    public EmmServiceBean() throws IOException, GeneralSecurityException {
        this.androidManagementClient = getAndroidManagementClient();
    }

    @Override
    public String lockDevice(String deviceID) throws IOException {
        // Create an enterprise. If you've already created an enterprise, the
        // createEnterprise call can be commented out and replaced with your
        // enterprise name.
        //String enterpriseName = createEnterprise();
        String enterpriseName = ENTERPRISE_ID;
        //System.out.println("Enterprise created/existing with ID: " + enterpriseName);

        // Set the policy to be used by the device.
        //setPolicy(enterpriseName, POLICY_ID, getCosuPolicy());

        // Create an enrollment token to enroll the device.
        // String token = createEnrollmentToken(enterpriseName, POLICY_ID);
        //System.out.println("Enrollment token (to be typed on device): " + token);

        // List some of the devices for the enterprise. There will be no devices for
        // a newly created enterprise, but you can run the app again with an
        // existing enterprise after enrolling a device.
        List<Device> devices = listDevices(enterpriseName);
        Device a = null;
        for (Device device : devices) {
            System.out.println("Found device with name: " + device.getName());
            if (device.getName().equalsIgnoreCase(ENTERPRISE_ID+"/devices/"+deviceID)){
                a = device;
            }
        }

        // If there are any devices, reboot one.
        if (devices.isEmpty()) {
            System.out.println("No devices found.");
        } else {
            assert a != null;
            lockDevice(a);
        }

        return "Policy will be applied soon.";
    }

    @Override
    public String getDevices(String enterpriseName) throws IOException {
        List<Device> devices = listDevices(enterpriseName);
        return devices.toString();
    }

    @Override
    public String getPolicies(String enterpriseID) throws IOException {
        List<Policy> policies = listPolicies(enterpriseID);
        return policies.toString();
    }

    @Override
    public Optional<Policy> getPolicy(String policyId) throws IOException {
        return getSinglePolicy(policyId);
    }

    @Override
    public Policy updatePolicy(Policy policy, String policyId) throws IOException {
        return setPolicy(policyId, policy);
    }

    @Override
    public String relinquishDevice(String deviceId) throws IOException {
        List<Device> devices = listDevices(ENTERPRISE_ID);
        Device a = null;
        for (Device device : devices) {
            System.out.println("Found device with name: " + device.getName());
            if (device.getName().equalsIgnoreCase(ENTERPRISE_ID+"/devices/"+deviceId)){
                a = device;
            }
        }

        // If there are any devices, reboot one.
        if (devices.isEmpty()) {
            System.out.println("No devices found.");
        } else {
            assert a != null;
            relinquishDevice(a);
        }

        return "Policy will be applied soon.";
    }

    @Override
    public String rebootDevice(String deviceId) throws IOException {
        List<Device> devices = listDevices(ENTERPRISE_ID);
        Device a = null;
        for (Device device : devices) {
            System.out.println("Found device with name: " + device.getName());
            if (device.getName().equalsIgnoreCase(ENTERPRISE_ID+"/devices/"+deviceId)){
                a = device;
            }
        }

        // If there are any devices, reboot one.
        if (devices.isEmpty()) {
            System.out.println("No devices found.");
        } else {
            assert a != null;
            rebootDevice(a);
        }

        return "Policy will be applied soon.";
    }

    @Override
    public String deleteDevice(String deviceId) throws IOException {
        return deleteDeviceFromEnterprise(deviceId).toString();
    }

    @Override
    public EnrollmentToken generateEnrollmentToken(EnrollmentToken token) {
        log.debug("Generating enrollment token...");
        EnrollmentToken response = new EnrollmentToken();
        try {
            response = androidManagementClient
                .enterprises()
                .enrollmentTokens()
                .create(ENTERPRISE_ID, token)
                .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public WebToken generateIframeWebToken(WebToken token) {
        log.debug("Generating iFrame Web token...");
        WebToken response = new WebToken();
        try {
            response = androidManagementClient
                .enterprises()
                .webTokens()
                .create(ENTERPRISE_ID, token)
                .execute();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return response;
    }

    @Override
    public Optional<Device> getDevice(String deviceId) throws IOException {
        return getSingleDevice(deviceId);
    }



    /*Android Management API Calls*/

    /** Builds an Android Management API client. */
    private static AndroidManagement getAndroidManagementClient()
            throws IOException, GeneralSecurityException {
        try (FileInputStream input =
                     new FileInputStream(SERVICE_ACCOUNT_CREDENTIAL_FILE)) {
            GoogleCredential credential =
                    GoogleCredential.fromStream(input)
                            .createScoped(Collections.singleton(OAUTH_SCOPE));
            return new AndroidManagement.Builder(
                    GoogleNetHttpTransport.newTrustedTransport(),
                    JacksonFactory.getDefaultInstance(),
                    credential)
                    .setApplicationName(APP_NAME)
                    .build();
        }
    }

    /** Gets a Policy for a COSU device. */
    private Policy getCosuPolicy() {
        List<String> categories = new ArrayList<>();
        categories.add("android.intent.category.HOME");
        categories.add("android.intent.category.DEFAULT");

        return new Policy()
                .setApplications(
                        Collections.singletonList(
                                new ApplicationPolicy()
                                        .setPackageName(COSU_APP_PACKAGE_NAME)
                                        .setInstallType("FORCE_INSTALLED")
                                        .setDefaultPermissionPolicy("GRANT")
                                        .setLockTaskAllowed(true)))
                .setPersistentPreferredActivities(
                        Collections.singletonList(
                                new PersistentPreferredActivity()
                                        .setReceiverActivity(COSU_APP_PACKAGE_NAME)
                                        .setActions(
                                                Collections.singletonList("android.intent.action.MAIN"))
                                        .setCategories(categories)))
                .setKeyguardDisabled(true)
                .setStatusBarDisabled(true);
    }

    /** Sets the policy of the given id to the given value. */
    private Policy setPolicy(String policyId, Policy policy)
            throws IOException {
        System.out.println("Updating policy...");

        return androidManagementClient
                .enterprises()
                .policies()
                .patch(ENTERPRISE_ID+"/policies/"+policyId, policy)
                .execute();
    }


    /** Lists the first page of devices for an enterprise. */
    private List<Device> listDevices(String enterpriseId) throws IOException {
        System.out.println("Listing devices...");
        ListDevicesResponse response =
                androidManagementClient
                        .enterprises()
                        .devices()
                        .list(enterpriseId)
                        .execute();
        return response.getDevices() == null
                ? new ArrayList<>() : response.getDevices();
    }

    /** deletes device from an enterprise. */
    private Empty deleteDeviceFromEnterprise(String deviceId) throws IOException {
        System.out.println("Deleting device...");
        Empty response =
            androidManagementClient
                .enterprises()
                .devices()
                .delete(ENTERPRISE_ID+"/devices/"+deviceId)
                .execute();
        return response;
    }

    /** Lists the all policies for an enterprise. */
    private List<Policy> listPolicies(String enterpriseId) throws IOException {
        System.out.println("Listing policies...");
        ListPoliciesResponse response =
            androidManagementClient
                .enterprises()
                .policies()
                .list(enterpriseId)
                .execute();
        return response.getPolicies() == null
            ? new ArrayList<>() : response.getPolicies();
    }

    private Optional<Policy> getSinglePolicy(String policyId) throws IOException{
        log.debug("Get-ing single policy...");
        Optional<Policy> response = Optional.ofNullable(androidManagementClient
            .enterprises()
            .policies()
            .get(ENTERPRISE_ID+"/policies/"+policyId)
            .execute());

        return response;
    }

    private Optional<Device> getSingleDevice(String deviceId) throws IOException{
        log.debug("Get-ing single device...");
        Optional<Device> response = Optional.ofNullable(androidManagementClient
            .enterprises()
            .devices()
            .get(ENTERPRISE_ID+"/devices/"+deviceId)
            .execute()
        );

        return response;
    }

    /** Reboots a device. Note that reboot only works on Android N+. */
    private void rebootDevice(Device device) throws IOException {
        System.out.println(
                "Sending reboot command to " + device.getName() + "...");
        Command command = new Command().setType("REBOOT");
        androidManagementClient
                .enterprises()
                .devices()
                .issueCommand(device.getName(), command)
                .execute();
    }

    /** Locks a device. */
    private void lockDevice(Device device) throws IOException {
        System.out.println(
            "Sending lock command to " + device.getName() + "...");
        Command command = new Command().setType("LOCK");
        androidManagementClient
            .enterprises()
            .devices()
            .issueCommand(device.getName(), command)
            .execute();
    }

    /** Relinquish a device.  */
    private void relinquishDevice(Device device) throws IOException {
        System.out.println(
            "Sending Relinquish command to " + device.getName() + "...");
        Command command = new Command().setType("RELINQUISH_OWNERSHIP");
        androidManagementClient
            .enterprises()
            .devices()
            .issueCommand(device.getName(), command)
            .execute();
    }

}
