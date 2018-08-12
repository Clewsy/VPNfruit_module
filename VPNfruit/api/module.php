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
		}
	}

	private function startVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." start");
			$this->response = "VPN Started";
		} else {
			$this->response = "Error starting VPN (file not found)";
		}
	}


	private function stopVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." stop");
			$this->response = "VPN Stopped";
		} else {
			$this->response = "Error stopping VPN (file not found)";
		}
	}

	private function enableVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." enable");
			$this->response = "VPN Autorun Enabled";
		} else {
			$this->response = "Error enabling VPN (file not found)";
		}
	}

	private function disableVPN()
	{
		if (file_exists("/etc/init.d/".$this->request->path)) {
			exec("/etc/init.d/".$this->request->path." disable");
			$this->response = "VPN Autorun Disabled";
		} else {
			$this->response = "Error disabling VPN (file not found)";
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


}
