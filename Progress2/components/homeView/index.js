function logout() {
    //alert("login");
    if (log == 1) {
        document.getElementById("login").style.display = 'block';
        log = 0;
        document.getElementById("profile").style.display = 'none';
        document.getElementById("user_profile").style.display = 'none';
    }
}

function authenticate() {
    //alert("a");
    if (document.getElementById('email').value != '') {
        //alert("in");
        $.ajax({
            url: url_login,
            type: 'GET',
            success: function(result) {

                sessionId = result.sessionId;
                console.log("session id " + sessionId);
                var email = document.getElementById('email').value;
                selectquery = "SELECT id from Profile2 where Email = '" + email + "';";
                //alert(selectquery);
                $.ajax({
                    url: url_email + sessionId + "&query=" + selectquery + "&output=json",
                    type: 'GET',
                    success: function(result) {
                        //console.log("success" + JSON.stringify(result));
                        if (result == '') {
                            alert("you are not a valid person");
                        } else {
                            //$.mobile.changePage("barcode/view.html",{transition : "slide"}, false);
                            //window.open("components/profile_page.html", "_self");
                            document.getElementById("login").style.display = 'none';
                            profile_id = result;
                            //alert(profile_id);

                            document.getElementById("profile").style.display = 'block';
                            $.ajax({
                                url: url_details1 + sessionId + "&id=" + profile_id + url_details2,
                                type: 'GET',
                                dataType: 'text',
                                success: function(result) {
                                    log = 1;
                                    //console.log((result));
                                    var txt, parser, xmlDoc, value1, value2;
                                    txt = result;
                                    parser = new DOMParser();
                                    xmlDoc = parser.parseFromString(txt, "text/xml");
                                    //alert("xml");
                                    value1 = xmlDoc.getElementsByTagName("data")[0].childNodes[0].nextSibling;
                                    candidatePhoto = value1.childNodes[0].innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateEmail = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateCity = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateName = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidatePhoneNumber = value1.innerHTML;
                                    //value1 = value1.nextSibling.nextSibling
                                    //candidateInterviewDate = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateGender = value1.innerHTML;
                                    // myfun();

                                },
                                error: function(error) {
                                    console.log(JSON.stringify(error));
                                }
                            });

                        }
                    },
                    error: function(error) {
                        console.log("error" + JSON.stringify(error));
                    }

                });

            },
            error: function(error) {
                console.log(JSON.stringify(error));
            }
        });
    }
}

var AppUtils = {};
AppUtils.getHexProfileId = function(profileId) {

    return profileId.toString(16).toUpperCase();
}
AppUtils.getUUID = function(profileId) {
    var hexProfileId = this.getHexProfileId(profileId);
    var profileUUID = "";

    for (var int = 0; int < (12 - hexProfileId.length); int++) {
        profileUUID = profileUUID.concat("0");
    }
    profileUUID = profileUUID.concat(hexProfileId); // Add string converted to
    // hex with trailing zeros

    return "00000000-0000-0000-0000-".concat(profileUUID);
}

function myfun() {
    var delegate, region, beaconRegion;
    // var x = '00000000-0000-0000-0000-000' + profile_id;
    window.locationManager = cordova.plugins.locationManager;

    delegate = new cordova.plugins.locationManager.Delegate()

    locationManager.setDelegate(delegate)
        //alert(x);
        //alert(profile_id);
        //document.getElementById('yourLinkID').click();
        //alert("9");
    var x = AppUtils.getUUID(parseInt(profile_id));
    //alert(x);
    //x='2f234454-cf6d-4a0f-adf2-f4911ba9ffa8'
    region = [{
        id: "po",
        uuid: x,
        major: 5,
        minor: 2000
    }]

    beaconRegion = new locationManager.BeaconRegion(
        region[0].id, region[0].uuid, region[0].major, region[0].minor)

    locationManager.startAdvertising(beaconRegion)
        .fail(console.error)
        .done()
        //alert("9");

    //document.getElementById("bleButton").style.display = "block";

}

function scan() {
    if (window.navigator.simulator === true) {
        alert("Not Supported in Simulator.");
    } else {
        cordova.plugins.barcodeScanner.scan(
            function(result) { //alert("hello");
                if (!result.cancelled) {
                    //document.getElementById("scanButton").style.display = "none";
                    //var currentMessage = resultsField.innerHTML;
                    profile_id = result.text;
                    $.ajax({
                        url: url_login,
                        type: 'GET',
                        success: function(result) {

                            sessionId = result.sessionId;
							alert(sessionId+"  "+profile_id);

                            $.ajax({
                                url: url_details1 + sessionId + "&id=" + profile_id + url_details2,
                                type: 'GET',
                                dataType: 'text',
                                success: function(result) {
                                    log = 1;
                                    //console.log((result));
                                    var txt, parser, xmlDoc, value1, value2;
                                    txt = result;
                                    parser = new DOMParser();
                                    xmlDoc = parser.parseFromString(txt, "text/xml");
                                    
                                    value1 = xmlDoc.getElementsByTagName("data")[0].childNodes[0].nextSibling;
                                    alert("xml");
                                    candidatePhoto = value1.childNodes[0].innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateEmail = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateCity = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateName = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidatePhoneNumber = value1.innerHTML;
                                    //value1 = value1.nextSibling.nextSibling
                                    //candidateInterviewDate = value1.innerHTML;
                                    value1 = value1.nextSibling.nextSibling
                                    candidateGender = value1.innerHTML;
                                    alert("successs");
                                    profileDisplay2();
                                    // myfun();

                                },
                                error: function(error) {
                                    alert("erro" + JSON.stringify(error));
                                }
                            });
                        },
                        error: function(err) {
                            console.log(err);
                        }
                    });


                }
            });
    }
}

function profileDisplay2() {
    document.getElementById('user_profile').style.display = 'block';
    document.getElementById('profile').style.display = 'none';
    profileDisplay();

}