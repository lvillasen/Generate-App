console.log("welcome to client_new");

var ip="";
var rp_url="";
var n_event=0;
var n_event_tag = 0;
var single_evt = 0;
function leds() {
    ip = document.getElementById("ip").value;
    rp_url = "http://"+ip;
    console.log("My URL is "+rp_url)
    const led = document.getElementById("leds").value;
    const Http = new XMLHttpRequest();
    if (led == "") { var url = rp_url+':3000/leds';
}else{
    var url = rp_url+':3000/leds/'+led }



    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        document.getElementById("data_display_LEDs").innerHTML = Http.responseText;

    }
}

function bash() {
    const code = document.getElementById("code_input_bash").value;
    const Http = new XMLHttpRequest();
    const url = rp_url+':3000/bash?text='+encodeURIComponent(code);
    console.log('1.BASH sent to server');
    fetch(url)
        .then(response => {
            
            response => response.text();
            response => response();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error('Error with Bash:', error);
        });
}

function leds_python() {
    const code = document.getElementById("code_input_leds").value;
    const Http = new XMLHttpRequest();
    const url = rp_url+':3000/python?text='+encodeURIComponent(code);
    console.log('2.LEDs Python sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error('Error with LEDs Python:', error);
        });
}





function arm_trigger() {
        console.log('ARM TRIGGER sent to server');
    
        n_event+=1;
        n_event_tag = 10*n_event;
        const url1 = rp_url+':3001/arm_trig/'+ n_event 


        const Http = new XMLHttpRequest();

        Http.open("GET", url1 );
        Http.send();
        console.log('Arm_trigger received by server')

        Http.onreadystatechange = (e) => {
            var resp = Http.responseText;

            console.log("ARM TRIGGER Server response for event: " + n_event)
            myArray = resp.split(",");
            //if (n_event == myArray[0]){
                //n_event_tag += 1;
                //if (n_event_tag == 10*n_event+1) {


            resp_array = resp.slice(",");
            document.getElementById("data_display_plot").innerHTML = myArray[1]+ " Number of Points: "+myArray.length;
            console.log(resp_array);
            //X_data = [];
            //Y_data = [];
            X_data = [0];
            Y_data =[myArray[0].split("[")[1]]
            for (var i = 1; i < myArray.length; i++) {
                X_data.push(i);
                Y_data.push(parseFloat(myArray[i]));
            }
            console.log("Number of data points =", myArray.length)
            if (myArray.length>10){
                draw();
                document.getElementById("arm_trigger").value = "OFF";
            }
        }
            
            
    
}










function draw() {
    if (document.getElementById("arm_trigger").value == "SINGLE") {
        document.getElementById("arm_trigger").value ="OFF"
    }
    
    var layout = {
        xaxis: {
            //   range: [0, N],
            title: "Time (ns)"
        },
        yaxis: {
            //range: [-150, 0],
            title: "Amplitude (mV)"
        },
    title: {
            text:"Data Acquired <br> Event: " + n_event,
          font: {
      family: 'Times New Roman',
      size: 24
    },
}
    };
    var data = [{
        x: X_data,
        y: Y_data,
        mode: "lines+markers",
        type: 'line',
        marker: {
            color: 'blue',
            size: 4,
            line: {
                color: 'black',
                width: .2
            }
        },
    }];

    Plotly.newPlot("plot1", data, layout);
    //if (document.getElementById("arm_trigger").value == "NORMAL") {
    //    arm_trigger();
    //}
}



function upload() {
    const code = document.getElementById("code_input_upload").value;
    const Http = new XMLHttpRequest();
    const url = rp_url+':3000/upload?text='+encodeURIComponent(code);
    console.log('3.UPLOAD WAVE sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error('Error with Upload waveform:', error);
        });
}

function settings() {
    const code = document.getElementById("code_input_settings").value;
    const Http = new XMLHttpRequest();
    const url = rp_url+':3000/settings?text='+encodeURIComponent(code);
    console.log('4.DAC SETTINGS sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error('Error with DAC settings:', error);
        });
}

function start_DAC() {
    const code = document.getElementById("code_input_start_DAC").value;
    //const Http = new XMLHttpRequest();
    const url = rp_url+':3000/start_DAC?text='+encodeURIComponent(code);
    console.log('6.START DAC sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        //.then(data => console.log(data))
        .catch(error => {
            console.error('Error with Start DAC:', error);
        });
}

function stop_DAC() {
    document.getElementById("arm_trigger").value = "OFF";
    //const Http = new XMLHttpRequest();
    const url = rp_url+':3002/stop_DAC';
    console.log('7.STOP DAC sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        //.then(data => console.log(data))
        .catch(error => {
            console.error('Error with Start DAC:', error);
        });
}

function save_arm_trigger() {
    const code = document.getElementById("code_input_save").value;
    //const Http = new XMLHttpRequest();
    const url = rp_url+':3000/save?text='+encodeURIComponent(code);
    console.log('5.SAVE sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        //.then(data => console.log(data))
        .catch(error => {
            console.error('Error with Save:', error);
        });
}


/*
function normal() {
    if (document.getElementById("arm_trigger").value != "NORMAL") {
        document.getElementById("arm_trigger").value = "NORMAL";
        console.log("Trigger is NORMAL ON ....");
        arm_trigger();
    }

}
*/

function single() {
    if (document.getElementById("arm_trigger").value != "SINGLE") {
        document.getElementById("arm_trigger").value = "SINGLE";

        console.log("Trigger is SINGLE ON ....");
        arm_trigger();
        
        
    }

}

function trigger() {
        document.getElementById("arm_trigger").value = "OFF";
        console.log("Trigger is OFF ....");
}


