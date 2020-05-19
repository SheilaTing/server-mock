// Node.js 模拟 server

const http = require('http')
const fs = require('fs')
const url = require('url')

http.createServer((req,res)=>{
    //设置 content-type 防止乱码
    res.setHeader("Content-type","text/html;charset=utf8");
    //将请求的 url解析成对象  请求的路径
     let pathObj = url.parse(req.url,true);
     //对不同的路径做不同的处理
     switch(pathObj.pathname){
         case '/getWeather':
             if(pathObj.query.city === 'beijing'){
                res.end(JSON.stringify({city:'beijing',data:'晴朗'}))
             }else{
                 res.end(JSON.stringify({city:pathObj.query.city,data:'unknown'}))
             }
             break;
             default :
             try {
                 //判断请求路径是否是根路径，如果是就显示index.html的内容
               let pathname =  pathObj.pathname === '/' ?'index.html':pathObj.pathname;
               //__dirname 当前文件在磁盘的绝对路径
               res.end(fs.readFileSync(__dirname+pathname))
             } catch (error) {
                res.writeHead(404, 'Not Found')
                res.end('<h1>404 Not Found~</h1>')
             }
           
     }

}).listen(8888)




