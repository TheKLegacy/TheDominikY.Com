<script>

//Requires proxy server. If proxy goes down use https://github.com/Rob--W/cors-anywhere/, https://github.com/TheKLegacy/cors-anywhere, or research alternatives

const data = null;

var result;

const xhr = new XMLHttpRequest();

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(result = this.responseText);
    console.log(typeof result)
    result = JSON.parse(result.toString())
    console.log(result);
    console.log(result.hos_violations)
  }
});

xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api.keeptruckin.com/v1/hos_violations?driver_ids=&min_start_time=2019-10-30T07%3A43%3A51Z&max_start_time=NOW()&violation_types[]=break_30&violation_types[]=driving_11&per_page=25&page_no=1");
xhr.setRequestHeader("x-api-key", "3fa91fac-aaab-40b0-9e97-fad206477fb4");
xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr.send(data);


const data2 = null;

var result2;

const xhr2 = new XMLHttpRequest();

xhr2.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(result2 = this.responseText);
    console.log(typeof result2)
    result2 = JSON.parse(result2.toString())
    console.log(result2);
    console.log(result2.hos_violations)
  }
});

xhr2.open("GET", "https://cors-anywhere.herokuapp.com/https://customer.vigillo.com/api/v1/client/GetInspectionsAndViolations/484360/1/1000");
xhr2.setRequestHeader("Authorization", "Basic " + btoa("afaford@cktrucking.com:Trucking!23"));
xhr2.setRequestHeader("Access-Control-Allow-Origin", "*");
xhr2.setRequestHeader("Accept", "application/json");
xhr2.send(data2);

console.log(btoa("afaford@cktrucking.com:Trucking!23"));
</script>

<table id="test">
<tr><td>1</td><td>2</td></tr>
<tr><td>3</td><td>4</td></tr>
</table>
