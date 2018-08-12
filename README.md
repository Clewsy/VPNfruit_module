This repository is intended to simplify usage of the wifi pineapple as a VPN gateway.  It consists of two components:
- "autovpn.sh" is a shell script that when copied to "/etc/init.d" can be used to start/stop a defined openvpn config and also enable/disable autostart of the vpn at boot.  I haven't tested it, but I believe this script should work with other openWRT implementations and possibly other distros.
- "VPNfruit" is a module that when copied to "/etc/pineapple/modules/" provides a gui front-end for controlling the script alongside the pineapples other modules.
