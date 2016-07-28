/**
 * Controller构造函数
 * 
 * @param {Model} model 作为Controller实例medel属性的值
 * @param {View} view 作为Controller实例view属性的值
 */
function Controller(model, view) {
	var self = this;
	self.model = model;
	self.view = view;

	self.view.bind('addItem', self.addItem.bind(self)); // bind()关键, 解决this对象隐式丢失
	self.view.bind('showAll', self.view.showAll);
	self.view.bind('showActive', self.view.showActive);
	self.view.bind('showCompleted', self.view.showCompleted);
	self.view.bind('clearCompleted', self.clearCompleted.bind(self));
}

/**
 * controller把view.addItem方法作为callback参数, 调用model.create方法
 * 
 * @param {String} title 新item的title属性的值
 */
Controller.prototype.addItem = function(title) {
	var self = this;
	// self.model.create(title, self.view.addItem);
	self.model.create(title, function(newTodoItem) {
		var todoItem = self.view.addItem(newTodoItem);
		// console.log(todoItem);
		self.view.bind('deleteItem', self.deleteItem.bind(self) , todoItem); // 创建节点后立即绑定删除事件

		self.view.bind('setCompleted', self.setCompleted.bind(self), todoItem); // 创建节点后立即绑定完成todo事件 
	}); 
}

/**
 * 调用model.delete方法和model.delete方法删除todo节点
 * 
 * @param {DOM-div} dom 要删除的DOM节点
 */
Controller.prototype.deleteItem = function(dom) {
	var self = this;
	var id = dom.dataset.id;
	self.model.delete(id);
	self.view.deleteItem(dom);
}

/**
 * 调用self.view.setCompleted方法和self.model.update方法设置完成todo
 * 
 * @param {DOM-div} dom 要设置完成的DOM节点
 */
Controller.prototype.setCompleted = function (dom) {
	var self = this;

	self.view.setCompleted(dom);

	var title = dom.childNodes[1].innerHTML;
	// console.log(dom.childNodes[1]);
	// console.log(title);
	var completed = dom.dataset.completed;
	var id = dom.dataset.id;
	var updatedItem = {
		'title' : title,
		'completed' : completed,
		'id' : id 
	};
	self.model.update(id,updatedItem);
}

/**
 * 打开页面时将localStorage的数据加载进页面
 * 
 */
Controller.prototype.initView = function() {
	var self = this;

	var todos = self.model.findAll(); // todo对象的数组
  
  for (var i = 0; i < todos.length; i++) {
  	var addedItem = self.view.addItem(todos[i]); 
  	self.view.bind('deleteItem', self.deleteItem.bind(self) , addedItem); // 添加节点后立即绑定删除事件
		self.view.bind('setCompleted', self.setCompleted.bind(self), addedItem); // 添加节点后立即绑定完成todo事件 
  }
}

/**
 * 通过调用self.model.clearCompleted方法和self.view.clearCompleted方法删除已完成的todo
 */
Controller.prototype.clearCompleted = function ()　{
	var self = this;
	self.model.deleteCompleted();
	self.view.deleteCompleted();
}

/**
 * 测试
 * 
 */
function test(){
	var storage = new Storage('TodoMVC-JS');
	var model = new Model(storage);
	var view = new View();
	var controller = new Controller(model, view);
	controller.initView();
}
test(); // 执行测试
