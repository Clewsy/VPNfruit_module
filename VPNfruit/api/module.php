<?php namespace pineapple;

class VPNfruit extends Module
{
	public function route()
	{
		switch ($this->request->action) {
			case 'startVPN' :
				$this->startVPN();
				break;
			case 'stopVPN' :
				$this->stopVPN();
				break;
			case 'enableVPN' :
				$this->enableVPN();
				break;
			case 'disableVPN' :
				$this->disableVPN();
				break;
			case 'savePath' :
				$this->savePath();
				break;
			case 'loadPath' :
				$this->loadPath();
				break;
			case 'getLiveStatus' :
				$this->getLiveStatus();
				break;
			case 'getBootStatus' :
				$this->getBootStatus();
				break;
			case 'getIpinfoDump' :
				$this->getIpinfoDump();
				break;
		}
	}

	private function startVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." start");
			$this->response = "VPN Started.";
		} else {
			$this->response = "Error starting VPN (file not found).";
		}
	}


	private function stopVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." stop");
			$this->response = "VPN Stopped.";
		} else {
			$this->response = "Error stopping VPN (file not found).";
		}
	}

	private function enableVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." enable");
			$this->response = "VPN Autorun Enabled.";
		} else {
			$this->response = "Error enabling VPN (file not found).";
		}
	}

	private function disableVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." disable");
			$this->response = "VPN Autorun Disabled.";
		} else {
			$this->response = "Error disabling VPN (file not found).";
		}
	}


	private function loadPath()
	{
		if (file_exists('VPNfruit.config')) {
			$this->response = file_get_contents('VPNfruit.config');
		} else {
			$this->error = "No_path_found.";
		}
	}

	private function savePath()
	{
		$returnCode = file_put_contents('VPNfruit.config', $this->request->path);
		if ($returnCode !== false) {
			$this->response = "Path saved (/etc/init.d/".$this->request->path.")";
		} else {
			$this->error = "There was an error saving the path.";
		}
	}

	private function getLiveStatus()
	{
		sleep(1);	//Delay added so clicking start/stop buttons run corresponding functions before the boot status is checked/updated.
		exec("pgrep openvpn", $openvpnpid);
		if(empty($openvpnpid)) {
			$this->response = "OpenVPN is not running.";
		} else {
			$this->response = "OpenVPN is running (PID: ".$openvpnpid[0].").";
		}
	}

	private function getBootStatus()
	{
		sleep(1);	//Delay added so clicking enable/disable buttons run corresponding functions before the boot status is checked/updated.
		$filename = file_get_contents('VPNfruit.config');
		exec("ls /etc/rc.d | grep ".$filename, $grepresult);
		if(empty($grepresult)) {
			$this->response = "Script (/etc/init.d/".$filename.") is disabled at boot.";
		} else {
			$this->response = "Script (/etc/init.d/".$filename.") is enabled at boot.";
		}
	}

	private function getIpinfoDump()
	{
		exec("curl ipinfo.io", $dump);
		if(empty($dump)) {
			$this->response = "Unable to curl ipinfo.io";
		} else {
			$this->response = $dump;
		}
	}

}
