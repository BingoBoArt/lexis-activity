<style>
@color: #049B19;
body{
  background: black;
  color: @color;
}
.test-wrapper{
    overflow: hidden;
    padding: 30px;
    .test-item{
        border-bottom: 1px solid #012506;
        padding-bottom: 35px;
        label{
            display: block;
            line-height: 70px;
            font-size: 28px;
        }
        .info{
            line-height: 38px;
            color: @color;
            font-size: 25px;
        }
        &:not(:first-child){
            padding-top: 35px;
        }
        .tipinfo{
            font-size: 28px;
            color: @color;
            margin: 8px 0;
        }
    }
    .link-btn{
        background-color: #cf402f;
        color: white;
        height: 50px;
        line-height: 50px;
        width: 200px;
        text-align: center;
        display: block;
        border-radius: 50px;
    }
    #ipinfo{
        span{
            margin: 0 10px;
        }
    }
    button {
        margin: 20px 10px 0 0;
        width: 130px;
    }
    button#gather {
        display: block;
    }
    section#iceServers input {
        margin: 0 0 10px;
        width: 260px;
    }
    section#iceConstraints label {
        margin: 0 1em 0 0;
    }
    section#iceServers label {
        display: inline-block;
        width: 150px;
    }

    section#iceOptions label {
        display: inline-block;
        width: 200px;
    }

    select#servers {
        font-size: 30px;
        padding: 5px;
        width: 420px;
        width: 100%;
    }
    div#iceTransports span {
        margin: 0 1em 0 0;
    }
    table#candidates {
        font-size: 28px;
        overflow-y: auto;
        text-align: right;
        width: 100%;
        margin-top: 10px;
    }
    th {
        font-weight: bold;
    }
    /*
    th:nth-child(3),td:nth-child(3) {
    text-align: left
    }
    th:nth-child(6),td:nth-child(6) {
    text-align: left
    }
    */

    .gray {
        color: gray
    }

    #poolValue {
        display: inline-block;
        width: 30px
    }

    #getUserMediaPermissions {
        display: none;
    }
    .display-none{
        display: none;
    }
    h2.title{
        margin: 5px 0 8px;
        font-size: 40px;
    }
    button{
        background-color: #045d10;
        color: white;
        width: 200px;
        height: 60px;
        border-radius: 100px;
        font-size: 25px;
        border: none;
        &.disable{
            background-color: #013208;
            color: #049619;
        }
    }
    section#iceServers .radio-group{
        input[type='radio']{
            width: 30px;
            height: 30px;
            border-radius: 100px;
            background: #b3b3b3;
            vertical-align: middle;
            &:checked{
                background: green;
                position: relative;
                &:after{
                    content: ' ';
                    width: 12px;
                    height: 12px;
                    background: white;
                    position: absolute;
                    border-radius: 50px;
                    top: 50%;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                }
            }
        }
    }
}
</style>

<template>
    <div class="wrapper test-wrapper">
        <!--
        <div class="test-item">
            <label>TEST:</label>
            <a class="link-btn" href="http://39.106.134.24:3478/">http test</a>
        </div>
        -->
        <div class="test-item">
            <div id="container">
                <section id="iceServers">
                    <h2  class="title">Server Test</h2>
                    
                    <select id="servers" size="4" v-model="ip_checked">
                        <option v-for="(ip, index) in ip_list" :key="index" :value='ip'>{{ip}}</option>
                    </select>
                    
                </section>

                <section>
                    <table id="candidates">
                        <thead id="candidatesHead">
                            <tr>
                                <th>Time</th>
                                <!-- <th>Component</th> -->
                                <!-- <th>Foundation</th> -->
                                <th>Protocol</th>
                                <th>Type</th>
                                <th>Address</th>
                                <!-- <th>Port</th> -->
                                <!-- <th>Priority</th> -->
                            </tr>
                        </thead>
                        <tbody id="candidatesBody">
                        </tbody>
                    </table>
                    <button id="gather-stun" :class="{'disable': is_gather || !is_support_rtc}">STUN Test</button>
                    <button id="gather-turn" :class="{'disable': is_gather || !is_support_rtc}">TURN Test</button>
                    <button id="gather-http" :class="{'disable': is_gather}">HTTP Test</button>
                    <p class="tipinfo" v-if="!is_support_rtc">Tips: You can test the first two buttons on the computer side</p>
                </section>

            </div>
        </div>
        <div class="test-item">
            <h2 class="title">My Ip Info</h2>
            <div id="ipinfo" class="info">
                <div v-if="myIpInfo">
                    <span>{{myIpInfo.ip}}</span>
                    <span>{{myIpInfo.country + ' ' + myIpInfo.region + ' ' + myIpInfo.city}}</span>
                    <span>{{myIpInfo.isp}}</span>
                </div>
                <div v-if="!myIpInfo">
                    loading ...
                </div>
            </div>
        </div>
        <div class="test-item">
            <h2 class="title">User Agent:</h2>
            <div class="info">{{userAgent}}</div>
        </div>
    </div>
</template>

<script>
import Request from "@/common/request";
// import Urls from "@/common/urls.js";
// import ComUtil from "@/common/util.js"
export default {
    name: 'TestTool',
    components: {
    },
    data: () => {
      return {
          userAgent: navigator.userAgent,
          is_support_rtc: ((window.RTCPeerConnection && navigator.mediaDevices) ? 1 : 0),
          is_gather: false,
          ip_checked: '54.205.0.84',
          ip_changed: '',
          ip_list: [
              '54.205.0.84',
              '39.106.134.24'
          ],
          myIpInfo: null
      }
    },
    methods: {
        getMyIp() {
            Request({
                url: 'http://app.lexislive.com.cn/ip/query'
                // mock: require("@/mock/ip.js")
            }).then((res) => {
                this.myIpInfo = res.data
            })
        },
        initServerTest() {
            let that = this;

            // Logging utility function.
            function trace(arg) {
                var now = (window.performance.now() / 1000).toFixed(3);
                console.log(now + ': ', arg);
            }
            var candidateTBody = document.querySelector('tbody#candidatesBody');
            var gatherStunButton = document.querySelector('button#gather-stun');
            var gatherTurnButton = document.querySelector('button#gather-turn');
            var gatherHttpButton = document.querySelector('button#gather-http');
            var servers = document.querySelector('select#servers');

            gatherStunButton.onclick = startStun;
            gatherTurnButton.onclick = startTurn;
            gatherHttpButton.onclick = startHttp;

            var begin;
            var pc;
            var candidates;

            function startStun() {
                let ip = that.ip_checked;
                that.ip_changed = `{"urls":["stun:${ip}:3478"],"username":"","credential":""}`;
                // servers[0].value = '{"urls":["stun:39.106.134.24:3478"],"username":"","credential":""}';
                start();
            }
            function startTurn() {
                let ip = that.ip_checked;
                that.ip_changed = `{"urls":["turn:${ip}:3478"],"username":"lexis","credential":"lexislive"}`;
                start();
            }
            function startHttp() {
                let ip = that.ip_checked;
                that.ip_changed = `http://${ip}:3478`;

                // Clean out the table.
                while (candidateTBody.firstChild) {
                    candidateTBody.removeChild(candidateTBody.firstChild);
                }
                let ip_list = that.ip_list;
                let begin_list = {};
                ip_list.forEach((ip, index) => {
                    begin_list[index] = window.performance.now();
                    // let url = `http://${ip}:3478`;
                    Request({
                        url: `http://${ip}:3478`,
                        dataType: 'text'
                    }).then(function(res){
                        var elapsed = ((window.performance.now() - begin_list[index]) / 1000).toFixed(3);
                        var row = document.createElement('tr');
                        appendCell(row, elapsed);
                        appendCell(row, "http");
                        appendCell(row, "--");
                        appendCell(row, ip);
                        candidateTBody.appendChild(row);
                    }).fail(function(res){
                        var row = document.createElement('tr');
                        appendCell(row, res.status || "fail");
                        appendCell(row, "http");
                        appendCell(row, "--");
                        appendCell(row, ip);
                        candidateTBody.appendChild(row);
                    })
                })
                // servers[0].value = '{"urls":["turn:39.106.134.24:3478"],"username":"lexis","credential":"lexislive"}'
                // start();
            }
            function start() {
                if(that.is_gather || !that.is_support_rtc){
                    return;
                }
                that.is_gather = true;
                // Clean out the table.
                while (candidateTBody.firstChild) {
                    candidateTBody.removeChild(candidateTBody.firstChild);
                }

                // gatherButton.disabled = true;

                // Read the values from the input boxes.
                var iceServers = [];
                iceServers = [JSON.parse(that.ip_changed)]
                /*
                for (var i = 0; i < servers.length; ++i) {
                    iceServers.push(JSON.parse(servers[i].value));
                }
                */
                var transports = document.getElementsByName('transports');
                var iceTransports;
                for (var i = 0; i < transports.length; ++i) {
                    if (transports[i].checked) {
                        iceTransports = transports[i].value;
                        break;
                    }
                }

                // Create a PeerConnection with no streams, but force a m=audio line.
                var config = {
                    iceServers: iceServers,
                    iceTransportPolicy: iceTransports
                };

                var pcConstraints = {};
                var offerOptions = { offerToReceiveAudio: 1 };
                // Whether we only gather a single set of candidates for RTP and RTCP.

                trace('Creating new PeerConnection with config=' + JSON.stringify(config) +
                    ', constraints=' + JSON.stringify(pcConstraints));
                pc = new RTCPeerConnection(config, pcConstraints);
                pc.onicecandidate = iceCallback;
                pc.onicegatheringstatechange = gatheringStateChange;
                pc.createOffer(
                    offerOptions
                ).then(
                    gotDescription,
                    noDescription
                    );
            }

            function gotDescription(desc) {
                begin = window.performance.now();
                candidates = [];
                pc.setLocalDescription(desc);
            }

            function noDescription(error) {
                console.log('Error creating offer: ', error);
            }

            // Parse a candidate:foo string into an object, for easier use by other methods.
            function parseCandidate(text) {
                var candidateStr = 'candidate:';
                var pos = text.indexOf(candidateStr) + candidateStr.length;
                var [foundation, component, protocol, priority, address, port, , type] =
                    text.substr(pos).split(' ');
                return {
                    'component': component,
                    'type': type,
                    'foundation': foundation,
                    'protocol': protocol,
                    'address': address,
                    'port': port,
                    'priority': priority
                };
            }

            function appendCell(row, val, span) {
                var cell = document.createElement('td');
                cell.textContent = val;
                if (span) {
                    cell.setAttribute('colspan', span);
                }
                row.appendChild(cell);
            }

            // Try to determine authentication failures and unreachable TURN
            // servers by using heuristics on the candidate types gathered.
            function getFinalResult() {
                var result = 'Done';

                // if more than one server is used, it can not be determined
                // which server failed.
                if (servers.length === 1) {
                    var server = JSON.parse(servers[0].value);

                    // get the candidates types (host, srflx, relay)
                    var types = candidates.map(function (cand) {
                        return cand.type;
                    });

                    // If the server is a TURN server we should have a relay candidate.
                    // If we did not get a relay candidate but a srflx candidate
                    // authentication might have failed.
                    // If we did not get  a relay candidate or a srflx candidate
                    // we could not reach the TURN server. Either it is not running at
                    // the target address or the clients access to the port is blocked.
                    //
                    // This only works for TURN/UDP since we do not get
                    // srflx candidates from TURN/TCP.
                    if (server.urls[0].indexOf('turn:') === 0 &&
                        server.urls[0].indexOf('?transport=tcp') === -1) {
                        if (types.indexOf('relay') === -1) {
                            if (types.indexOf('srflx') > -1) {
                                // a binding response but no relay candidate suggests auth failure.
                                result = 'Authentication failed?';
                            } else {
                                // either the TURN server is down or the clients access is blocked.
                                result = 'Not reachable?';
                            }
                        }
                    }
                }
                return result;
            }

            function iceCallback(event) {
                var elapsed = ((window.performance.now() - begin) / 1000).toFixed(3);
                var row = document.createElement('tr');
                appendCell(row, elapsed);
                if (event.candidate) {
                    var c = parseCandidate(event.candidate.candidate);
                    // appendCell(row, c.component);
                    appendCell(row, c.protocol);
                    appendCell(row, c.type);
                    appendCell(row, c.address + ":" + c.port);
                    // appendCell(row, c.foundation);
                    // appendCell(row, c.port);
                    // appendCell(row, formatPriority(c.priority));
                    candidates.push(c);
                } else if (!('onicegatheringstatechange' in RTCPeerConnection.prototype)) {
                    // should not be done if its done in the icegatheringstatechange callback.
                    appendCell(row, getFinalResult(), 7);
                    pc.close();
                    pc = null;
                    that.is_gather = false;
                }
                candidateTBody.appendChild(row);
            }

            function gatheringStateChange() {
                if (pc.iceGatheringState !== 'complete') {
                    return;
                }
                var elapsed = ((window.performance.now() - begin) / 1000).toFixed(3);
                var row = document.createElement('tr');
                appendCell(row, elapsed);
                appendCell(row, getFinalResult(), 7);
                pc.close();
                pc = null;
                that.is_gather = false;
                candidateTBody.appendChild(row);
            }

            // check if we have getUserMedia permissions.
            if(that.is_support_rtc){
                navigator.mediaDevices.enumerateDevices()
                .then(function (devices) {
                    devices.forEach(function (device) {
                        if (device.label !== '') {
                            document.getElementById('getUserMediaPermissions').style.display =
                                'block';
                        }
                    });
                });
            }

            startHttp();
        }
    },
    created: function() {
        this.$loading.hide();
    },
    mounted: function() {
        this.getMyIp();
        this.initServerTest();
    }
}
</script>

