<html>
    <head>
        <link rel="stylesheet" type="text/css" href="style.css" />
        	<script>
	window.addEventListener("load", function(){
    if(window.self === window.top) return; // if w.self === w.top, we are not in an iframe
    send_height_to_parent_function = function(){
        var height = document.getElementsByTagName("html")[0].clientHeight;
        //console.log("Sending height as " + height + "px");
        parent.postMessage({"height" : height }, "*");
    }
    // send message to parent about height updates
    send_height_to_parent_function(); //whenever the page is loaded
    window.addEventListener("resize", send_height_to_parent_function); // whenever the page is resized
    var observer = new MutationObserver(send_height_to_parent_function);           // whenever DOM changes PT1
    var config = { attributes: true, childList: true, characterData: true, subtree:true}; // PT2
    observer.observe(window.document, config);                                            // PT3
});

	</script>
    </head>
<body>
	<div class="articles_body" align="left" id="display"></div>




	<script>
			function parseData(theData){
				var Dates = "";
				var firstRow = true;
				while(theData.length > 0){
					var currentLine = "";
					var currentDate = theData.substring(0,theData.indexOf("^"));
					theData = theData.substring(theData.indexOf("^")+1);
					currentLine += currentDate + " - ";
					currentLine += theData.substring(0,theData.indexOf("^"));
					theData = theData.substring(theData.indexOf("^")+1)
					currentLine += ", ";
					currentLine += theData.substring(0,theData.indexOf("^"));
					theData = theData.substring(theData.indexOf("^")+1)
					currentLine+="<br>"
					if(firstRow){
						firstRow = false;
					}
					else{
						Dates += currentLine;
					}
				}
				return Dates;
			}
			//cannot have carrot symbol("^") in spreadsheet
			var theData1 = <?php $url='https://docs.google.com/spreadsheets/d/e/2PACX-1vR_5UI4-5ToL9L5bcGTWDSs9X23olkWKfTr3dzrRWiP07tzql6hCmG-nJoN-J-zSfj8Ft_DWXlVQF5d/pub?gid=0&single=true&output=csv';
                if (($handle = fopen($url, "r")) !== FALSE) {
                    $result="";
                    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE){
                        $totalrows = count($data);
                        for ($row=0; $row<=$totalrows; $row++){
                            if ( (strlen($data[$row])>0)){
                                $result.=$data[$row].'^';
                            }
                        }
                    }
                    fclose($handle);
                }
                echo json_encode($result, JSON_HEX_TAG);?>;
			var theData2 = <?php $url='https://docs.google.com/spreadsheets/d/e/2PACX-1vR_5UI4-5ToL9L5bcGTWDSs9X23olkWKfTr3dzrRWiP07tzql6hCmG-nJoN-J-zSfj8Ft_DWXlVQF5d/pub?gid=143812621&single=true&output=csv';
                if (($handle = fopen($url, "r")) !== FALSE) {
                    $result="";
                    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE){
                        $totalrows = count($data);
                        for ($row=0; $row<=$totalrows; $row++){
                            if ( (strlen($data[$row])>0)){
                                $result.=$data[$row].'^';
                            }
                        }
                    }
                    fclose($handle);
                }
                echo json_encode($result, JSON_HEX_TAG);?>;
			var upcomingDates = "<strong>Upcoming Dates:<br><br></strong>"+parseData(theData1);
			var recentDates = "<strong>Recent Dates:<br><br></strong>"+parseData(theData2);
			var result = upcomingDates + "<br>" +recentDates;
			document.getElementById("display").innerHTML = result;
	</script>
</body>
</html>
