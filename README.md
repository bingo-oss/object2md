## 安装命令

```
npm install object2md -g
```

## 运行命令

*object2md -help*

```
使用方式: object2md [存放json定义的文件路径] [选项组合]

选项：
  -v, --version  显示版本号                                             [字符串]
  -o, --ouput    生成的markdown文件路径      [字符串] [必需] [默认值: "md-dist"]
  -t, --type     handlebars模板文件，定义json对象转换到markdown的模板，可由外部指定，内置page和widget类型，默认
                 widget                       [字符串] [必需] [默认值: "widget"]
  -h, --help     显示帮助信息                                             [布尔]

示例：
  object2md test/meta-widget-view.json
```  