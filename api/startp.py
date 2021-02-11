import subprocess
import shlex
import psutil
import signal
import os

def startprocess(cmd):
	try:
		p = subprocess.run(cmd, stdout=False, stderr=False, shell=True, check=True)
		if p.returncode != 0:
			return cmd + ' : wrong command to run program or no such program exist'
		else:
			return cmd + ' : program started running'
	except Exception as e:
		return cmd + ' : wrong cmd to run program or no such program exist  ' + format(e)
'''	command_line = input()
	args = shlex.split(command_line)
	print(args)
	process = subprocess.Popen(args, 
		                       stdout=subprocess.PIPE,
		                       universal_newlines=True)

	while True:
		output = process.stdout.readline()
		ret = []
		print('came here')
		ret.append(output.strip())
		# Do something else
		
		return_code = process.poll()
		if return_code is not None:
		    print('RETURN CODE', return_code)
		    # Process has finished, read rest of the output 
		    for output in process.stdout.readlines():
		        ret.append(output.strip())
		    break

	print(ret)
	return ret
'''

def startprocessaftermins(mins, cmd):
	try:
		print(cmd)
		fcmd = '''bash -c 'sleep ''' + mins + ' ; '  + cmd + '\' &'
		print(fcmd)
		p = subprocess.run(fcmd, stdout=False, stderr=False, shell=True, check=True)
		if p.returncode != 0:
			return cmd + ' : wrong command to run program or no such program exist'
		else:
			return cmd  + ' : program started running after ' + mins
	except Exception as e:
		return cmd + ' : wrong cmd to run program or no such program exist  ' + format(e)

def startprocessattime(val, cmd):
	try:
		current_epoch= os.popen("bash -c 'date +%s'").read().strip()
		val1 = '"' + val + '"'
		target_epoch= os.popen("bash -c 'date -d {} +%s'".format(val1)).read().strip()
		sleep_seconds=int(target_epoch) - int(current_epoch)
		fcmd = '''bash -c 'sleep ''' + str(sleep_seconds) + ' ; '  + cmd + '\' &'
		p = subprocess.run(fcmd, stdout=False, stderr=False, shell=True, check=True)
		if p.returncode != 0:
			return cmd + ' : wrong command to run program or no such program exist'
		else:
			return cmd  + ' : program started running at ' + val + ' ie after ' + str(sleep_seconds) + ' sec '
	except Exception as e:
		return cmd + ' : wrong cmd to run program or no such program exist  ' + format(e)
	

def terminateprocess(processname, prid):
	print('came here')
	if len(prid) == 0:
		for proc in psutil.process_iter(attrs=['pid', 'name']):
			if processname in proc.info['name']:
				proc.kill()
				return 'terminated process ' + processname + ' having pid ' + str(proc.info['pid'])
		return 'no such process found with name ' + processname
	else:
		print(prid + ' ' + str(type(prid)))
		print(int(prid))
		for proc in psutil.process_iter(attrs=['pid', 'name']):
			if int(prid) == proc.info['pid']:
				proc.kill()
				return 'terminated process ' + proc.info['name'] + ' having pid ' + prid
		return 'no such process found with pid ' + prid

def sendsignal(processname, prid,  signalname):
	if len(prid) == 0:
		for proc in psutil.process_iter(attrs=['pid', 'name']):
			if processname in proc.info['name']:
				proc.send_signal(signal.Signals[signalname.upper()].value);
				print('terminated')
				return 'signal ' + signalname + ' is send to process ' + processname;

		return 'no such process found with name ' + processname
	else:
		for proc in psutil.process_iter(attrs=['pid', 'name']):
			if int(prid) == proc.info['pid']:
				proc.send_signal(signal.Signals[signalname.upper()].value);
				print('terminated')
				return 'signal ' + signalname + ' is send to process with pid ' + prid;

		return 'no such process found with pid ' + prid


def checkprocess(processName):
	for proc in psutil.process_iter(attrs=['pid', 'name']):
		try:
			if processName.lower() in proc.name().lower():
				return processName + ' is running on pid ' + str(proc.info['pid'])
		except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess) as err:
			pass
	return processName + ' is not running or user does not have access';

#o = terminateprocess('', '7068');
#print(o);

def shutdownnow():
	ret = 'system will shudown now'
	os.system('''bash -c 'sleep 5 ; shutdown -h now' &''')
	return ret

def shutdownaftermin(mins):
	ret = 'system will be shutdown after ' + mins + ' you can cancel shutdown by pressing cancel shutdown button'
	cmd = "shutdown " + '+' + mins
	print(cmd)
	os.system(cmd)
	return ret

def shutdownattime(gtime):
	ret = 'system will be shutdown at ' + gtime + ' you can cancel shutdown by pressing cancel shutdown button'
	cmd = "shutdown " + gtime
	os.system(cmd)
	return ret

def shutdowncancel():
	x = os.system('shutdown -c')
	ret = 'shutdown is canceled'
	return ret

def restartsystem():
	ret = 'system is restarting'
	os.system('''bash -c 'sleep 5 ; shutdown -r' &''')
	return ret

def rebootsystem():
	ret = 'system is rebooting'
	os.system('''bash -c 'sleep 5 ; reboot' &''')
	return ret

def suspendsystem():
	ret = 'system is suspend'
	os.system('''bash -c 'sleep 5 ; pm-suspend' &''')
	return ret

def hibernatesystem():
	ret = 'system is going in hibernate mode'
	os.system('''bash -c 'sleep 5 ; pm-hibernate' &''')
	return ret

def screenlocksystem():
	ret = 'screen will be lock now'
	os.system('''bash -c 'sleep 2 ; gnome-screensaver-command -l' &''')
	return ret

def logoutsystem():
	ret = 'logout now'
	os.system('''bash -c 'sleep 2 ; gnome-session-quit --no-prompt' &''')
	return ret
