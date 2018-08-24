$(function(){
//   校验规则：
// 1. 用户名不能为空
// 2. 用户密码不能为空,长度为2-6位
// 3. 用户密码  长度为6-12位
$('#form').bootstrapValidator({
  //设置小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',  // 效验成功的字体图标
    invalid: 'glyphicon glyphicon-remove',  // 效验失败的字体图标
    validating: 'glyphicon glyphicon-refresh' // 效验中的状态
  },

  // 配置字段
  fields:{
    username:{
      // 配置效验规则
      validators:{
        // 非空
        notEmpty:{
          // 提示信息
          message:"用户名不能为空"
        },
        // 长度效验
        stringLength:{
          min:2,
          max:6,
          message:"用户名长度必须在2-6位"
        },
        callback:{
          message:"用户名不存在"
        }
      }

    },
    password:{
      // 配置字段
      validators:{
        // 非空
        notEmpty:{
          // 提示信息
          message:"密码不能为空"
        },
        // 长度效验
        stringLength:{
          min:6,
          max:12,
          message:"密码长度必须在6-12位"
        },
        callback:{
          message:"密码错误"
        }
      }

    },
  }
});

// 2.登录功能
// 表单效验插件会在提交表单时进行效验
// （1）效验成功，默认就提交表单，会发生页面跳转，我们需要注册表单效验成功事件，阻止默认的提交，通过ajax进行发送请求
// （2）效验失败，不会提交表单，配置插件提示用户即可
// 注册表单效验成功事件
$('#form').on("success.form.bv",function(e){
  // 阻止表单效验成功，默认的提交事件
  e.preventDefault();
  // console.log("效验成功后 表单提交 被阻止了");
  // 使用ajax进行提交
  $.ajax({
    type:"post", // 请求方式
    url:"/employee/employeeLogin", // 请求地址
    data:$('#form').serialize(),   // 传参 username和password  ===>formData
    dataType:"json", // 数据类型
    success:function(info){
      console.log(info);  // 打印是否登录成功
      if(info.success){
        // 登录成功，跳转到首页
        location.href="index.html";
      }
      if(info.error===1000){
      //  alert("当前用户名不存在"); 
      // updateStatus 更新效验状态
      // 1:效验字段名称
      // 2.效验状态 VALID效验成功 INVALID效验失败 NOT_VALIDATED未校验的   VALIDATING校验中
      $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");



      }
      if(info.error===1001){
        // alert("密码错误");
        $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
      }


    }
  });


});

// 3.重置功能
$('[type="reset"]').click(function(){
  // 调用插件的方法，进行重置效验状态
  // resetForm(boolean),
  // 1.传true,重置内容以及效验状态
  // 2.传false,只重置效验状态 ，默认是false
  $('#form').data("bootstrapValidator").resetForm();

});





})