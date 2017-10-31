$(function () {
	var WINDOW_WIDTH = $(document).width()
	var WINDOW_HEIGHT = $(document).height()

	var tree = {} //创建树形结构对象
	tree.data = null; //树结构数据初始化
	tree.ajax = function () { //ajax 请求数据，并进行过滤初始化tree
    $.ajax({
      url: 'static/tree_data.json',
      dataType: "json",
      success(content) {
          resData = content;
          let bufferData = {}; // 缓存数据
          let node = null;
          let parentNode = null;
          for (let i = 0; i < content.length; i++) {
              node = content[i];
              parentNode = bufferData[node.parentId];
              if (parentNode == undefined) { // 如果在树结构数据中不存在父节点则创建一个
                  parentNode = bufferData[node.parentId] = {
                      children: []
                  };
              }
              if (node.leaf == false) {
                  if (bufferData[node.id] == undefined) {
                      node.children = [];
                  } else
                      node.children = bufferData[node.id].children;
                  bufferData[node.id] = node;
              }
              parentNode.children.push(node);
          }
          tree.data = resData[0]
          tree.init(tree.data)  //初始化树形结构

        }
    });
	}
	tree.init = function (data) {  //初始化树形结构
		$('#layer-ctrl').on('click', function() {
			$('.container-wrapper').height(WINDOW_HEIGHT - 32)
			$('.tree-wrapper').height(WINDOW_HEIGHT - 32)
			$('.tree-wrapper').show()
			$('.treegrid-wrapper').hide()

			$('#tree').tree({ 
			    data: [data],
			    checkbox: true,
			    onDblClick(row) {
			    	console.log(row)
			    }
			});

		})
		$('.tree-wrapper .fa-close').on('click', function() {
			$('.tree-wrapper').hide()
		})
	}


	var treegrid = {} //创建简单表对象
	treegrid.data = null; //简单表数据初始化
	treegrid.init = function (data) { //初始化简单表
		$('#ways').on('click', function() {
			var _width = WINDOW_WIDTH/5
			$('.treegrid-wrapper').show()
			$('.tree-wrapper').hide()

			$('#treegrid').treegrid({
			    url: 'static/treegrid_data.json', 
			    method: 'get', 
			    idField:'id',
			    treeField:'text',
			    width: WINDOW_WIDTH,
			    height: WINDOW_HEIGHT -30 -20,
			    columns:[[
					{title:'脚本名称',field:'text',width:_width},
					{title:'脚本描述',field:'dec',width:_width},
					{title:'时长（h）',field:'time',width:_width},
					{title:'制作人',field:'person',width:_width -8},
					{title:'日期',field:'dateStr',width:_width}
			    ]],
			    onDblClickRow(row) {
			    	console.log(row)
			    }
			});
		})
		
		$('.treegrid-wrapper .fa-close').on('click', function() {
			$('.treegrid-wrapper').hide()
		})


	}



	




	tree.ajax()
	treegrid.init()
	

})