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
      }

    },
  }
});






})