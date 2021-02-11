import os
# import subprocess
# import sys

def runCommand(command):	
	try:
		output = os.popen(command).read().expandtabs(4).split('\n')
	except:
		output = "wrong or incomplete command"
	return output
