/**
 * Storage构造函数
 * 
 * @param {String} name 作为storage实例dbName属性的值
 */
function Storage(name) {
	this.dbName = name;

	if(!localStorage[name]) {
		var data = {
			'todos':[]
		};

		localStorage[name] = JSON.stringify(data);
	}

}

/**
 * 添加一条todo到storage
 * 
 * @param {Object} newTodoItem 具有id属性的todo对象
 */
Storage.prototype.add = function (newTodoItem) {
	var data = JSON.parse(localStorage[this.dbName]);
	var todos = data.todos;
	todos.push(newTodoItem);

	localStorage[this.dbName] = JSON.stringify(data);
} // 该方法已测试没问题

/**
 * 通过id删除storage中某条todo
 * 
 * @param {String} id 要删除的todo的id值
 */
Storage.prototype.delete = function (id) {
	var data = JSON.parse(localStorage[this.dbName]);
	var todos = data.todos;
	for (var i = 0; i < todos.length; i++) {
		if(todos[i].id == id) {
			todos.splice(i,1);
			localStorage[this.dbName] = JSON.stringify(data);
			return;
		}
	}

} // 该方法已测试没问题

/**
 * 通过id将storage中某条todo更新为updatedTodo
 * 
 * @param {String} id 要更新的todo的id值
 * @param {Object} updatedTodo 
 */
Storage.prototype.update = function (id, updatedTodo) {
	var data = JSON.parse(localStorage[this.dbName]);
	var todos = data.todos;
	for (var i = 0; i < todos.length; i++) {
		if (todos[i].id == id) {
			todos[i] = updatedTodo;
		}
	}

	localStorage[this.dbName] = JSON.stringify(data);
} // 该方法已测试没问题

/**
 * 查找storage中所有todo数据
 * 
 * @return {Array} todo对象数组
 */
Storage.prototype.findAll = function () {
	var data = JSON.parse(localStorage[this.dbName]);
	var todos = data.todos;
	return todos;
} 

/**
 * 删除storage中已完成的todo
 */
Storage.prototype.deleteCompleted = function () {
	var data = JSON.parse(localStorage[this.dbName]);
	var todos = data.todos;
  var newTodos = [];
	for (var i = 0; i < todos.length; i++) {
		// console.log(todos[i].completed); // Boolean值
		if (todos[i].completed === 'false') {
				newTodos.push(todos[i]);
		}
	}
	var newData = {
		'todos':newTodos
	}
	localStorage[this.dbName] = JSON.stringify(newData);
}
