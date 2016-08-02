/**
 * Storage构造函数
 * 
 * @param {String} name 作为storage实例dbName属性的值
 */
function Storage() {
	this.userName = location.hash.substr(1);
	if (location.hash.substr(1) === '') {
		this.userName = 'anybody';
	}
	console.log('userName : ' + this.userName);
  // location.hash = '';
}

/**
 * 添加一条todo到storage
 * 
 * @param {Object} newTodoItem 具有id属性的todo对象
 */
Storage.prototype.add = function (newTodoItem) {
	// var data = JSON.parse(localStorage[this.dbName]);
	// if (data[this.userName] === undefined) {
	// 	data[this.userName] = [];
	// }
	// var todos = data[this.userName];
	// todos.push(newTodoItem);

	// localStorage[this.dbName] = JSON.stringify(data);
} // 该方法已测试没问题

/**
 * 通过id删除storage中某条todo
 * 
 * @param {String} id 要删除的todo的id值
 */
Storage.prototype.delete = function (id) {
	// var data = JSON.parse(localStorage[this.dbName]);
	// var todos = data[this.userName];
	// for (var i = 0; i < todos.length; i++) {
	// 	if(todos[i].id == id) {
	// 		todos.splice(i,1);
	// 		localStorage[this.dbName] = JSON.stringify(data);
	// 		return;
	// 	}
	// }

} // 该方法已测试没问题

/**
 * 通过id将storage中某条todo更新为updatedTodo
 * 
 * @param {String} id 要更新的todo的id值
 * @param {Object} updatedTodo 
 */
Storage.prototype.update = function (id, updatedTodo) {
	// var data = JSON.parse(localStorage[this.dbName]);
	// var todos = data[this.userName];
	// for (var i = 0; i < todos.length; i++) {
	// 	if (todos[i].id == id) {
	// 		todos[i] = updatedTodo;
	// 	}
	// }

	// localStorage[this.dbName] = JSON.stringify(data);
} // 该方法已测试没问题

/**
 * 查找storage中所有todo数据
 * 
 * @return {Array} todo对象数组
 */
// Storage.prototype.findAll = function () {
// 	var data = JSON.parse(localStorage[this.dbName]);
// 	if (data[this.userName] === undefined) {
// 		data[this.userName] = [];
// 	}
// 	var todos = data[this.userName];
// 	console.log(todos);
// 	return todos;
// } 

/**
 * 删除storage中已完成的todo
 */
Storage.prototype.deleteCompleted = function () {
	// var data = JSON.parse(localStorage[this.dbName]);
	
	// var todos = data[this.userName];
 //  var newTodos = [];
	// for (var i = 0; i < todos.length; i++) {
	// 	// console.log(todos[i].completed); // Boolean值
	// 	if (todos[i].completed === 'false') {
	// 			newTodos.push(todos[i]);
	// 	}
	// }
	// var newData = {};
	// newData[this.userName] = newTodos;
	// localStorage[this.dbName] = JSON.stringify(newData);
}

/**
 * [getJsonData description]
 * @param {String} jsonName url
 * @return {Object} data 
 */
Storage.prototype.getJsonData = function (jsonName) {
  var client = new XMLHttpRequest();
  var data = null;
  client.open('get',jsonName,false);
  client.send(null);
  if(client.readyState == 4) {
    if(client.status >= 200 && client.status <= 304) {
      var dataRes = client.responseText;
      data = JSON.parse(dataRes);
    }else {
      console.log(client.status);
    }
  }

  return data;
}

/**
 * @override 重写findAll方法
 * 
 * @return {[type]} [description]
 */
Storage.prototype.findAll = function () {
	var self = this;
	var data = self.getJsonData('src/data/jsonData.json');
	// console.log(data[this.userName]);
	if (data[this.userName] === undefined) {
		data[this.userName] = [];
	}
	var todos = data[this.userName];
	return todos;
}
