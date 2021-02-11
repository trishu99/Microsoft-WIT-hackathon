import os
def directoryContents():
	try:
		lis = os.listdir('/home/lenovo')
		return lis
	except:
		return []