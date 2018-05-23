# object2md
> 可以将任意的json定义文件转换为markdown文件
> 
> 支持外部自定义模板转换，使用handlebars语法

## 安装命令

```
npm install object2md -g
```

## 运行命令

*object2md -help*

```
使用方式: object2md [存放json定义的文件路径] [选项组合]

选项：
  -v, --version  显示版本号                      [字符串]
  -o, --ouput    生成的markdown文件路径           [字符串] [必需] [默认值: "md-dist"]
  -t, --type     handlebars模板文件，定义json对象转换到markdown的模板，可由外部指定（此时传入的是一个handlebars
                 模板文件路径，模板的上下文就是输入的json对象），内置widget类型模板，默认值widget
                                                [字符串] [必需] [默认值: "widget"]
  -h, --help     显示帮助信息                               

示例：
  object2md test/meta-widget-view.json
```  

## 