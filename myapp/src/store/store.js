const STORAGE_KEY = 'todos-vuejs';

module.exports = {
	fetch: function () {
		return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
	},
	save: function (todos) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
	}
};