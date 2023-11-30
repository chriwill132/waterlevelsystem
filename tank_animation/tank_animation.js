FusionCharts.ready(function(){
			var chartObj = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    renderAt: 'chart-container',
    width: '350',
    height: '370',
    dataSource: {
        "chart": {
            "theme": "fusion",
            "caption": "",
            "subcaption": "",
            "lowerLimit": "0",
            "upperLimit": "184",
            "numberSuffix": " cm",
            "showValue": "1",
            "chartBottomMargin": "45",
            "showValue": "0",
			"dataStreamUrl": "insert_data.php",
			"refreshInterval": "1",
			"refreshInstantly": "1",
			"cylFillColor": "#35d1fd",
			"cyloriginx": "125",
			"cyloriginy": "270",
			"cylradius": "120",
			"cylheight": "250"
        },
        "value": "46",
        "annotations": {
            "origw": "400",
            "origh": "290",
            "autoscale": "1",
            "groups": [{
                "id": "range",
                "items": [{
                    "id": "rangeBg",
                    "type": "rectangle",
                    "x": "$canvasCenterX-75",
                    "y": "$chartEndY-40",
                    "tox": "$canvasCenterX +55",
                    "toy": "$chartEndY-80",
                    "fillcolor": "#35d1fd"
                }, {
                    "id": "rangeText",
                    "type": "Text",
                    "fontSize": "20",
                    "fillcolor": "#333333",
                    "text": "Loading...",
                    "x": "$chartCenterX-60",
                    "y": "$chartEndY-60"
                }]
            }]
        }

    },
    "events": {
        "rendered": function(evtObj, argObj) {
           
            evtObj.sender.chartInterval = setInterval(function() {
			    evtObj.sender.feedData && evtObj.sender.feedData("&value=");
            }, 2000);
        },
        /* Using real time update event to update the annotation */
        
        //showing available volume in tank (setting colors as per available volume)
        "realTimeUpdateComplete": function(evt, arg) {
            var annotations = evt.sender.annotations,
                dataVal = evt.sender.getData(),
                colorVal = (dataVal >= 138) ? "#DD0004" : ((dataVal <= 92) && (dataVal >= 46) ? "#ff6700 " : "#00FF00  "); 
            //Updating the volume value
            annotations && annotations.update('rangeText', {
                "text": dataVal + " cm"
            });
            //setting background color of annotation as per value
            annotations && annotations.update('rangeBg', {
                "fillcolor": colorVal
            });

        },
        "disposed": function(evt, arg) {
            clearInterval(evt.sender.chartInterval);
        }
    }
}
);
			chartObj.render();
		});