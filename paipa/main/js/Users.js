let ul5=document.getElementById("ul5");
let sacues=document.getElementsByClassName("sacues")[0];
let uessacmax=document.getElementsByClassName("uessacmax")[0];
let uesresultmax=document.getElementsByClassName("uesresultmax")[0];
let uesrvsmax=document.getElementsByClassName("uesrvsmax")[0];
let uesaddmax=document.getElementsByClassName("uesaddmax")[0];
var uesnmb=1;
sacues.onclick=function(){
    uessacmax.style.display="block";
}
function cancel_9(){
    uessacmax.style.display="none";
}
function cancel_10(){
    uesrvsmax.style.display="none"
}
function cancel_11(){
    uesaddmax.style.display="none"
}
function cancel_12(){
    uesresultmax.style.display="none"
}
function UsersPage(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/users/getInfoByPage_users',
        data:{
            page:uesnmb,
            per_page:3,
        },
        success:function(res){
            ul5.innerHTML="";
            let data=res.data;
            console.log(res);
            for(let i =0;i<data.length;i++){
                // if(data[i].sex==0){
                //     uessex="男";
                // }else{
                //     uessex="女"
                // }
                ul5.innerHTML+="<tr><td>"+data[i].us+"</td><td>"
                    +data[i].age+"</td><td>"
                    +data[i].sex+"</td><td>"
                    +data[i].integral+"</td><td style='display:none;'>"
                    +data[i]._id+"</td><td><button onclick='uesrevise(this);'>修改信息</button> <button onclick='uesadd(this);'>添加积分</button></td></tr>"
                
           }
        },
        error:function(err){
            console.log(err);
        }
    })
}
UsersPage();
let totalues=document.getElementById("total-ues");
function Userstotal(){
    $.ajax({
        type:'get',
        url:"http://118.195.129.130:3000/users/allpage_users",
        data:{
            Null:null,
        },
        success:function(res){
            e=res.pages/3;
            f=Math.ceil(e);
            totalues.innerHTML="共"+res.pages+"个用户,"+f+"页"
            UsersPage();
        }
    })
}
Userstotal();
let upues=document.getElementById("up-ues");
let nextues=document.getElementById("next-ues");
let uesnum=document.getElementById('uesnum');
upues.onclick=function(){
    if(uesnmb>1){
        uesnmb--;
        uesnum.innerHTML=uesnmb;
        UsersPage();
    }
}
nextues.onclick=function(){
    if(uesnmb<e){
        uesnmb++;
        uesnum.innerHTML=uesnmb;
        UsersPage();
    }
}
let firstues=document.getElementById("first-ues");
let lastues=document.getElementById("last-ues");
firstues.onclick=function(){
    uesnmb=1;
    UsersPage();
}
lastues.onclick=function(){
    uesnmb=f;
    UsersPage();
}
let uesid;
function uesrevise(event){
    uesrvsmax.style.display="block";
    let data=document.getElementsByClassName("uesrvsipt");
    let us=event.parentNode.parentNode.getElementsByTagName('td')[0];
    let age=event.parentNode.parentNode.getElementsByTagName('td')[1];
    let sex=event.parentNode.parentNode.getElementsByTagName('td')[2];
    uesid=event.parentNode.parentNode.getElementsByTagName('td')[4];
    data[0].value=us.innerHTML;
    data[1].value=age.innerHTML;
    data[2].value=sex.innerHTML;
}
function C(){
    let uesrvsipt=document.getElementsByClassName("uesrvsipt");
    $.ajax({
        type:"post",
        url:'http://118.195.129.130:3000/users/update_users',
        data:{
            us:uesrvsipt[0].value,
            age:uesrvsipt[1].value,
            sex:uesrvsipt[2].value,
            _id:uesid.innerHTML,
        },
        success:function(res){
            console.log(res);
            cancel_10();
            UsersPage();
        }
    })
}
function uesadd(event){
    uesaddmax.style.display="block";
    uesus=event.parentNode.parentNode.getElementsByTagName('td')[0];
    uesage=event.parentNode.parentNode.getElementsByTagName('td')[1];
    uessex=event.parentNode.parentNode.getElementsByTagName('td')[2];
}
// if(uessex.innerHTML=="男"){
//     usex=0;
// }else{
//     usex=1;
// }
function D(){
    let data=document.getElementsByClassName("uesaddipt");
    $.ajax({
        type:"post",
        url:'http://118.195.129.130:3000/users/integral',
        data:{
            integral:data[0].value,
            us:uesus.innerHTML,
            age:uesage.innerHTML,
            sex:uessex.innerHTML,
        },
        success:function(res){
            console.log(res);
            cancel_11();
            UsersPage();
            data[0].value=""
        }
    })
}
let uessearchipt=document.getElementsByClassName("uessearchipt");
function uessearch(){
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/users/getInfoByKw_users",
        data:{
            kw:uessearchipt[0].value,
        },
        success:function(res){
            let data=res.data;
            console.log(res);
            cancel_9();
            if(data[0]==null){
                alert('搜索结果为空')
            }else{
                uesresultmax.style.display="block";
                ul6.innerHTML=""
                for(let i =0;i<data.length;i++){
                    ul6.innerHTML+="<tr><td>"+data[i].us+"</td><td>"
                        +data[i].age+"</td><td>"
                        +data[i].sex+"</td><td>"
                        +data[i].integral+"</td><td style='display:none;'>"
                        +data[i]._id+"</td><td><button onclick='uesrevise(this);'>修改信息</button> <button onclick='uesadd(this);'>添加积分</button></td></tr>"
                    }
            }
        }
    })
}