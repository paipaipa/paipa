let signin = document.getElementById("signin");
let logon = document.getElementById("logon");
let center = document.getElementsByClassName("center")[0];
let zhuce_center = document.getElementsByClassName("zhuce-center")[0];

logon.onclick = function () {
    center.style.display = "none";
    zhuce_center.style.display = "block";
}
signin.onclick = function () {
    zhuce_center.style.display = "none";
    center.style.display = "block";
}
let landInput =document.getElementsByClassName('landInput');
function land(){
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/user/login",
        data:{
            us:landInput[0].value,
            ps:landInput[1].value,
        },
        success:function(res){
            if(res.err==0){
                window.sessionStorage.setItem("id",res.data[0]._id)
                window.location.href="../main/index.html";
            }else if(landInput[1].value==''&landInput[0].value==''){
                alert("账号和密码不能为空")
            }else if(landInput[0].value==''){
                alert("账号不能为空")
            }else if(landInput[1].value==''){
                alert("密码不能为空")
            }else{
                alert("账号或密码错误")
            }
        }
    });
}
let registerInput =document.getElementsByClassName('registerInput');
function register(){
    $.ajax({
        type:"post",
        url:"http://118.195.129.130:3000/user/reg",
        data:{
            us:registerInput[0].value,
            ps:registerInput[1].value,
            mail:registerInput[2].value,
            code:registerInput[3].value,
        },
         success:function(res){
             console.log(res);
             if(res.err==0){
                alert("注册成功")
                }else{
                    alert("验证码错误")
                }
        }
    });
}
let time=59;
let sentbtn=document.getElementById('sentbtn');
function sent(){
    var email=registerInput[2].value;
    var reg =/^\w+@[a-z0-9]+\.[a-z]+$/i;
    if(reg.test(email)==true){
            sentbtn.disabled = true; 
            sentbtn.innerHTML=60;       
                var timer = setInterval(function(){
                if(time==0){
                    clearInterval(timer);
                    sentbtn.disabled = false;
                    sentbtn.innerHTML = '发送';
                    time = 59;
                    }else{
                        sentbtn.innerHTML=time;
                        time--;
                    }
                },1000);
    }else{
        alert("邮箱格式不正确");
    }
}