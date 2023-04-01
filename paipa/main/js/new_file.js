if(!window.sessionStorage.getItem("id")){
    alert("请先登录")
    window.location.href="../signin/index.html";
}
let foodaddbtn=document.getElementsByClassName("foodaddbtn")[0];
let foodadd=document.getElementsByClassName("foodaddmax")[0];
let foodsac=document.getElementsByClassName("foodsacmax")[0];
let foodsearchbtn=document.getElementsByClassName("foodsearchbtn")[0];
let result = document.getElementsByClassName("resultmax")[0];
let rvs = document.getElementsByClassName("rvsmax")[0];
let ul1=document.getElementById("ul1");
let order=document.getElementById("order");
let food=document.getElementById("food");
let Users=document.getElementById("Users");
let foodmax=document.getElementsByClassName("foodmax")[0];
let ordermax=document.getElementsByClassName("ordermax")[0];
let Usersmax=document.getElementsByClassName("Usersmax")[0];
order.onclick=function(){
    foodmax.style.display="none";
    ordermax.style.display="block"
    Usersmax.style.display="none";
    usermax.style.display="none";
    order.style.color="#3a67b3";
    food.style.color="#bfcbd9";
    Users.style.color="#bfcbd9";
}
food.onclick=function(){
    foodmax.style.display="block";
    ordermax.style.display="none"
    Usersmax.style.display="none";
    usermax.style.display="none";
    order.style.color="#bfcbd9";
    food.style.color="#3a67b3";
    Users.style.color="#bfcbd9";
}
Users.onclick=function(){
    foodmax.style.display="none";
    ordermax.style.display="none";
    usermax.style.display="none";
    Usersmax.style.display="block";
    order.style.color="#bfcbd9";
    food.style.color="#bfcbd9";
    Users.style.color="#3a67b3";
}
foodaddbtn.onclick=function(){
    foodadd.style.display="block";
}
foodsearchbtn.onclick=function(){
    foodsac.style.display="block";
}
function cancle_4(){
    rvs.style.display="none";
}
function cancel(){
    foodadd.style.display="none";
}
function cancel_2(){
    foodsac.style.display="none";
}
function cancel_3(){
    result.style.display="none";
}
let foodaddipt=document.getElementsByClassName("foodaddipt");
function foodaddRow(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/add',
        data:{
            name:foodaddipt[0].value,
            price:foodaddipt[1].value,
            desc:foodaddipt[2].value,
            typename:foodaddipt[3].value,
            typeid:foodaddipt[4].value,
        },
        success:function(res){
            chagePage();
            foodtotal();
            cancel();
            console.log(res);
        }
    })
}
function revise(event){
    rvs.style.display="block";
    id=event.parentNode.getElementsByTagName('span')[0];
    let data=document.getElementsByClassName("rvsipt");
    let name=event.parentNode.parentNode.getElementsByTagName('td')[0];
    let price=event.parentNode.parentNode.getElementsByTagName('td')[1];
    let desc=event.parentNode.parentNode.getElementsByTagName('td')[2];
    let typeid=event.parentNode.parentNode.getElementsByTagName('td')[3];
    let _id=event.parentNode.parentNode.getElementsByTagName('td')[4];
    data[0].value=name.innerHTML;
    data[1].value=price.innerHTML;
    data[2].value=desc.innerHTML;
    data[3].value=typeid.innerHTML;
    data[4].value=_id.innerHTML;
}
function A(){
    let data=document.getElementsByClassName("rvsipt");
    $.ajax({
        type:"post",
        url:'http://118.195.129.130:3000/food/update',
        data:{
            name:data[0].value,
            price:data[1].value,
            desc:data[2].value,
            typename:data[3].value,
            typeid:data[4].value,
            _id:id.innerHTML,
        },
        success:function(res){
            console.log(res);
            cancle_4();
            foodtotal();
            chagePage();
        }
    })
}
let foodsearchipt=document.getElementsByClassName("foodsearchipt");
function search(){
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/food/getInfoByKw",
        data:{
            kw:foodsearchipt[0].value,
        },
        success:function(res){
            let data=res.data;
            console.log(res);
            cancel_2();
            if(data[0]==null){
                alert("搜索结果为空")
            }else{
                result.style.display="block";
                ul2.innerHTML=""
                for(let i =0;i<data.length;i++){
                    ul2.innerHTML+="<tr> <td>"+data[i].name+"</td><td>"
                        +data[i].price+"</td><td>"
                        +data[i].desc+"</td><td>"
                        +data[i].typename+"</td><td>"
                        +data[i].typeid
                        +"</td><td><button onclick='revise(this);' style='color:blue修改</button> <button onclick='delRow(this);' style='color:red;'>删除</button><span style='display: none;'>"+data[i]._id+"</span></td></tr>"
                    }
            }
        }
    })
}
function delRow(event){
    foodid = event.parentNode.getElementsByTagName('span')[0];
    let rel=confirm("真的要删除吗?")
    if(rel==true){
         E();
     }else{
         console.log('1')
     }
}
function E(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/del',
        data:{
            _id:foodid.innerHTML,
        },
        success:function(res){
            foodtotal();
            chagePage();
            console.log(res);
        }
    })
}