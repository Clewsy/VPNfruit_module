#!/bin/bash /etc/rc.common
############
#on openwrt (pineapple) use opkg for package management
#opkg update
#opkg install openvpn-openssl
##################
#guide to autostarting script with openwrt
#https://stackoverflow.com/questions/33340659/how-to-auto-start-an-application-in-openwrt
#put this script in the /etc/inid.d/ directory
#/etc/init.d/b4t_autovpn.sh enable	<-enables autostart
#/etc/init.d/b4t_autovpn.sh disable	<-disables autostart
#/etc/init.d/b4t_autovpn.sh start	<-start script
#/etc/init.d/b4t_autovpn.sh stop	<-stops script
############

START=99


#Codes for text colours
RED="\033[31m"
GREEN="\033[32m"
RESET="\033[0m"

#define the .ovpn configuration file to be used
OVPN_CONFIG="/root/openvpn_configs/b4t.ovpn"

start(){

	if [ ! "$(which openvpn)" ]; then	#if openvpn isn't installed, say so then quit
		echo
		echo -e "${RED}Error: openvpn not installed.  Quitting.${RESET}"
		echo
		exit -1
	fi

	if ! grep -iq daemon "$OVPN_CONFIG" ; then	#if the config file doesn't include the "daemon" command
		echo "daemon" >> "$OVPN_CONFIG"		#then add it in.
	fi

	if openvpn --config "$OVPN_CONFIG"; then
		echo
		echo -e "${GREEN}openvpn connection initiated as daemon.${RESET}"
		echo
	else
		echo
		echo -e "${RED}Failed to initiate openvpn connection.${RESET}"
		echo
		exit -1
	fi

	echo
	echo "Establishing iptables rules so pineapple connected client traffic uses the vpn."
	##now set up iptables rules so traffic from clients connected to the p1neapple wifi run through tun0
	#first rule:	-t nat	updates nat table (-t)
	#		-A POSTROUTING	appends POSTROUTING chain to apply to packets just before they're sent out
	#		-s 172.16.42.0/21	source ip (-s) to appy to packets that came from the pineapple gateway
	#		-o tun0 output interface (-o) tun0 to apply to packets intended to be sent out through the tunnel
	#		-j MASQUERADE   j for jump defines what to do to these packets. MASQUERADE changes the source of
	#			the packets so that it seems thay came from the client device instead of the pineapple
	iptables -t nat -A POSTROUTING -s 172.16.42.0/24 -o tun0 -j MASQUERADE
	#second rule:	-A FORWARD	appends to FORWARD chain to apply to packets being forwarded by the pineapple
	#		-s 172.16.42.0/21	source ip (-s) to appy to packets that came from the pineapple gateway
	#		-o tun0	output interface (-o) tun0 to apply to packets intended to be sent out through the tunnel
	#			-j ACCEPT	j for jump defines what to to with these specific packets - accept them
	iptables -A FORWARD -s 172.16.42.0/24 -o tun0 -j ACCEPT
	#third rule:	-A FORWARD	appends to FORWARD chain to apply to packets being forwarded by the pineapple
	#		-d 172.16.42.0/24	destination ip (-d) to appy to packets going to the pineapple gateway
	#		-m state	to apply to packets with a (m)atch of a specified propert (state)
	#		--state ESTABLISHED,RELATED	the accepted state matches
	#			ESTABLISHED meaning that the packet is associated with a connection which has seen 
	#				packets in both directions
	#			RELATED meaning that the packet is starting a new connection, but is associated with
	#				an existing connection, such as an FTP data transfer, or an ICMP error
	#		-j ACCEPT	j for jump defines what to to with these specific packets - accept them
	iptables -A FORWARD -d 172.16.42.0/24 -m state --state ESTABLISHED,RELATED -i tun0 -j ACCEPT
	echo
	echo -e "${GREEN}Success.${RESET}"
	echo
}

stop(){
	echo "Killing openvpn"
	pkill openvpn
}
