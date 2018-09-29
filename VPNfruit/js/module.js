 registerController('VPNfruit_controller', ['$api', '$scope', function($api, $scope){
	$scope.inputPath = "reading";
	$scope.message = "";
	$scope.liveStatus = "checking";
	$scope.bootStatus = "checking";
	$scope.ipinfoDump_0 = "Refresh required"
	$scope.ipinfoDump_1 = ""
	$scope.ipinfoDump_2 = ""
	$scope.ipinfoDump_3 = ""
	$scope.ipinfoDump_4 = ""
	$scope.ipinfoDump_5 = ""
	$scope.ipinfoDump_6 = ""
	$scope.ipinfoDump_7 = ""
	$scope.ipinfoDump_8 = ""
	$scope.ipinfoDump_9 = ""

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
			action: 'loadPath'
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

	$scope.getLiveStatus = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'getLiveStatus'
		}, function(response) {
			if (response.error === undefined) {
				$scope.liveStatus = response;
			} else {
				$scope.liveStatus = "status_unknown";
				$scope.message = response.error;
			}
		});
	});

	$scope.getBootStatus = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'getBootStatus',
			path: $scope.inputPath
		}, function(response) {
			if (response.error === undefined) {
				$scope.bootStatus = response;
			} else {
				$scope.bootStatus = "status_unknown";
				$scope.message = response.error;
			}
		});
	});

	$scope.getIpinfoDump = (function() {
		$api.request({
			module: 'VPNfruit',
			action: 'getIpinfoDump',
		}, function(response) {
			if (response.error === undefined) {
				$scope.ipinfoDump_0 = response[0];
				$scope.ipinfoDump_1 = response[1];
				$scope.ipinfoDump_2 = response[2];
				$scope.ipinfoDump_3 = response[3];
				$scope.ipinfoDump_4 = response[4];
				$scope.ipinfoDump_5 = response[5];
				$scope.ipinfoDump_6 = response[6];
				$scope.ipinfoDump_7 = response[7];
				$scope.ipinfoDump_8 = response[8];
				$scope.ipinfoDump_9 = response[9];
			} else {
				$scope.ipinfoDump = "error";
				$scope.message = response.error;
			}
		});
	});


	$scope.loadPath();
	$scope.getLiveStatus();
	$scope.getBootStatus();

}]);
