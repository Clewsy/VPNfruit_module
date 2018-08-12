 registerController('VPNfruit_controller', ['$api', '$scope', function($api, $scope){
	$scope.inputPath = "";
	$scope.message = "";

	$scope.startVPN = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'startVPN',
			path: $scope.inputPath
		}, function(response) {
			if (response.error === undefined) {
				$scope.message = response;
			} else {
				$scope.message = response.error;
			}
		});

	});

	$scope.stopVPN = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'stopVPN',
			path: $scope.inputPath
		}, function(response) {
			if (response.error === undefined) {
				$scope.message = response;
			} else {
				$scope.message = response.error;
			}
		});

	});

	$scope.enableVPN = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'enableVPN',
			path: $scope.inputPath
		}, function(response) {
			if (response.error === undefined) {
				$scope.message = response;
			} else {
				$scope.message = response.error;
			}
		});

	});

	$scope.disableVPN = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'disableVPN',
			path: $scope.inputPath
		}, function(response) {
			if (response.error === undefined) {
				$scope.message = response;
			} else {
				$scope.message = response.error;
			}
		});

	});

	$scope.loadPath = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'loadPath',
		}, function(response) {
			if (response.error === undefined) {
				$scope.inputPath = response;
			} else {
				$scope.inputPath = "no_path_saved";
				$scope.message = response.error;
			}
		});

	});

	$scope.savePath = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'savePath',
			path: $scope.inputPath
		}, function(response) {
			if (response.error === undefined) {
				$scope.message = response;
			} else {
				$scope.message = response.error;
			}
		});

	});

	$scope.loadPath();

}]);
