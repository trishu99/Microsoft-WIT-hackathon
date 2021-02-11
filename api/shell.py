import subprocess
import shlex
def runCommand(command):
	ret = []
	try:
		args = shlex.split(command)
		print(args)
		process = subprocess.Popen(args, 
				                   stdout=subprocess.PIPE,
				                   universal_newlines=True)

		while True:
			output = process.stdout.readline()
			ret.append(output.strip())
			return_code = process.poll()
			if return_code is not None:
				print('return val ', return_code)
				for output in process.stdout.readlines():
				    ret.append(output.strip())
				break
		print(ret)
	except:
		ret.append('wrong or incomplete cmd')
	return ret;


'''
import os
# from subprocess import call
# import sys

def runCommand(command):	
	try:
		output = os.popen(command).read().expandtabs(4).split('\n')
	except:
		output = "wrong or incomplete command"
	print(output)
	return output
'''
