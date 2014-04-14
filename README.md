bee-min
========
压缩脚本，CSS，图片
对CSS进行DataURI


```xml
<?xml version='1.0' encoding='utf-8'?>
<project name='using bee-min to build a project example'  basedir='.'>
  <description>min</description>
  <deskdef npm='bee-min'/>
  <target name="build">
    <min src='my.js' dest='my.min.js'/>
    <min file='reset.css' destfile='reset.min.css'/>
    <datauri file='reset.min.css' destfile='reset.datauri.css'/>
  </target>
</project>
```