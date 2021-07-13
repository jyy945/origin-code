let xmlhttp;
if(window.ActiveXObject){
    clietn = window.ActiveXObject('Microsoft.XMLHTTP')
}else{
    xmlhttp = new XMLHttpRequest()
}

xmlhttp.onreadystatechange = function(){
    if(this.readyState === 4){
        if(this.status === 200){
            document.getElementById('container').innerText = xmlhttp.responseText
        }
    }else{
        document.getElementById('container').innerText = 'loading'
    }
}

document.getElementById('div').onclick = function(){
    xmlhttp.open('get', 'http://localhost:8888/ajax')
    xmlhttp.send()
}