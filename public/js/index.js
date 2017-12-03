
$(function(){
    var urlInput = document.querySelector('#url-input');
    var nameInput = document.querySelector('#name-input');
    urlInput.value = 'https: //gitrepository';

    var btnCreate = document.querySelector('#btn-create');
    var btnDeploy = document.querySelector('#btn-deploy');

    var timestamp = new Date().getTime();
    nameInput.value = 'Branch-' + timestamp;
    //默认获得当前所有的分支信息
    getBranchesInfo();
    //点击“创建分支”按钮，发送请求
    btnCreate.onclick = function(){
        $.ajax({
            url:"/controller/createBranch/"+new Date().valueOf(),
            data:{username: nameInput.value},
            dataType:"json",
            type:"get",
            success:function (data) {
                console.log('crete',data)
                alert('创建分支成功😊');
                //创建成功之后，获取分支信息绘制图表
                getBranchesInfo();
            },
            error:function (err) {
                console.log(err);
            }
        });
    }
    //点击“上线申请”按钮，并没有做事件处理哦
    btnDeploy.onclick = function(){
    }
});


//发送ajax请求，获取分支信息并绘制底部图表
function getBranchesInfo(){
    $.ajax({
        url:"/controller/getBranchInfo",
        data:{},
        dataType:"json",
        type:"get",
        success:function (data) {
            console.log(data);
            var items=[
                [{v:'Master', f:'Master'}, '']
            ];
            data.forEach(function (elem,index,arr) {
                items.push([elem,'Master']);
            });
            //获取分支信息成功后，绘制图表
            drawChart(items);
        },
        error:function (err) {
            console.log(err);
        }
    });
}


// 使用Google chart API绘制图表哦
function drawChart(myData) {
    myData = myData ? myData : [];
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');

    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows(myData);
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, {allowHtml:true});
}

















