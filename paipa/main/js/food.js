var number=1;
function chagePage(){
    $.ajax({
        type:'post',
        url:'http://118.195.129.130:3000/food/getInfoByPage',
        data:{
            page:number,
            per_page:5,
        },
        success:function(res){
            ul1.innerHTML="";
            let data=res.data;
            console.log(res);
            for(let i =0;i<data.length;i++){
                ul1.innerHTML+="<tr> <td>"+data[i].name+"</td><td>"
                    +data[i].price+"</td><td>"
                    +data[i].desc+"</td><td>"
                    +data[i].typename+"</td><td>"
                    +data[i].typeid
                    +"</td><td><button onclick='revise(this);' style='color:blue;'>修改</button> <button onclick='delRow(this);' style='color:red;'>删除</button><span style='display: none;'>"+data[i]._id+"</span></td></tr>"
                
           }
        },
        error:function(err){
            console.log(err);
        }
    })
}
chagePage()
let totalfood=document.getElementById("total-food");
function foodtotal(){
    $.ajax({
        type:'get',
        url:"http://118.195.129.130:3000/food/allpage",
        data:{
            Null:null,
        },
        success:function(res){
            a=res.pages/5;
            b=Math.ceil(a);
            totalfood.innerHTML="共"+res.pages+"个菜品,"+b+"页"
            chagePage();
        }
    })
}
foodtotal();
let upfood=document.getElementById("up-food");
let nextfood=document.getElementById("next-food");
let foodnum=document.getElementById('foodnum');
upfood.onclick=function(){
    if(number>1){
        number--;
        foodnum.innerHTML=number;
        chagePage();
    }
}
nextfood.onclick=function(){
    if(number<a){
        number++;
        foodnum.innerHTML=number;
        chagePage();
    }
}
let firstfood=document.getElementById("first-food");
let lastfood=document.getElementById("last-food");
firstfood.onclick=function(){
    number=1;
    chagePage();
}
lastfood.onclick=function(){
    number=b;
    chagePage();
}
