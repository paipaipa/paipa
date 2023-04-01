let usernavmax=document.getElementsByClassName('usernavmax')[0];
let usernav=document.getElementsByClassName('usernav')[0];
let ul7=document.getElementsByClassName("ul7")[0];
let user=document.getElementsByClassName("user")[0];
let usermax=document.getElementsByClassName("usermax")[0];
let userrvsmax=document.getElementsByClassName("userrvsmax")[0];
let ustext=document.getElementsByClassName('ustext')[0];
let agetext=document.getElementsByClassName('agetext')[0];
let sextext=document.getElementsByClassName('sextext')[0];
let phonetext=document.getElementsByClassName('phonetext')[0];
let integraltext=document.getElementsByClassName('integraltext')[0];
let idtext=document.getElementsByClassName('idtext')[0];
function cancel_13(){
    userrvsmax.style.display="none";
}
usernavmax.onclick=function(){
    usernav.style.display="block";
}
user.onclick=function(){
    usermax.style.display="block";
    foodmax.style.display="none";
    ordermax.style.display="none"
    Usersmax.style.display="none";
    order.style.color="#bfcbd9";
    food.style.color="#bfcbd9";
    Users.style.color="#bfcbd9";
}
function User(){
    $.ajax({
        type:'post',
        url:"http://118.195.129.130:3000/user/inquire",
        data:{
            _id:window.sessionStorage.getItem("id"),
        },
        success:function(res){
            let data=res.data[0];
            userse=data.sex;
            userus=data.us;
            userage=data.age;
            userphone=data.phone;
            ustext.innerHTML="名称:"
            agetext.innerHTML="年龄:"
            phonetext.innerHTML="电话:"
            integraltext.innerHTML="积分:"
            sextext.innerHTML="性别:"
            ustext.innerHTML+=data.us
            agetext.innerHTML+=data.age
            phonetext.innerHTML+=data.phone
            integraltext.innerHTML+=data.integral
            if(userse==1){
                sextext.innerHTML+="女"
            }else{
                sextext.innerHTML+="男"
            }
        }
    })
}
User();
let sex=document.getElementsByName('sex');
function userrevise(){
    userrvsmax.style.display="block";
    let data=document.getElementsByClassName("userrvsipt");
    if(userse==0){
        sex[0].checked=true
    }else{
        sex[1].checked=true
    }   
    data[0].value=userus;
    data[1].value=userage;
    // data[2].value=usersex;
    data[2].value=userphone;
}
function D(){
    let userrvsipt=document.getElementsByClassName("userrvsipt");
    var usersex=sex[0].checked?0:1;
    // if(usersex=="男"){
    //     var usesex=0;
    // }else{
    //     var usesex=1;
    // }
    $.ajax({
        type:"post",
        url:'http://118.195.129.130:3000/user/mod',
        data:{
            us:userrvsipt[0].value,
            age:userrvsipt[1].value,
            sex:usersex,
            phone:userrvsipt[2].value,
            _id:window.sessionStorage.getItem("id"),
        },
        success:function(res){
            console.log(res);
            cancel_13();
            User();
        }
    })
}
function userout(){
    $.ajax({
        type:"post",
        url:'http://118.195.129.130:3000/user/out',
        data:{},
        success:function(){
            window.sessionStorage.removeItem("id")
            window.location.href="../signin/index.html";
        }
    })
}