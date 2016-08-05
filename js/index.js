    $(function(){
      //获取所需元素
      var widths=document.documentElement.clientWidth;
      var heights=document.documentElement.clientHeight;
      console.log(heights);
      
      //边框动画
          var box=$(".box");
          
          for (var i = 0; i < box.length; i++) {
            line(box[i]);
          }
          var twobox=$(".twobox");
          for (var j = 0; j < twobox.length; j++) {
            line(twobox[j])
          };
           
           // line(twobox);
         function line(obj){
              
           var bh=obj.offsetHeight;
           var bw=obj.offsetWidth;
           var left=$(".left",obj)[0];
           var right=$(".right",obj)[0];
           var top=$(".top",obj)[0];
           var bottom=$(".bottom",obj)[0];

           obj.onmouseover=function(){
             animate(left,{height:bh});
             animate(right,{height:bh});
             animate(top,{width:bw});
             animate(bottom,{width:bw});
            }
           obj.onmouseout=function(){
             animate(left,{height:0});
             animate(right,{height:0});
             animate(top,{width:0});
             animate(bottom,{width:0});
           }
         }

   //banner 轮播
      var banner=$(".banner")[0];
      var mian=$(".mian")[0];
      // console.log(mian);
      var mlis=$("li",mian);
      // console.log(mlis);
      var back=$(".back");
      var bl=$(".bl",mian)[0];
      var br=$(".br",mian)[0];


      back[0].style.opacity=1;
      mlis[0].style.background="#E5004F";
      var num=0;
      var t=setInterval(moveR,3000)

      function moveR(){
        num++;
        if (num==back.length) {
          num=0;
        }
        for (var i = 0; i < back.length; i++) {
          // back[i].index=i;
          back[i].style.opacity=0;
          mlis[i].style.background="#211616";
        }
        animate(back[num],{opacity:1},200,Tween.Expo.easeIn);
         mlis[num].style.background="#E5004F";
       }
       function moveL(){
        num--;
        if (num<0) {
          num=back.length-1;
        }
        for (var i = 0; i < back.length; i++) {
          back[i].style.opacity=0;
          mlis[i].style.background="#211616";
        }
        animate(back[num],{opacity:1},200,Tween.Expo.easeIn);
        mlis[num].style.background="#E5004F";
       }
       

       //底部显像卡
       for (var i = 0; i < mlis.length; i++) {
      mlis[i].index=i;
      mlis[i].onclick=function(){
        for (var j = 0; j < mlis.length; j++) {
          mlis[j].style.background="#211616";
          back[j].style.opacity=0;
        }
        mlis[this.index].style.background="#E5004F";
        animate(back[this.index],{opacity:1},200,Tween.Circ.easeIn);
        num=this.index;
      }
     }
       //左右按钮
       bl.onclick=function(){
        moveL();
       }
       br.onclick=function(){
        moveR();
       }
       //鼠标移动时间
       banner.onmouseover=function(){
        clearInterval(t);
        br.style.opacity=0.5;
        bl.style.opacity=0.5;
       }
       banner.onmouseout=function(){
        t=setInterval(moveR,3000);
        bl.style.opacity=0;
        br.style.opacity=0;
       }

      

    //定位出现的位置
         var dw=$(".dw")[0];
          // console.log(dw);
          var spe=$(".spe")[0];
          // console.log(cz);
          var flag=true;
          var ts=$(".tu",dw);
          console.log(ts);
          var zi=$(".zi",dw);
          // console.log(zi);
          // var dflag=true;
         
         window.onscroll=function(){
          var obj=document.body.scrollTop?document.body:document.documentElement;
           var offsettop=spe.offsetTop;
           // console.log(offsettop);
           if (obj.scrollTop>=offsettop) {
                animate(dw,{opacity:1},10)
           }else if(obj.scrollTop<=offsettop){
                     animate(dw,{opacity:0},10);
                
           }
         if (!flag)  return ;
          for (var i = 0; i < zi.length; i++) {
            if (heights+obj.scrollTop>=floorArr[i]+300) {
              for (var j = 0; j < zi.length; j++) {
                zi[j].style.display="none";
              }
              zi[i].style.display="block";

            }
            
          }
         }
      //定位显像卡
       for (var i = 0; i < ts.length; i++) {
         ts[i].index=i;
         ts[i].onmouseover=function(){
          for (var j = 0; j < ts.length; j++) {
            zi[j].style.display="none";
          }
          zi[this.index].style.display="block";
         }
         ts[i].onmouseout=function(){
          zi[this.index].style.display="none";
         }

       }

       //右侧导航点击事件
      var floors=$(".floor");
      var floorArr=[];
      for (var i = 0; i < floors.length; i++) {
        var offsetTop=floors[i].offsetTop;
        floorArr.push(offsetTop);
      };
      // console.log(floorArr);
      var dw=$(".dw")[0];
      var ts=$(".tu",dw);
      // console.log(ts);
      // var flag=true;
      for (var i = 0; i < ts.length; i++) {
          ts[i].index=i;
          ts[i].onclick=function(){
              flag=false;
          var obj=document.body.scrollTop?document.body:document.documentElement;
          animate(obj,{scrollTop:floorArr[this.index]},function(){flag=true;});
          }
        }
      //返回顶部
      var dw=$(".dw")[0];
      console.log(dw);
      var fan=$(".fan",dw)[0];
      console.log(fan);
      var obj=document.body.scrollTop?document.body:document.documentElement;

      fan.onclick=function(){
       animate(obj,{scrollTop:0},200);
      }
     
     //左侧导航显像卡！
     var three=$(".three",banner)[0];
     var blis=$(".lb",three);
     // console.log(blis);
     var list=$(".list",three);
     // console.log(list);
     // list[0].style.display="block";
     for (var i = 0; i < blis.length; i++) {
       blis[i].index=i;
       blis[i].onmouseover=function(){
          list[this.index].style.display="block";
          blis[this.index].style.opation="1";
       }
  
  
       blis[i].onmouseout=function(){
       for (var j= 0; j < list.length; j++){
              list[j].style.display="none";
              blis[j].style.opation="0";

          } 
        }
     }
    //cz 显像卡
    var left=$(".left",$(".cz")[0])[0];
    var top=$(".top",left)[0];
    var one=$(".one",top);
    var jt=$(".jt",top);
    // console.log(jt);
    var bottom=$(".bottom",left)[0];
    var two=$(".two",bottom);
    one[0].style.borderBottom="3px solid #E5004F";
    jt[0].style.display="block";
    two[0].style.zIndex=1;
    for (var i = 0; i < one.length; i++) {
      one[i].index=i;
      one[i].onmouseover=function(){
        for (var j = 0; j < two.length; j++) {
          two[j].style.zIndex=0;
          one[j].style.borderBottom="3px solid #333333";
          // one[j].style.fontWeight="normal";
          jt[j].style.display="none";
        }
        jt[this.index].style.display="block";
        two[this.index].style.zIndex=1;
        this.style.borderBottom="3px solid #E5004F";
        // this.style.fontWeight="blod";
        
        this.onmouseout=function(){
          for (var k = 0; k < one.length; k++) {
            one[k].style.borderBottom="3px solid #333333";
            // one[k].style.fontWeight="normal";
            jt[k].style.display="none";
          }
          this.style.borderBottom="3px solid #E5004F";
          this.style.fontWeight="blod";
          jt[this.index].style.display="block";
          // .style.display
        }
      }
    }
    //spe显像卡
    var bottom=$(".bottom",$(".spe")[0])[0];
    // console.log(bottom);
    var right_s=$(".right_s",bottom)[0];
    var rp=$(".rp",right_s);
    var right_x=$(".right_x",bottom)[0];
    // console.log(right_x);
    var bx=$(".bx",right_x);
    var jtx=$(".jtx",right_s);
    console.log(jtx);
    // console.log(bx);
    bx[0].style.zIndex=1;
    rp[0].style.borderBottom="2px solid #E5004F";
    jtx[0].style.display="block";
    for (var i = 0; i < rp.length; i++) {
      rp[i].index=i;
      rp[i].onmouseover=function(){
        for (var j = 0; j < bx.length; j++) {
          bx[j].style.zIndex=0;
          rp[j].style.borderBottom="2px solid #333333";
          jtx[j].style.display="none";
        }
        bx[this.index].style.zIndex=1;
        this.style.borderBottom="2px solid #E5004F";
        jtx[this.index].style.display="block";
        this.onmouseout=function(){
          for (var k = 0; k < rp.length; k++) {
            rp[k].style.borderBottom="2px solid #333333";
            // p[k].style.fontWeight="normal";
            jtx[k].style.display="none";
          }
          this.style.borderBottom="2px solid #E5004F";
          // this.style.fontWeight="blod";
          jtx[this.index].style.display="block";
        }
      }
    }
    


    //floor轮播
    
      
      var good=$(".goods")[0];
          lunbo(good);
      var women=$(".women")[0];
          lunbo(women); 
      var men=$(".men")[0];
          lunbo(men);  
      var xie=$(".xie")[0];
          lunbo(xie); 
      var out=$(".out")[0];
          lunbo(out);   
      var pei=$(".pei")[0];
          lunbo(pei);
      var home=$(".home")[0];
          lunbo(home);
      function lunbo(obj){
        var three=$(".three",obj)[0];
        // console.log(three);
        var bao=$(".bao",three)[0];
        // console.log(bao);
        var widths= parseInt(getStyle(three,"width"));
        // console.log(widths);
        var btnl=$(".left",three)[0];
        // console.log(btnl);
        var btnr=$(".right",three)[0];
        // console.log(btnr);
        var lis=$("li",three);
        // console.log(lis);


        lis[0].style.background="#E5004F";

         function moveR(){
              animate(bao,{left:-widths});
              lis[0].style.background="#333333";
              lis[1].style.background="#E5004F";  
         }
         function moveL(){
            animate(bao,{left:0});
            lis[1].style.background="#333333";
            lis[0].style.background="#E5004F"; 
         }
    
        lis[0].onclick=function(){
             moveL();
        }
        lis[1].onclick=function(){
             moveR();
         }
        btnl.onclick=function(){
             moveL();
        }
        btnr.onclick=function(){
             moveR();
        }
        three.onmouseover=function(){
          btnl.style.display="block";
          btnr.style.display="block";
        }
        three.onmouseout=function(){
          btnl.style.display="none";
          btnr.style.display="none";
        }
      }


      //小轮播
      var floor=$(".floor");
     var floorsArr=[];
      for (var i = 0; i < floor.length; i++) {
        floorsArr.push(floor[i]);
      }
      for (var i = 0; i < floorsArr.length; i++) {
        xlunbo(floorsArr[i]);
      };



      function xlunbo(obj){
        var two_x=$(".two_x",obj)[0];
        var pens=$(".pen",two_x);
        var widths=parseInt(getStyle(two_x,"width"));
        var L=$(".leftx",two_x)[0];
        var R=$(".rightx",two_x)[0];
        var flog=true;


    
        for (var i = 0; i < pens.length; i++) {
          if (i==0) {
                   continue;
              }
             pens[i].style.left=widths+"px";
        }
        
        // var t=setInterval(moveR,1000)
     
         var index=0;
             var next=0;
     
             function moveR(){
           //更新next
           next++;
           if (next==pens.length) {
           next=0;
            }
            //下张图片就位
            pens[next].style.left=-widths+"px";
            //
             animate(pens[index],{left:widths});
            
            animate(pens[next],{left:0},function(){
             flog=true;
            });
            index=next;
          }
          function moveL(){
            next--;
            if (next<0) {
              next=pens.length-1;
            }
    
          pens[next].style.left=widths+"px";
           //
            animate(pens[index],{left:-widths});
           
            animate(pens[next],{left:0},function(){
              flog=true;
            });
            index=next;
         }
    
         L.onclick=function(){
          if (flog) {
            flog=false;
            moveL();
          }
          
         }
         R.onclick=function(){
          if (flog) {
            flog=false;
            moveR();
          }
         } 
      }
})