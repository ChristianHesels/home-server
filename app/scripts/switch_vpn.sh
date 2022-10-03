#!/bin/bash

nordvpn c $1
if [[ $? -eq 127 ]]
then
    exit 127
else
    sudo iptables -P INPUT ACCEPT
    sudo iptables -P OUTPUT ACCEPT
    sudo iptables -t nat -A POSTROUTING -o nordlynx -j MASQUERADE
    sudo iptables -A FORWARD -i nordlynx -o wlan0 -m state --state RELATED, ESTABLISHED -j ACCEPT
    sudo iptables -A FORWARD -i wlan0 -o nordlynx -j ACCEPT
fi