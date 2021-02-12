from flask import Flask, request, make_response, jsonify, send_file, send_from_directory, safe_join, abort
import shell, listAll, moveFiles, startp, health, summarize, timetable
from flask_cors import CORS
import shutil
import os
import signal

app = Flask(__name__) 
CORS(app)





"""					 Run 				"""
# output of a shell command
@app.route('/shell', methods=['POST'])
def shellFun(): 
	return jsonify(shell.runCommand(request.json['command']))

# list all files given a path
@app.route('/listAll', methods=['POST'])
def listAllFun(): 
	return jsonify(listAll.directoryContents(request.json['path']))

@app.route('/startprocess', methods=['POST'])
def StartProcessFun():
	return jsonify(startp.startprocess(request.json['programname']))

@app.route('/startprocessaftermins', methods=['POST'])
def StartProcessAfterMinsFun():
	return jsonify(startp.startprocessaftermins(request.json['atime']  , request.json['programname']))

@app.route('/startprocessattime', methods=['POST'])
def StartProcessAtTimeFun():
	return jsonify(startp.startprocessattime(request.json['attime']  , request.json['programname']))


@app.route('/terminateprocess', methods=['POST'])
def terminateprocessFun():
	return jsonify(startp.terminateprocess(request.json['processname'], request.json['pid']))

@app.route('/sendsignal', methods=['POST'])
def SendSignalFun():
	return jsonify(startp.sendsignal(request.json['processname'], request.json['pid'], request.json['signal']))

@app.route('/checkprocess', methods=['POST'])
def CheckProcessFun():
	return jsonify(startp.checkprocess(request.json['processname']))

@app.route('/shutdownnow', methods=['POST'])
def ShutdownNowFun():
	return jsonify(startp.shutdownnow())

@app.route('/shutdownaftermin', methods=['POST'])
def ShutdownAfterMinFun():
	return jsonify(startp.shutdownaftermin(request.json['mins']))

@app.route('/shutdownattime', methods=['POST'])
def ShutdownAtTimeFun():
	return jsonify(startp.shutdownattime(request.json['gtime']))

@app.route('/cancelshutdown', methods=['POST'])
def ShutdownCancelFun():
	return jsonify(startp.shutdowncancel())

@app.route('/restartsystem', methods=['POST'])
def RestartSystemFun():
	return jsonify(startp.restartsystem())

@app.route('/rebootsystem', methods=['POST'])
def RebootSystemFun():
	return jsonify(startp.rebootsystem())

@app.route('/suspendsystem', methods=['POST'])
def SuspendSystemFun():
	return jsonify(startp.suspendsystem())

@app.route('/hibernatesystem', methods=['POST'])
def HibernateSystemFun():
	return jsonify(startp.hibernatesystem())

@app.route('/screenlocksystem', methods=['POST'])
def ScreenlockSystemFun():
	return jsonify(startp.screenlocksystem())

@app.route('/logoutsystem', methods=['POST'])
def LogoutSystemFun():
	return jsonify(startp.logoutsystem())







"""					 Share				"""
# get a file
@app.route('/getFile', methods=['GET'])
def getFileFun(): 
    try:
        return send_from_directory(request.args.get('path'), filename = request.args.get('filename'), as_attachment=True)

        '''l = request.json['path'].split('/')
         pat = ''
        for x in range(0, len(l) - 1):
            pat = pat + l[x] + '/'
        print(pat + l[len(l) - 1])
        return send_from_directory(pat, filename = l[len(l) - 1], as_attachment=True)'''
    except FileNotFoundError:
        abort(404)

# put a file
@app.route('/putFile', methods = ['POST'])  
def putFileFun():  
    try:
        print(request.files['file'])
        f = request.files['file']
        f.save(f.filename)
        shutil.move(f.filename, "ReceivedFiles/" + f.filename)
        return jsonify({'message' : 'File uploaded succesfully'})
    except:
        abort(404)

# move a file to desired location
@app.route('/moveFiles', methods = ['POST'])  
def moveFilesFun():  
    try:
    	moveFiles.movefiles(request.json['source'], request.json['destination'])
    	return jsonify({"message" : "Success"})  
    except:
    	abort(404)
"""									"""


"""					Health 				"""
@app.route('/getHealthPredictions', methods=['POST'])
def getHealthPredictionsFun():
	print("inside health fun")
	print(request.json['user'])
	return jsonify(health.getprediction(request.json['user']))


"""					Notes 				"""
@app.route('/getSummarize', methods=['POST'])
def getSummarizeFun():
	print("inside notes fun")
	print(request.json['text'])
	return jsonify(summarize.summarize_text(request.json['text'], len(request.json['text'])))

"""					TimeTable 				"""
@app.route('/getTimeTable', methods=['POST'])
def getTimeTableFun():
	print("inside timetable fun")
	print(request.json['todos'])
	return jsonify(timetable.createtimetable(request.json['todos']))




if __name__ == '__main__': 
	app.run(debug = True) 
