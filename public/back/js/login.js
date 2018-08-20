$(function () {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  // 配置的字段和 input 框中指定的 name 关联, 所以必须要给 input 加上 name

  //使用表单校验插件
  $("#form").bootstrapValidator({
    // 配置效验图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 效验成功
      invalid: 'glyphicon glyphicon-remove', // 效验失败
      validating: 'glyphicon glyphicon-refresh' // 效验中
    },

    // 配置字段
    fields: {
      //校验用户名，对应name表单的name属性
      username: {
        // 配置效验规则
        validators: {
          //不能为空
          notEmpty: {
            message: '用户名不能为空'
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2到6之间'
          },
          // 专门用于配置回调函数提示的规则
          callback:{
            message:"用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是 6-12 位"
          },
          // 专门用于配置回调提示的规则
          callback: {
            message: "用户名不存在"
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: "密码不能为空"
          },
          stringLength: {
            min: 6,
            max: 12,
            message: "密码长度必须是6-12位"
          },
          callback: {
            message: "密码错误"
          }
        }
      }
    }
  });

  // 2.登录功能
  // 表单效验插件会在提交表单时进行效验
  // (1) 效验成功，默认就是提交表单，会发生页面挑战
  //   我们需要注册表单效验成功事件，阻止默认的提交，通过ajax进行发送请求
  // （2）效验失败，不会提交表单，配置插件提示用户即可

  // 注册表单效验成功事件
  $('#form').on("success.form.bv",function(e){
    // 阻止默认的表单提交
    e.preventDefault();
    // console.log("效验成功后的 表单提交 被阻止了");
    // 通过ajax进行提交
    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          // 登录成功，跳转到首页
          location.href="index.html";
        }
        if(info.error===1000){
          // alert("当前用户名不存在")；
          // updateStatus 更新效验状态
          // 1.字段名称
          // 2.效验状态  VALID INVALIN NOT_VALIDATED未校验的，VALDATING校验中 
          // 3.效验规则，用于指定提示文本
          $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
        }
        if(info.error===1001){
          // alert("密码错误")
          $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
        } 
      }
    })
  });

  // 3.重置功能
  $('[type="reset"]').click(function(){
    // 调用插件的方法，进行重置效验状态
    // resetForm(boolean),
    // 1. 传true 重置内容以及效验状态
    // 2. 传false 只重置效验状态
    $('#form').data("bootstrapValidator").resetForm();
  });
});