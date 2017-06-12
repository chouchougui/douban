//1.新建模块
	var yike = angular.module("yike",["Controllers","ngRoute"]);
	//2.模块创建后立刻在根作用域上绑定toggle方法
	//run方法的作用是模块一旦创建成功立刻执行
	yike.run(['$rootScope',function($rootScope){
		$rootScope.collapsed = false;
		/*
		toggle方法主要做的事情：
			1.将collapsed值取反
			2.将导航栏的具体内容进行移动
		 */
		$rootScope.toggle=function(){
			console.log('根作用域中的toggle方法');
			//1.
			$rootScope.collapsed = !$rootScope.collapsed;
			//2.找到所有dd节点 并改变tranform的值
			var dd = document.querySelectorAll('.navs dl dd');
			if ($rootScope.collapsed) {
				// console.log('a');
				// console.log(dd.length);
				for (var i = 0; i <dd.length ; i++) {
					// console.log(i);
					dd[i].style.transform = 'translate(0)';
					//不同的过渡效果
					dd[i].style.transitionDuration = (i+1)*0.1+"s";
					dd[i].style.transitionDelay = (i+1)*0.05+"s";
				};
			}else{
				for (var i = 0; i <dd.length ; i++) {
					// console.log(i);
					dd[i].style.transform = 'translate(-100%)';
					//不同的过渡效果
					dd[i].style.transitionDuration = (dd.length-i)*0.1+"s";
				}
			};
		}
	}]);

//为了解决AngularJS自动升级导致版本不一致，导致路由点击时内容经过转换
	yike.config(function($locationProvider){
		$locationProvider.hashPrefix("");
	})
//配置路由
	yike.config(["$routeProvider",function($routeProvider){
		$routeProvider.when("/today",{
			// template:""
			templateUrl:"./views/today.html",
			controller:"todayCont"
		})
		.when("/older",{
			// template:"haha"
			templateUrl:"./views/older.html",
			controller:"olderCont"
		})
		.otherwise({
			redirectTo:"/today"
		})
	}])


