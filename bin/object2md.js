#! /usr/bin/env node

const jsonfile = require('jsonfile')
const yargs = require('yargs')
const fs = require('fs')
var path = require('path')
const Handlebars = require('handlebars')

var argv= yargs
    .option('v',{
        alias:'version',
        type: 'string'
    })
    .demandCommand(1, '参数缺失：必须指定存放json定义的文件路径')
    .option('o', {
        alias : 'ouput',
        demand: true,
        default:"md-dist",
        describe: '生成的markdown文件路径',
        type: 'string'
      })
    .option('t', {
        alias : 'type',
        demand: true,
        default:"widget",
        describe: 'handlebars模板文件，定义json对象转换到markdown的模板，可由外部指定（此时传入的是一个handlebars模板文件路径，模板的上下文就是输入的json对象），内置widget类型模板，默认值widget',
        type: 'string'
    })
    .usage('使用方式: object2md [存放json定义的文件路径] [选项组合]')
    .example('object2md test/meta-widget-view.json')
    .help('h')
    .alias('h', 'help')
    .argv
var inputFileOrPath=argv._[0]
var inputExists=fs.existsSync(inputFileOrPath)
if(!inputExists){
    console.dir(`文件${inputFileOrPath}不存在`)
    return
}
var outputDir=argv.o
var outputExists=fs.existsSync(outputDir)
if(!outputExists){
    fs.mkdirSync(outputDir)
}
var type=argv.t
//读取部件json配置转成md文件
function writeMd(f){
    jsonfile.readFile(f, function(err, obj) {
        if(err){
            console.dir(err)
        }
        var outputFile=path.join(outputDir,path.basename(f,path.extname(f)))
        outputFile=`${outputFile}.md`
        //读取部件的markdown模板定义文件
        var tmplPath = type==='widget'?path.join(__dirname,'/widget.handlebars'):type
        fs.readFile(tmplPath,'utf8',(err,data)=>{
            var template = Handlebars.compile(data)
            var mdcontent=template(obj)
            fs.writeFile(outputFile,mdcontent,(err)=>{
                //console.dir(__dirname)
                //console.dir(process.cwd())
                //console.dir(process.execPath)
                if(err){
                    console.dir(err)
                }
            })
        })

    })
}
fs.stat(inputFileOrPath,(err,stats)=>{
    if(stats.isDirectory()){
        fs.readdir(inputFileOrPath,(err,files)=>{
            files.forEach((value,index,files)=>{
                var filePath=path.join(inputFileOrPath,value)
                if(fs.statSync(filePath).isFile()){
                    writeMd(filePath)
                }
            })
        })
    }else{
        writeMd(inputFileOrPath)
    }
})