let addord=document.getElementsByClassName("addord")[0];
let sacord=document.getElementsByClassName("sacord")[0];
let ordrvsmax=document.getElementsByClassName("ordrvsmax")[0];
let ordaddmax=document.getElementsByClassName("ordaddmax")[0];
let ordsacmax=document.getElementsByClassName("ordsacmax")[0];
let ordresultmax=document.getElementsByClassName("ordresultmax")[0];
let ul3=document.getElementById("ul3");
addord.onclick=function(){
    ordaddmax.style.display="block";
}
sacord.onclick=function(){
    ordsacmax.style.display="block";
}
function cancel_5(){
    ordaddmax.style.display="none";
}
function cancel_6(){
    ordsacmax.style.display="none";
}
function cancel_7(){
    ordrvsmax.style.display="none";
}
function cancel_8(){
    ordresultmax.style.display="none";
}
var ordnmb=1;
function orderPage(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/order/getInfoByPage_order',
        data:{
            page:ordnmb,
            per_page:5,
        },
        success:function(res){
            ul3.innerHTML="";
            let data=res.data;
            console.log(res);
            for(let i =0;i<data.length;i++){
                ul3.innerHTML+="<tr><td>"+data[i].us+"</td><td>"
                    +data[i].amount+"</td><td>"
                    +data[i].phone+"</td><td>"
                    +data[i].pay+"</td><td><button onclick='ordrevise(this);' style='color:blue;'>修改</button> <button onclick='orddelRow(this);' style='color:red;'>删除</button><span style='display: none;'>"+data[i]._id+"</span></td></tr>"
                
           }
        },
        error:function(err){
            console.log(err);
        }
    })
}
orderPage();
let totalorder=document.getElementById("total-order");
function ordertotal(){
    $.ajax({
        type:'get',
        url:"http://118.195.129.130:3000/order/allpage_order",
        data:{
            Null:null,
        },
        success:function(res){
            c=res.pages/5;
            d=Math.ceil(c);
            totalorder.innerHTML="共"+res.pages+"个订单,"+d+"页"
            orderPage();
        }
    })
}
ordertotal();
let uporder=document.getElementById("up-order");
let nextorder=document.getElementById("next-order");
let ordnum=document.getElementById("ordnum");
uporder.onclick=function(){
    if(ordnmb>1){
        ordnmb--;
        ordnum.innerHTML=ordnmb;
        orderPage();
    }
}
nextorder.onclick=function(){
    if(ordnmb<c){
        ordnmb++;
        ordnum.innerHTML=ordnmb;
        orderPage();
    }
}
let firstorder=document.getElementById("first-order");
let lastorder=document.getElementById("last-order");
firstorder.onclick=function(){
    ordnmb=1;
    orderPage();
}
lastorder.onclick=function(){
    ordnmb=d;
    orderPage();
}
function ordrevise(event){
    ordrvsmax.style.display="block";
    ordid=event.parentNode.getElementsByTagName('span')[0];
    let data=document.getElementsByClassName("ordrvsipt");
    let us=event.parentNode.parentNode.getElementsByTagName('td')[0];
    let amount=event.parentNode.parentNode.getElementsByTagName('td')[1];
    let phone=event.parentNode.parentNode.getElementsByTagName('td')[2];
    let pay=event.parentNode.parentNode.getElementsByTagName('td')[3];
    data[0].value=us.innerHTML;
    data[1].value=amount.innerHTML;
    data[2].value=phone.innerHTML;
    data[3].value=pay.innerHTML;
}
function B(){
    let data=document.getElementsByClassName("ordrvsipt");
    $.ajax({
        type:"post",
        url:'http://118.195.129.130:3000/order/update_order',
        data:{
            us:data[0].value,
            amount:data[1].value,
            phone:data[2].value,
            pay:data[3].value,
            _id:ordid.innerHTML,
        },
        success:function(res){
            console.log(res);
            cancel_7();
            ordertotal();
            orderPage();
            if(res.err==-1){
                alert("用户名不存在");
            }
        }
    })
}
let ordaddipt=document.getElementsByClassName("ordaddipt");
function ordaddRow(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/order/add_order',
        data:{
            us:ordaddipt[0].value,
            amount:ordaddipt[1].value,
            phone:ordaddipt[2].value,
            pay:ordaddipt[3].value,
        },
        success:function(res){
            orderPage();
            ordertotal();
            cancel_5();
            console.log(res);
            if(res.err==-1){
                alert("用户名不存在");
            }
        }
    })
}
let ordsearchipt=document.getElementsByClassName("ordsearchipt");
function ordsearch(){
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/order/getInfoByKw_order",
        data:{
            kw:ordsearchipt[0].value,
        },
        success:function(res){
            let data=res.data;
                console.log(res);
                cancel_6();
            if(data[0]==null){
                alert('搜索结果为空')
            }else{
                ordresultmax.style.display="block";
                ul4.innerHTML=""
                for(let i =0;i<data.length;i++){
                    ul4.innerHTML+="<tr> <td>"+data[i].us+"</td><td>"
                        +data[i].amount+"</td><td>"
                        +data[i].phone+"</td><td>"
                        +data[i].pay+"</td><td><button onclick='ordrevise(this);' style='color:blue;'>修改</button> <button onclick='orddelRow(this);' style='color:red;'>删除</button><span style='display: none;'>"+data[i]._id+"</span></td></tr>"
                }
           }
        }
    })
}
function orddelRow(event){
    ordidi =event.parentNode.getElementsByTagName('span')[0];
    let rel=confirm("真的要删除吗?")
    if(rel==true){
         F();
     }else{
         console.log('1')
     }
}
function F(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/order/del_order',
        data:{
            _id:ordidi.innerHTML,
        },
        success:function(res){
            ordertotal();
            orderPage();
            console.log(res);
        }
    })
}
