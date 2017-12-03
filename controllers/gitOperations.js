
const shell = require('shelljs');
const successMessage={
    success:true,
    message:"成功！"
};
const failMessage={
    success:false,
    message:"失败！"
};

exports.createBranch=function (req, res) {
    shell.exec("git branch "+req.params.name);
    console.log(shell.exec("git checkout "+req.params.name).code);
    console.log(shell.exec("git push origin "+req.params.name).code);
    res.json(successMessage);
};
exports.getBranchInfo=function (req, res) {
    var aa=shell.exec("git branch -a");
    var aas=aa['stdout'].split('\n  ');
    var aasitem=[];
    console.log(aas);
    aas.forEach(function (element, index, array) {
        if(element.indexOf('remotes/origin/')===0&&element.indexOf('HEAD')!==15){
            aasitem.push(element.slice(15).trim());
        }
    })
    res.json(aasitem);
};