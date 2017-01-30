# SNMPSimulatorJS
APPLICATION NAME:       SNMPSimulatorJS<br>
DEVELOLPED BY:          MOHAMED ELMESSEIRY, m.messeiry@gmail.com<br>
APP TRACKING AND URL:   https://github.com/messeiry/SNMPSimulatorJS<br>

#ABOUT THE APPLICATION: 
the application main purpose is to simulate an SNMP Agents for Non SNMP Devices, the SNMP Agent is created by configuring the conf files in addition to a list of OID Names and values that can be set in the conf file for teh required value at a current type.

the agent can be consumed then by running SNMP walk to the Ip address and port where the agent resides. so instead of communicating directly with different technologies to devices that dont have an SNMP agent you can unify the communication method and use any NMS to monitor those devices.

the SNMP Agent Simulator Supports SNMP v2C and teh following data types for OIDs:
 ObjectIdentifier
 TimeTicks
 OctetString
 Integer
 IpAddress
 Counter32
 Unsigned32
 Opaque
 Counter64

using NodeJS is a perfect choice for simulating agents, as you can create easily user interfaces for managment in addition to non-blocking code for running multiple agents at a time.

and its free, so enjoy
